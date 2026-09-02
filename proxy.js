import { NextResponse } from "next/server";
import { OPERATOR_COOKIE_NAME, isValidSessionToken } from "./lib/operator-auth";
import content from "./content.json";

// Guards the operator screen and its API routes. The login page and login
// API are the two paths that must stay reachable while signed out.
export function proxy(request) {
  const { pathname } = request.nextUrl;

  const isLoginPage = pathname === "/operator/login";
  const isLoginApi = pathname === "/api/operator/login";
  const isProtectedPage = pathname.startsWith("/operator") && !isLoginPage;
  const isProtectedApi = pathname.startsWith("/api/operator") && !isLoginApi;

  if (!isProtectedPage && !isProtectedApi) return NextResponse.next();

  const token = request.cookies.get(OPERATOR_COOKIE_NAME)?.value;
  if (isValidSessionToken(token)) return NextResponse.next();

  if (isProtectedApi) {
    return NextResponse.json({ error: content.operator.unauthenticatedLabel }, { status: 401 });
  }

  const loginUrl = new URL("/operator/login", request.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/operator/:path*", "/api/operator/:path*"],
};
