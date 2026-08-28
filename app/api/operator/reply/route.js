import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "../../../../lib/supabase-admin";
import { sendPersonalReplyEmail } from "../../../../lib/send-email";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { submissionId, replyText } = body;

  if (!submissionId || !replyText || !replyText.trim()) {
    return NextResponse.json({ error: "Missing submission or reply text." }, { status: 400 });
  }

  let supabaseAdmin;
  try {
    supabaseAdmin = getSupabaseAdmin();
  } catch (err) {
    console.error(err.message);
    return NextResponse.json({ error: "Server not set up." }, { status: 500 });
  }

  const { data: submission, error: lookupError } = await supabaseAdmin
    .from("submissions")
    .select("email")
    .eq("id", submissionId)
    .maybeSingle();

  if (lookupError || !submission) {
    return NextResponse.json({ error: "Submission not found." }, { status: 404 });
  }

  let emailSent = false;
  try {
    emailSent = await sendPersonalReplyEmail(submission.email, replyText.trim());
  } catch (err) {
    console.error("Reply email failed:", err.message);
    return NextResponse.json({ error: "Could not send the email." }, { status: 500 });
  }

  const { error: updateError } = await supabaseAdmin
    .from("submissions")
    .update({
      reply_body: replyText.trim(),
      replied: true,
      replied_at: new Date().toISOString(),
    })
    .eq("id", submissionId);

  if (updateError) {
    console.error("Failed to save reply record:", updateError.message);
  }

  return NextResponse.json({ ok: true, emailSent });
}
