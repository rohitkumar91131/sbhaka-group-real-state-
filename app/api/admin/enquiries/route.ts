import { NextRequest, NextResponse } from "next/server";
import { ACCESS_COOKIE_NAME, authenticateAdminAccessToken } from "../../../../lib/admin-auth";
import { getMongoClient } from "../../../../lib/mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  let sid: string | null;
  try {
    sid = await authenticateAdminAccessToken(request.cookies.get(ACCESS_COOKIE_NAME)?.value);
  } catch {
    return NextResponse.json({ errorCode: "storage_unavailable" }, { status: 503, headers: { "Cache-Control": "private, no-store" } });
  }
  if (!sid) {
    return NextResponse.json({ errorCode: "unauthorized" }, { status: 401, headers: { "Cache-Control": "private, no-store" } });
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
    return NextResponse.json({ errorCode: "storage_unavailable" }, { status: 503, headers: { "Cache-Control": "private, no-store" } });
  }
}
