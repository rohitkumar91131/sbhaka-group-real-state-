import { MongoClient } from "mongodb";

const globalMongo = globalThis as typeof globalThis & {
  mongoClientPromise?: Promise<MongoClient>;
};

let clientPromise: Promise<MongoClient> | undefined;

export function getMongoClient() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("Missing MONGODB_URI environment variable");

  clientPromise ??= globalMongo.mongoClientPromise ?? new MongoClient(uri, {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
  }).connect();

  if (process.env.NODE_ENV !== "production") globalMongo.mongoClientPromise = clientPromise;
  return clientPromise;
}
