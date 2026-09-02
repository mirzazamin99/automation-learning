import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "../../../../../lib/supabase-admin";
import { sendReadingEmail } from "../../../../../lib/send-email";
import content from "../../../../../content.json";

const { detail } = content.operator;

// Saves Aamir's edits to a draft ("final") and/or marks it sent. The two
// actions share an endpoint because marking as sent should never discard
// whatever edits are sitting in the form at that moment.
export async function PATCH(request, { params }) {
  const { id } = await params;

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: detail.saveErrorLabel }, { status: 400 });
  }

  const update = {};

  if (body.final && typeof body.final === "object") {
    const { whatTheyActuallySay, theOneThingInTheWay, fourteenDays, notes } = body.final;
    update.final = {
      whatTheyActuallySay: typeof whatTheyActuallySay === "string" ? whatTheyActuallySay : "",
      theOneThingInTheWay: typeof theOneThingInTheWay === "string" ? theOneThingInTheWay : "",
      fourteenDays: Array.isArray(fourteenDays) ? fourteenDays.filter((d) => typeof d === "string") : [],
      notes: typeof notes === "string" ? notes : "",
    };
  }

  if (body.sent === true) {
    update.sent = true;
    update.sent_at = new Date().toISOString();
  }

  if (!Object.keys(update).length) {
    return NextResponse.json({ error: detail.saveErrorLabel }, { status: 400 });
  }

  const supabaseAdmin = getSupabaseAdmin();
  const { data, error } = await supabaseAdmin
    .from("submissions")
    .update(update)
    .eq("id", id)
    .select("sent, sent_at, email, final")
    .single();

  if (error) {
    console.error("Operator update failed:", error.message);
    return NextResponse.json({ error: detail.saveErrorLabel }, { status: 500 });
  }

  // The sent/sent_at columns are already saved at this point. Whatever
  // happens below, the response must still report success -- delivery is
  // a best-effort follow-up, not a condition of marking as sent.
  let emailSent = null;
  if (body.sent === true) {
    try {
      emailSent = await sendReadingEmail(data.email, data.final);
    } catch (err) {
      console.error("Reading delivery email failed:", err.message);
      emailSent = false;
    }
  }

  return NextResponse.json({ ok: true, sent: data.sent, sentAt: data.sent_at, emailSent });
}
