import { PortOfSpeech } from "@/types/types";
import mongoose, { Document, Schema } from "mongoose";

export interface TestData {
  _id: string;
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
  level600_data: TestData[];
  level730_data: TestData[];
  level860_data: TestData[];
  level990_data: TestData[];
  part1_essentialWord100: TestData[];
  thumbnail: string;
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
    part1_essentialWord100: {
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
    thumbnail: {
      type: String,
      required: true,
    },
  },
  { collection: "user_data" }
);

export const UserModel =
  mongoose.models.User || mongoose.model<UserDocument>("User", userSchema);
