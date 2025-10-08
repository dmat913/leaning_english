import mongoose, { Document, Schema } from "mongoose";

export interface User {
  name: string;
  password: string;
  thumbnail: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserDocument extends User, Document {
  _id: string;
}

const userSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
  },
  {
    collection: "user_data",
    timestamps: true,
  }
);

export const UserModel =
  mongoose.models.User || mongoose.model<UserDocument>("User", userSchema);
