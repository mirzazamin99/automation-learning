import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "../../../lib/supabase-admin";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { submissionId, missedDay, directionCheck } = body;

  if (!submissionId) {
    return NextResponse.json({ error: "Missing submissionId." }, { status: 400 });
  }

  let supabaseAdmin;
  try {
    supabaseAdmin = getSupabaseAdmin();
  } catch (err) {
    console.error(err.message);
    return NextResponse.json({ error: "Server not set up." }, { status: 500 });
  }

  const { data: saved, error: upsertError } = await supabaseAdmin
    .from("revisions")
    .upsert(
      {
        submission_id: submissionId,
        missed_day: missedDay,
        direction_check: directionCheck,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "submission_id" }
    )
    .select()
    .single();

  if (upsertError || !saved) {
    console.error("Revision save failed:", upsertError?.message);
    return NextResponse.json({ error: "Could not save." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, revision: saved });
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const submissionId = searchParams.get("submissionId");

  if (!submissionId) {
    return NextResponse.json({ error: "Missing submissionId." }, { status: 400 });
  }

  let supabaseAdmin;
  try {
    supabaseAdmin = getSupabaseAdmin();
  } catch (err) {
    console.error(err.message);
    return NextResponse.json({ error: "Server not set up." }, { status: 500 });
  }

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
  const startDate = sevenDaysAgo.toISOString().slice(0, 10);

  const { data: days, error: daysError } = await supabaseAdmin
    .from("days")
    .select("date, did_it")
    .eq("submission_id", submissionId)
    .gte("date", startDate);

  if (daysError) {
    console.error("Days lookup failed:", daysError.message);
    return NextResponse.json({ error: "Could not load days." }, { status: 500 });
  }

  const counts = {
    totalDays: days.length,
    yes: days.filter((d) => d.did_it === true).length,
    no: days.filter((d) => d.did_it === false).length,
    notAnswered: days.filter((d) => d.did_it === null).length,
  };

  const { data: revision, error: revisionError } = await supabaseAdmin
    .from("revisions")
    .select()
    .eq("submission_id", submissionId)
    .maybeSingle();

  if (revisionError) {
    console.error("Revision lookup failed:", revisionError.message);
    return NextResponse.json({ error: "Could not load revision." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, counts, revision: revision || null });
}
