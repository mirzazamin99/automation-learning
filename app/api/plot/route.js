import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "../../../lib/supabase-admin";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { submissionId, direction, cost, givingUp } = body;

  if (!submissionId || !direction || !cost || !Array.isArray(givingUp)) {
    return NextResponse.json({ error: "Missing or invalid fields." }, { status: 400 });
  }

  let supabaseAdmin;
  try {
    supabaseAdmin = getSupabaseAdmin();
  } catch (err) {
    console.error(err.message);
    return NextResponse.json(
      { error: "The server is not set up to store plots yet." },
      { status: 500 }
    );
  }

  const { data: saved, error: upsertError } = await supabaseAdmin
    .from("plots")
    .upsert(
      {
        submission_id: submissionId,
        direction,
        cost,
        giving_up: givingUp,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "submission_id" }
    )
    .select()
    .single();

  if (upsertError || !saved) {
    console.error("Plot save failed:", upsertError?.message);
    return NextResponse.json({ error: "Could not save the plot." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, plot: saved });
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
    return NextResponse.json(
      { error: "The server is not set up to store plots yet." },
      { status: 500 }
    );
  }

  const { data: plot, error } = await supabaseAdmin
    .from("plots")
    .select()
    .eq("submission_id", submissionId)
    .maybeSingle();

  if (error) {
    console.error("Plot lookup failed:", error.message);
    return NextResponse.json({ error: "Could not load the plot." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, plot: plot || null });
}
