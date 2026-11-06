import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, createAdminSession, verifyAdminPassword } from "../../../../lib/admin-auth";

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

    const session = createAdminSession(password);
    const response = NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
    response.cookies.set(ADMIN_COOKIE_NAME, session.value, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: session.maxAge,
    });
    return response;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400, headers: { "Cache-Control": "no-store" } });
  }
}
