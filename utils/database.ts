import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const url = process.env.MONGODB_URI;
    if (!url) {
      throw new Error();
    }
    await mongoose.connect(url);
  } catch (error) {
    console.log("DB接続に失敗しました");
    throw new Error();
  }
};
