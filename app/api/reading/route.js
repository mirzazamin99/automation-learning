import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "../../../lib/supabase-admin";
import { validateSubmission } from "../../../lib/validate-reading";
import { generateDraft, isScreeningFlagged } from "../../../lib/generate-draft";
import content from "../../../content.json";

const DUPLICATE_WINDOW_MINUTES = 10;

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: content.reading.form.genericError }, { status: 400 });
  }

  const { errors, data } = validateSubmission(body);
  if (errors.length) {
    return NextResponse.json({ error: errors[0], errors }, { status: 400 });
  }

  let supabaseAdmin;
  try {
    supabaseAdmin = getSupabaseAdmin();
  } catch (err) {
    console.error(err.message);
    return NextResponse.json(
      { error: "The server is not set up to store submissions yet." },
      { status: 500 }
    );
  }

  // Guard against the same person double-submitting: look for any row
  // from this email in the last 10 minutes before writing a new one.
  const windowStart = new Date(Date.now() - DUPLICATE_WINDOW_MINUTES * 60 * 1000).toISOString();

  const { data: recent, error: lookupError } = await supabaseAdmin
    .from("submissions")
    .select("id")
    .eq("email", data.email)
    .gte("submitted_at", windowStart)
    .limit(1)
    .maybeSingle();

  if (lookupError) {
    console.error("Duplicate lookup failed:", lookupError.message);
    return NextResponse.json({ error: content.reading.form.genericError }, { status: 500 });
  }

  if (recent) {
    return NextResponse.json({ error: content.reading.form.duplicateError }, { status: 409 });
  }

  const { data: inserted, error: insertError } = await supabaseAdmin
    .from("submissions")
    .insert({ name: data.name, email: data.email, answers: data.answers })
    .select("id")
    .single();

  // Only report success once we have confirmed the row actually landed.
  if (insertError || !inserted?.id) {
    console.error("Insert failed:", insertError?.message);
    return NextResponse.json({ error: content.reading.form.genericError }, { status: 500 });
  }

  let emailSent = false;
  try {
    emailSent = await sendConfirmationEmail(data.email);
  } catch (err) {
    console.error("Confirmation email failed:", err.message);
  }

  // The submission is already saved at this point. Whatever happens below,
  // the response the user gets back must stay a success -- drafting is a
  // best-effort follow-up, not a condition of the submission succeeding.
  await draftSubmission(supabaseAdmin, inserted.id, data.answers);

  return NextResponse.json({ ok: true, submissionId: inserted.id, emailSent });
}

async function draftSubmission(supabaseAdmin, submissionId, answers) {
  if (isScreeningFlagged(answers)) {
    const { error } = await supabaseAdmin
      .from("submissions")
      .update({ flagged: true, draft_status: "flagged" })
      .eq("id", submissionId);

    if (error) console.error("Failed to mark submission as flagged:", error.message);
    return;
  }

  let draft;
  try {
    draft = await generateDraft(answers);
  } catch (err) {
    console.error("Draft generation failed:", err.message);

    const { error } = await supabaseAdmin
      .from("submissions")
      .update({ draft_status: "failed" })
      .eq("id", submissionId);

    if (error) console.error("Failed to mark draft as failed:", error.message);
    return;
  }

  const { error } = await supabaseAdmin
    .from("submissions")
    .update({ draft, draft_status: "generated" })
    .eq("id", submissionId);

  if (error) console.error("Failed to save generated draft:", error.message);
}

async function sendConfirmationEmail(toEmail) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !fromEmail) {
    // Resend is not configured yet. We don't guess at keys -- the caller
    // just gets emailSent: false and the submission is still saved.
    return false;
  }

  const { subject, body } = content.emails.confirm;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: toEmail,
      subject,
      text: body,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Resend API error (${res.status}): ${text}`);
  }

  return true;
}
