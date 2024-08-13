import { PortOfSpeech } from "@/types/types";
import mongoose, { Document, Schema } from "mongoose";

export interface WordData {
  word_id: string;
  word: string;
  wordMeaning: string;
  sentence: string;
  sentenceMeaning: string;
  portOfSpeech: PortOfSpeech[];
  isCompleted: boolean;
}

export interface User {
  name: string;
  password: string;
  level600_data: WordData[];
  level730_data: WordData[];
  level860_data: WordData[];
  level990_data: WordData[];
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
    level600_data: {
      type: [
        {
          word_id: String,
          word: String,
          wordMeaning: String,
          sentence: String,
          sentenceMeaning: String,
          portOfSpeech: [String],
          isCompleted: Boolean,
        },
      ],
      default: [],
    },
    level730_data: {
      type: [
        {
          word_id: String,
          word: String,
          wordMeaning: String,
          sentence: String,
          sentenceMeaning: String,
          portOfSpeech: [String],
          isCompleted: Boolean,
        },
      ],
      default: [],
    },
    level860_data: {
      type: [
        {
          word_id: String,
          word: String,
          wordMeaning: String,
          sentence: String,
          sentenceMeaning: String,
          portOfSpeech: [String],
          isCompleted: Boolean,
        },
      ],
      default: [],
    },
    level990_data: {
      type: [
        {
          word_id: String,
          word: String,
          wordMeaning: String,
          sentence: String,
          sentenceMeaning: String,
          portOfSpeech: [String],
          isCompleted: Boolean,
        },
      ],
      default: [],
    },
  },
  { collection: "user_data" }
);

export const UserModel =
  mongoose.models.User || mongoose.model<UserDocument>("User", userSchema);
