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
  if (!password) return NextResponse.json({ error: "Admin login is not configured" }, { status: 503, headers: { "Cache-Control": "no-store" } });

  try {
    const body: unknown = await request.json();
    const candidate = body && typeof body === "object" && "password" in body && typeof body.password === "string"
      ? body.password
      : "";

    if (!verifyAdminPassword(candidate, password)) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401, headers: { "Cache-Control": "no-store" } });
    }

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
    return NextResponse.json({ error: "Unable to start admin session" }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
}
