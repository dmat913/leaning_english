import { connectToDatabase } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { UserProgressModel } from "@/models/userProgressModel";

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const { userId, word_id, isCompleted, category } = await request.json();

    if (!userId || !word_id || isCompleted === undefined || !category) {
      return NextResponse.json(
        {
          message:
            "必要なデータが不足しています (userId, word_id, isCompleted, category)",
        },
        { status: 400 }
      );
    }

    // ユーザーの進捗データを検索または作成
    let userProgress = await UserProgressModel.findOne({
      user_id: userId,
      category: category,
    });

    if (!userProgress) {
      // 進捗データが存在しない場合、新規作成
      userProgress = new UserProgressModel({
        user_id: userId,
        category: category,
        progress: [],
      });
    }

    // 該当する語彙の進捗を検索
    const existingProgressIndex = userProgress.progress.findIndex(
      (p: any) => p.word_id === word_id
    );

    const now = new Date();

    if (existingProgressIndex >= 0) {
      // 既存の進捗を更新
      userProgress.progress[existingProgressIndex].isCompleted = isCompleted;
      userProgress.progress[existingProgressIndex].lastAttemptAt = now;

      if (isCompleted) {
        userProgress.progress[existingProgressIndex].completedAt = now;
        userProgress.progress[existingProgressIndex].correctCount =
          (userProgress.progress[existingProgressIndex].correctCount || 0) + 1;
      } else {
        userProgress.progress[existingProgressIndex].incorrectCount =
          (userProgress.progress[existingProgressIndex].incorrectCount || 0) +
          1;
      }

      userProgress.progress[existingProgressIndex].attempts =
        (userProgress.progress[existingProgressIndex].attempts || 0) + 1;
    } else {
      // 新しい進捗を追加
      userProgress.progress.push({
        word_id: word_id,
        isCompleted: isCompleted,
        completedAt: isCompleted ? now : undefined,
        attempts: 1,
        correctCount: isCompleted ? 1 : 0,
        incorrectCount: isCompleted ? 0 : 1,
        lastAttemptAt: now,
      });
    }

    // データベースに保存
    await userProgress.save();

    // 統計情報を計算
    const totalWords = userProgress.progress.length;
    const completedWords = userProgress.progress.filter(
      (p: any) => p.isCompleted
    ).length;
    const completionRate =
      totalWords > 0 ? Math.round((completedWords / totalWords) * 100) : 0;

    return NextResponse.json({
      message: "進捗更新成功",
      progress: {
        word_id: word_id,
        isCompleted: isCompleted,
        category: category,
      },
      statistics: {
        total: totalWords,
        completed: completedWords,
        completionRate: completionRate,
      },
    });
  } catch (error) {
    console.error("進捗更新エラー:", error);
    return NextResponse.json(
      {
        message: "進捗更新に失敗しました",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
