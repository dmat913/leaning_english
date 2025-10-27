import mongoose, { Document, Schema } from "mongoose";

export interface GrammarExpress {
  grammar_id: string;
  sentence: string;
  sentence_meaning: string;
  category: string;
  options: string[];
  answer: string;
  strategy: string;
  type: string;
  description: string;
  tips: string;
  navigation: string;
  remarks: string;
  time: string;
}

export interface GrammarExpressDocument extends GrammarExpress, Document {
  _id: string;
}

const grammarExpressSchema = new Schema<GrammarExpressDocument>(
  {
    grammar_id: {
      type: String,
      required: true,
      unique: true,
    },
    sentence: {
      type: String,
      required: true,
    },
    sentence_meaning: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    options: {
      type: [String],
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    strategy: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    tips: {
      type: String,
      required: true,
    },
    navigation: {
      type: String,
      required: true,
    },
    remarks: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },
  { collection: "grammar_express" }
);

// インデックスを作成してパフォーマンスを向上
grammarExpressSchema.index({ category: 1 });
grammarExpressSchema.index({ type: 1 });

export const GrammarExpressModel =
  mongoose.models.GrammarExpress ||
  mongoose.model<GrammarExpressDocument>(
    "GrammarExpress",
    grammarExpressSchema
  );
