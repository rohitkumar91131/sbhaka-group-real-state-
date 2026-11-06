import { NextRequest, NextResponse } from "next/server";
import {
  ACCESS_COOKIE_NAME,
  ACCESS_TOKEN_LIFETIME_SECONDS,
  createAdminTokenPair,
  REFRESH_COOKIE_NAME,
  verifyAdminPassword,
} from "../../../../lib/admin-auth";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return NextResponse.json({ errorCode: "missing_admin_password" }, { status: 503, headers: { "Cache-Control": "no-store" } });
  if (!process.env.MONGODB_URI) {
    return NextResponse.json({ errorCode: "missing_mongodb_uri" }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ errorCode: "invalid_request" }, { status: 400, headers: { "Cache-Control": "no-store" } });
  }

  const candidate = body && typeof body === "object" && "password" in body && typeof body.password === "string"
    ? body.password
    : "";

  if (!verifyAdminPassword(candidate, password)) {
    return NextResponse.json({ errorCode: "invalid_password" }, { status: 401, headers: { "Cache-Control": "no-store" } });
  }

  try {
    const tokens = await createAdminTokenPair();
    const response = NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
    response.cookies.set(ACCESS_COOKIE_NAME, tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/api/admin",
      maxAge: ACCESS_TOKEN_LIFETIME_SECONDS,
    });
    response.cookies.set(REFRESH_COOKIE_NAME, tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/api/admin/refresh",
      maxAge: tokens.refreshMaxAge,
    });
    response.cookies.set("shabka_admin_session", "", { path: "/", maxAge: 0 });
    return response;
  } catch {
    return NextResponse.json({ errorCode: "storage_unavailable" }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
}
