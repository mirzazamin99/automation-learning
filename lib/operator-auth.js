import { createHmac, timingSafeEqual } from "node:crypto";

// Single shared password, no user table. A session is a signed, expiring
// token the browser holds as a cookie: "<expiresAt>.<hmac(expiresAt)>",
// signed with OPERATOR_PASSWORD as the secret. Verifying it needs nothing
// but the env var, so there is no session store to run out of sync.

export const OPERATOR_COOKIE_NAME = "operator_session";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 14; // 14 days

function sign(message, secret) {
  return createHmac("sha256", secret).update(message).digest("hex");
}

function safeEqual(a, b) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export function checkPassword(candidate) {
  const expected = process.env.OPERATOR_PASSWORD;
  if (!expected || typeof candidate !== "string" || !candidate) return false;
  return safeEqual(candidate, expected);
}

export function createSessionToken() {
  const secret = process.env.OPERATOR_PASSWORD;
  const expiresAt = String(Date.now() + SESSION_MAX_AGE_SECONDS * 1000);
  return `${expiresAt}.${sign(expiresAt, secret)}`;
}

export function isValidSessionToken(token) {
  const secret = process.env.OPERATOR_PASSWORD;
  if (!secret || typeof token !== "string") return false;

  const [expiresAt, signature] = token.split(".");
  if (!expiresAt || !signature) return false;
  if (!Number.isFinite(Number(expiresAt)) || Number(expiresAt) < Date.now()) return false;

  return safeEqual(signature, sign(expiresAt, secret));
}
