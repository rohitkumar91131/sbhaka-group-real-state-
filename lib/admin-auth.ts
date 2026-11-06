import { createHash, createHmac, randomUUID, timingSafeEqual } from "node:crypto";
import type { Document } from "mongodb";
import { getMongoClient } from "./mongodb";

export const ACCESS_COOKIE_NAME = "shabka_admin_access";
export const REFRESH_COOKIE_NAME = "shabka_admin_refresh";
export const ACCESS_TOKEN_LIFETIME_SECONDS = 15 * 60;
export const REFRESH_TOKEN_LIFETIME_SECONDS = 7 * 24 * 60 * 60;
const SESSION_MAX_LIFETIME_SECONDS = 30 * 24 * 60 * 60;
const SESSION_COLLECTION = "admin_sessions";

type TokenPayload = {
  iss?: string;
  aud?: string;
  sub: "admin";
  kind: "access" | "refresh";
  sid: string;
  jti?: string;
  iat: number;
  exp: number;
};

type AdminSession = Document & {
  _id: string;
  refreshHash: string;
  createdAt: Date;
  lastUsedAt: Date;
  expiresAt: Date;
  absoluteExpiresAt: Date;
};

const jwtHeader = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");

function getTokenSecret() {
  const material = process.env.MONGODB_URI;
  if (!material) throw new Error("MONGODB_URI is required to sign admin tokens");
  return createHash("sha256").update("shabka-admin-token-v1\0").update(material).digest();
}

function sign(input: string) {
  return createHmac("sha256", getTokenSecret()).update(input).digest("base64url");
}

function signToken(payload: TokenPayload) {
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const input = `${jwtHeader}.${encodedPayload}`;
  return `${input}.${sign(input)}`;
}

function readToken(token: string | undefined, allowExpired = false): TokenPayload | null {
  if (!token) return null;
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const [header, payloadPart, suppliedSignature] = parts;
    const input = `${header}.${payloadPart}`;
    const expected = Buffer.from(sign(input));
    const supplied = Buffer.from(suppliedSignature);
    if (expected.length !== supplied.length || !timingSafeEqual(expected, supplied)) return null;

    const parsedHeader = JSON.parse(Buffer.from(header, "base64url").toString("utf8")) as { alg?: string; typ?: string };
    const payload = JSON.parse(Buffer.from(payloadPart, "base64url").toString("utf8")) as TokenPayload;
    if (parsedHeader.alg !== "HS256" || parsedHeader.typ !== "JWT" || payload.sub !== "admin") return null;
    if (payload.iss !== "shabka-group" || payload.aud !== "shabka-admin") return null;
    if (typeof payload.sid !== "string" || !payload.sid || !["access", "refresh"].includes(payload.kind)) return null;
    if (!Number.isInteger(payload.exp) || !Number.isInteger(payload.iat)) return null;
    if (!allowExpired && payload.exp <= Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

function refreshHash(jti: string) {
  return createHash("sha256").update(jti).digest("hex");
}

export function verifyAdminPassword(candidate: string, password: string) {
  const expected = createHmac("sha256", "shabka-admin-password-check").update(password).digest();
  const actual = createHmac("sha256", "shabka-admin-password-check").update(candidate).digest();
  return timingSafeEqual(expected, actual);
}

function issueTokenPair(sid: string, jti: string, refreshExpiresAt: Date) {
  const now = Math.floor(Date.now() / 1000);
  const absoluteRefreshExp = Math.floor(refreshExpiresAt.getTime() / 1000);
  const accessToken = signToken({
    iss: "shabka-group", aud: "shabka-admin", sub: "admin", kind: "access", sid, iat: now,
    exp: now + ACCESS_TOKEN_LIFETIME_SECONDS,
  });
  const refreshToken = signToken({
    iss: "shabka-group", aud: "shabka-admin", sub: "admin", kind: "refresh", sid, jti, iat: now, exp: absoluteRefreshExp,
  });
  return {
    accessToken,
    refreshToken,
    accessMaxAge: ACCESS_TOKEN_LIFETIME_SECONDS,
    refreshMaxAge: Math.max(0, absoluteRefreshExp - now),
  };
}

export async function createAdminTokenPair() {
  getTokenSecret();
  const sid = randomUUID();
  const jti = randomUUID();
  const now = new Date();
  const expiresAt = new Date(now.getTime() + REFRESH_TOKEN_LIFETIME_SECONDS * 1000);
  const absoluteExpiresAt = new Date(now.getTime() + SESSION_MAX_LIFETIME_SECONDS * 1000);
  const client = await getMongoClient();
  const sessions = client.db(process.env.MONGODB_DB || "shabka_group").collection<AdminSession>(SESSION_COLLECTION);
  await sessions.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
  await sessions.insertOne({
    _id: sid,
    refreshHash: refreshHash(jti),
    createdAt: now,
    lastUsedAt: now,
    expiresAt,
    absoluteExpiresAt,
  });
  return issueTokenPair(sid, jti, expiresAt);
}

export async function rotateAdminRefreshToken(token: string | undefined) {
  const payload = readToken(token);
  if (!payload || payload.kind !== "refresh" || typeof payload.jti !== "string" || !payload.jti) return null;

  const now = new Date();
  const nextJti = randomUUID();
  const client = await getMongoClient();
  const sessions = client.db(process.env.MONGODB_DB || "shabka_group").collection<AdminSession>(SESSION_COLLECTION);
  const session = await sessions.findOne({
    _id: payload.sid,
    refreshHash: refreshHash(payload.jti),
    expiresAt: { $gt: now },
    absoluteExpiresAt: { $gt: now },
  }, { projection: { absoluteExpiresAt: 1 } });
  if (!session?.absoluteExpiresAt) return null;

  const expiresAt = new Date(Math.min(
    now.getTime() + REFRESH_TOKEN_LIFETIME_SECONDS * 1000,
    new Date(session.absoluteExpiresAt).getTime(),
  ));
  const result = await sessions.updateOne({
    _id: payload.sid,
    refreshHash: refreshHash(payload.jti),
    expiresAt: { $gt: now },
    absoluteExpiresAt: { $gt: now },
  }, { $set: { refreshHash: refreshHash(nextJti), expiresAt, lastUsedAt: now } });
  if (result.modifiedCount !== 1) return null;
  return issueTokenPair(payload.sid, nextJti, expiresAt);
}

export async function authenticateAdminAccessToken(token: string | undefined) {
  const payload = readToken(token);
  if (!payload || payload.kind !== "access") return null;

  const now = new Date();
  const client = await getMongoClient();
  const session = await client.db(process.env.MONGODB_DB || "shabka_group")
    .collection<AdminSession>(SESSION_COLLECTION)
    .findOne({ _id: payload.sid, expiresAt: { $gt: now }, absoluteExpiresAt: { $gt: now } }, { projection: { _id: 1 } });
  return session ? payload.sid : null;
}

export async function revokeAdminSession(accessToken?: string, refreshToken?: string) {
  const access = readToken(accessToken, true);
  const refresh = readToken(refreshToken, true);
  const sid = refresh?.kind === "refresh" ? refresh.sid : access?.kind === "access" ? access.sid : null;
  if (!sid) return;

  const client = await getMongoClient();
  await client.db(process.env.MONGODB_DB || "shabka_group").collection<AdminSession>(SESSION_COLLECTION).deleteOne({ _id: sid });
}
