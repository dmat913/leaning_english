export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { WordModel } from "@/models/wordModel";
import { UserModel } from "@/models/userModel";
import { UserProgressModel } from "@/models/userProgressModel";

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    // クエリパラメータから name と category を取得
    const { searchParams } = new URL(request.url);
    const name = searchParams.get("name");
    const category = searchParams.get("category");

    if (!name || !category) {
      return NextResponse.json(
        { message: "name または category が不足しています" },
        { status: 400 }
      );
    }

    // ユーザー情報取得
    const user = await UserModel.findOne({ name });
    if (!user) {
      return NextResponse.json(
        { message: "ユーザーが見つかりません。" },
        { status: 404 }
      );
    }

    // 語彙データ取得（新規データのみ：word_idにアンダースコアを含むもの）
    const words = await WordModel.find({
      category,
      word_id: { $regex: "_" },
    }).sort({ word_id: 1 });

    // ユーザーの進捗データ取得（新規データのみ：word_idにアンダースコアを含むもの）
    const userProgress = await UserProgressModel.findOne({
      user_id: user._id.toString(),
      category: category,
      "progress.word_id": { $regex: "_" },
    });

    // 進捗データを語彙データとマージ
    const wordsWithProgress = words.map((word) => {
      const progress = userProgress?.progress.find(
        (p: any) => p.word_id === word.word_id
      );
      return {
        _id: word._id,
        word_id: word.word_id,
        word: word.word,
        wordMeaning: word.wordMeaning,
        sentence: word.sentence,
        sentenceMeaning: word.sentenceMeaning,
        portOfSpeech: word.portOfSpeech,
        remarks: word.remarks || "",
        category: word.category,
        isCompleted: progress?.isCompleted || false,
        completedAt: progress?.completedAt,
        attempts: progress?.attempts || 0,
        correctCount: progress?.correctCount || 0,
        incorrectCount: progress?.incorrectCount || 0,
        lastAttemptAt: progress?.lastAttemptAt,
      };
    });

    return NextResponse.json({
      message: "データ取得成功",
      words: wordsWithProgress,
      category: category,
      statistics: {
        total: words.length,
        completed: wordsWithProgress.filter((w) => w.isCompleted).length,
        completionRate: Math.round(
          (wordsWithProgress.filter((w) => w.isCompleted).length /
            words.length) *
            100
        ),
      },
    });
  } catch (error) {
    console.error("wordsデータ取得エラー:", error);
    return NextResponse.json(
      { message: "サーバーでエラーが発生しました。" },
      { status: 500 }
    );
  }
}
