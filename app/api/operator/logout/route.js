import { NextResponse } from "next/server";
import { OPERATOR_COOKIE_NAME } from "../../../../lib/operator-auth";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete(OPERATOR_COOKIE_NAME);
  return res;
}
