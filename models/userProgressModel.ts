import mongoose, { Document, Schema } from "mongoose";

export interface UserProgress {
  word_id: string;
  isCompleted: boolean;
  completedAt?: Date;
  attempts?: number; // 挑戦回数
  correctCount?: number; // 正解回数
  incorrectCount?: number; // 失敗回数
  lastAttemptAt?: Date; // 最後にアクセスした日時
}

export interface UserProgressData {
  user_id: string;
  category: string; // level600, level730, level860, level990, part1_essentialWord100, phrases120, prepositions, conjunctions, conjunctiveAdverbs,departmentAndOccupations
  progress: UserProgress[];
}

export interface UserProgressDocument extends UserProgressData, Document {
  _id: string;
}

const userProgressSchema = new Schema<UserProgressDocument>(
  {
    user_id: {
      type: String,
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
        "departments",
        "occupations",
        "majors",
      ],
    },
    progress: [
      {
        word_id: {
          type: String,
          required: true,
        },
        isCompleted: {
          type: Boolean,
          default: false,
        },
        completedAt: {
          type: Date,
        },
        attempts: {
          type: Number,
          default: 0,
        },
        correctCount: {
          type: Number,
          default: 0,
        },
        incorrectCount: {
          type: Number,
          default: 0,
        },
        lastAttemptAt: {
          type: Date,
        },
      },
    ],
  },
  {
    collection: "user_progress",
    timestamps: true,
  }
);

// 複合インデックスでパフォーマンス向上
userProgressSchema.index({ user_id: 1, category: 1 }, { unique: true });
userProgressSchema.index({ user_id: 1 });
userProgressSchema.index({ "progress.word_id": 1 });

export const UserProgressModel =
  mongoose.models.UserProgress ||
  mongoose.model<UserProgressDocument>("UserProgress", userProgressSchema);
