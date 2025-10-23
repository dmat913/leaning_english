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

    const now = new Date();
    // 進捗データを検索し、該当語彙の進捗を更新または追加
    const updateResult = await UserProgressModel.findOneAndUpdate(
      {
        user_id: userId,
        category: category,
        // progress.word_id: word_id で部分一致検索も可能だが、ここでは全体で更新
      },
      {
        $setOnInsert: { user_id: userId, category: category },
        $set: {}, // dummy, $setOnInsertだけだとエラーになる場合がある
        $push: {
          progress: {
            $each: [], // 既存なら何も追加しない
            $position: 0, // 追加位置
          },
        },
      },
      { upsert: true, new: true }
    );

    // progress配列内の該当word_idを更新（MongoDBの配列フィルタを使う）
    const updateProgress = await UserProgressModel.updateOne(
      {
        user_id: userId,
        category: category,
        "progress.word_id": word_id,
      },
      {
        $set: {
          "progress.$.isCompleted": isCompleted,
          "progress.$.lastAttemptAt": now,
          ...(isCompleted
            ? {
                "progress.$.completedAt": now,
                $inc: { "progress.$.correctCount": 1 },
              }
            : {
                $inc: { "progress.$.incorrectCount": 1 },
              }),
          $inc: { "progress.$.attempts": 1 },
        },
      }
    );

    // 該当word_idがなければ新規追加
    if (updateProgress.modifiedCount === 0) {
      await UserProgressModel.updateOne(
        {
          user_id: userId,
          category: category,
        },
        {
          $push: {
            progress: {
              word_id: word_id,
              isCompleted: isCompleted,
              completedAt: isCompleted ? now : undefined,
              attempts: 1,
              correctCount: isCompleted ? 1 : 0,
              incorrectCount: isCompleted ? 0 : 1,
              lastAttemptAt: now,
            },
          },
        }
      );
    }

    // 統計情報をMongoDBで集計
    const userProgress = await UserProgressModel.findOne({
      user_id: userId,
      category: category,
    });
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
