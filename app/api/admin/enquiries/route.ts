import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, verifyAdminSession } from "../../../../lib/admin-auth";
import { getMongoClient } from "../../../../lib/mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const password = process.env.ADMIN_PASSWORD;
  const session = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!password || !verifyAdminSession(session, password)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: { "Cache-Control": "private, no-store" } });
  }

  try {
    const client = await getMongoClient();
    const enquiries = await client
      .db(process.env.MONGODB_DB || "shabka_group")
      .collection("contact_enquiries")
      .find({}, { projection: { name: 1, email: 1, phone: 1, division: 1, message: 1, createdAt: 1 } })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      enquiries: enquiries.map((enquiry) => ({
        id: enquiry._id.toString(),
        name: enquiry.name,
        email: enquiry.email,
        phone: enquiry.phone,
        division: enquiry.division,
        message: enquiry.message,
        createdAt: enquiry.createdAt instanceof Date ? enquiry.createdAt.toISOString() : enquiry.createdAt,
      })),
    }, { headers: { "Cache-Control": "private, no-store" } });
  } catch {
    return NextResponse.json({ error: "Unable to load enquiries" }, { status: 503, headers: { "Cache-Control": "private, no-store" } });
  }
}
