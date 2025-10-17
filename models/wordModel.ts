import { PortOfSpeech } from "@/types/types";
import mongoose, { Document, Schema } from "mongoose";

export interface Word {
  word_id: string;
  word: string;
  wordMeaning: string;
  sentence: string;
  sentenceMeaning: string;
  portOfSpeech: PortOfSpeech[];
  category: string; // level600, level730, level860, level990, part1_essentialWord100, phrases120, prepositions, conjunctions, conjunctiveAdverbs
  remarks?: string; // 備考・メモ
}

export interface WordDocument extends Word, Document {
  _id: string;
}

const wordSchema = new Schema<WordDocument>(
  {
    word_id: {
      type: String,
      required: true,
      unique: true,
    },
    word: {
      type: String,
      required: true,
    },
    wordMeaning: {
      type: String,
      required: true,
    },
    sentence: {
      type: String,
      required: true,
    },
    sentenceMeaning: {
      type: String,
      required: true,
    },
    portOfSpeech: {
      type: [String],
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "level600",
        "level730",
        "level860",
        "level990",
        "part1_essentialWord100",
        "phrases120",
        "prepositions",
        "conjunctions",
        "conjunctiveAdverbs",
      ],
    },
    remarks: {
      type: String,
      required: false,
    },
  },
  { collection: "words" }
);

// インデックスを作成してパフォーマンスを向上
wordSchema.index({ category: 1 });

export const WordModel =
  mongoose.models.Word || mongoose.model<WordDocument>("Word", wordSchema);
