import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "../../../lib/supabase-admin";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { submissionId, date, morningEntry, didIt, eveningDetail } = body;

  if (!submissionId || !date) {
    return NextResponse.json({ error: "Missing submissionId or date." }, { status: 400 });
  }

  let supabaseAdmin;
  try {
    supabaseAdmin = getSupabaseAdmin();
  } catch (err) {
    console.error(err.message);
    return NextResponse.json(
      { error: "The server is not set up to store days yet." },
      { status: 500 }
    );
  }

  const updateFields = { submission_id: submissionId, date, updated_at: new Date().toISOString() };
  if (morningEntry !== undefined) updateFields.morning_entry = morningEntry;
  if (didIt !== undefined) updateFields.did_it = didIt;
  if (eveningDetail !== undefined) updateFields.evening_detail = eveningDetail;

  const { data: saved, error: upsertError } = await supabaseAdmin
    .from("days")
    .upsert(updateFields, { onConflict: "submission_id,date" })
    .select()
    .single();

  if (upsertError || !saved) {
    console.error("Day save failed:", upsertError?.message);
    return NextResponse.json({ error: "Could not save the day." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, day: saved });
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const submissionId = searchParams.get("submissionId");
  const date = searchParams.get("date");

  if (!submissionId || !date) {
    return NextResponse.json({ error: "Missing submissionId or date." }, { status: 400 });
  }

  let supabaseAdmin;
  try {
    supabaseAdmin = getSupabaseAdmin();
  } catch (err) {
    console.error(err.message);
    return NextResponse.json(
      { error: "The server is not set up to store days yet." },
      { status: 500 }
    );
  }

  const { data: day, error } = await supabaseAdmin
    .from("days")
    .select()
    .eq("submission_id", submissionId)
    .eq("date", date)
    .maybeSingle();

  if (error) {
    console.error("Day lookup failed:", error.message);
    return NextResponse.json({ error: "Could not load the day." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, day: day || null });
}
