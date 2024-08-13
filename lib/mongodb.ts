import mongoose from "mongoose";

const URI = process.env.DB_URI;

let cachedClient: any = null;

export async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  if (!URI) {
    throw new Error("MongoDB URIが設定されていません");
  }

  await mongoose.connect(URI);

  cachedClient = mongoose.connection;
  return cachedClient;
}
