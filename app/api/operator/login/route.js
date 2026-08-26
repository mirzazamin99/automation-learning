import { NextResponse } from "next/server";
import {
  checkPassword,
  createSessionToken,
  OPERATOR_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
} from "../../../../lib/operator-auth";
import content from "../../../../content.json";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: content.operator.login.errorLabel }, { status: 400 });
  }

  if (!checkPassword(body?.password)) {
    return NextResponse.json({ error: content.operator.login.errorLabel }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(OPERATOR_COOKIE_NAME, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
  return res;
}
