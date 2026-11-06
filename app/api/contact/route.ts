import { NextResponse } from "next/server";
import { getMongoClient } from "../../../lib/mongodb";

export const runtime = "nodejs";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    if (Buffer.byteLength(rawBody, "utf8") > 10_000) {
      return NextResponse.json({ error: "Request too large" }, { status: 413 });
    }

    const body: unknown = JSON.parse(rawBody);
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const data = body as Record<string, unknown>;
    if (typeof data.website === "string" && data.website.trim()) {
      return NextResponse.json({ ok: true });
    }

    const name = typeof data.name === "string" ? data.name.trim() : "";
    const email = typeof data.email === "string" ? data.email.trim().toLowerCase() : "";
    const phone = typeof data.phone === "string" ? data.phone.trim() : "";
    const division = typeof data.division === "string" ? data.division.trim() : "";
    const message = typeof data.message === "string" ? data.message.trim() : "";

    if (!name || name.length > 100 || !emailPattern.test(email) || email.length > 254 || phone.length > 30 || !division || division.length > 100 || message.length < 10 || message.length > 5000) {
      return NextResponse.json({ error: "Please check the submitted details" }, { status: 400 });
    }

    const client = await getMongoClient();
    const db = client.db(process.env.MONGODB_DB || "shabka_group");
    await db.collection("contact_enquiries").insertOne({
      name,
      email,
      phone,
      division,
      message,
      createdAt: new Date(),
      source: "website-contact-form",
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unable to submit enquiry" }, { status: 503 });
  }
}
