import { NextRequest, NextResponse } from "next/server";
import {
  ACCESS_COOKIE_NAME,
  ACCESS_TOKEN_LIFETIME_SECONDS,
  REFRESH_COOKIE_NAME,
  revokeAdminSession,
  rotateAdminRefreshToken,
} from "../../../../lib/admin-auth";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const tokens = await rotateAdminRefreshToken(request.cookies.get(REFRESH_COOKIE_NAME)?.value);
    if (!tokens) {
      return NextResponse.json({ error: "Refresh session expired" }, {
        status: 401,
        headers: { "Cache-Control": "private, no-store" },
      });
    }

    const response = NextResponse.json({ ok: true }, { headers: { "Cache-Control": "private, no-store" } });
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
    return response;
  } catch {
    return NextResponse.json({ error: "Unable to refresh admin session" }, {
      status: 503,
      headers: { "Cache-Control": "private, no-store" },
    });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await revokeAdminSession(
      request.cookies.get(ACCESS_COOKIE_NAME)?.value,
      request.cookies.get(REFRESH_COOKIE_NAME)?.value,
    );
  } catch {
    // Expire the browser credentials even if MongoDB cannot be reached.
  }

  const response = NextResponse.json({ ok: true }, { headers: { "Cache-Control": "private, no-store" } });
  response.cookies.set(ACCESS_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/api/admin",
    maxAge: 0,
  });
  response.cookies.set(REFRESH_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/api/admin/refresh",
    maxAge: 0,
  });
  return response;
}
