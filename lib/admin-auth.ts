import { createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_COOKIE_NAME = "shabka_admin_session";
const SESSION_LIFETIME_SECONDS = 60 * 60 * 12;

function signature(expiresAt: string, password: string) {
  return createHmac("sha256", password).update(`shabka-admin:${expiresAt}`).digest("base64url");
}

export function verifyAdminPassword(candidate: string, password: string) {
  const expected = createHmac("sha256", "shabka-admin-password-check").update(password).digest();
  const actual = createHmac("sha256", "shabka-admin-password-check").update(candidate).digest();
  return timingSafeEqual(expected, actual);
}

export function createAdminSession(password: string) {
  const expiresAt = String(Math.floor(Date.now() / 1000) + SESSION_LIFETIME_SECONDS);
  return { value: `${expiresAt}.${signature(expiresAt, password)}`, maxAge: SESSION_LIFETIME_SECONDS };
}

export function verifyAdminSession(value: string | undefined, password: string) {
  if (!value) return false;
  const [expiresAt, suppliedSignature, extra] = value.split(".");
  if (!expiresAt || !suppliedSignature || extra || !/^\d+$/.test(expiresAt)) return false;
  if (Number(expiresAt) <= Math.floor(Date.now() / 1000)) return false;

  const expected = Buffer.from(signature(expiresAt, password));
  const supplied = Buffer.from(suppliedSignature);
  return expected.length === supplied.length && timingSafeEqual(expected, supplied);
}
