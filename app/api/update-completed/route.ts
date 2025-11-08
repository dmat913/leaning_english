import { connectToDatabase } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { UserProgressModel } from "@/models/userProgressModel";

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const { userId, word_id, grammar_id, isCompleted, category } =
      await request.json();
    const itemId = word_id || grammar_id;

    if (!userId || !itemId || isCompleted === undefined || !category) {
      return NextResponse.json(
        {
          message:
            "必要なデータが不足しています (userId, word_id/grammar_id, isCompleted, category)",
        },
        { status: 400 }
      );
    }

    const now = new Date();
    const itemIdField = grammar_id ? "grammar_id" : "word_id";

    // 進捗データを検索し、該当語彙/文法の進捗を更新または追加
    await UserProgressModel.findOneAndUpdate(
      {
        user_id: userId,
        category: category,
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

    // progress配列内の該当item_idを更新（MongoDBの配列フィルタを使う）
    const filterQuery = {
      user_id: userId,
      category: category,
      [`progress.${itemIdField}`]: itemId,
    };

    const updateFields: any = {
      $set: {
        "progress.$.isCompleted": isCompleted,
        "progress.$.lastAttemptAt": now,
      },
      $inc: {
        "progress.$.attempts": 1,
      },
    };

    if (isCompleted) {
      updateFields.$set["progress.$.completedAt"] = now;
      updateFields.$inc["progress.$.correctCount"] = 1;
    } else {
      updateFields.$inc["progress.$.incorrectCount"] = 1;
    }

    const updateProgress = await UserProgressModel.updateOne(
      filterQuery,
      updateFields
    );

    // 該当item_idがなければ新規追加
    if (updateProgress.modifiedCount === 0) {
      const newProgressItem: any = {
        [itemIdField]: itemId,
        isCompleted: isCompleted,
        completedAt: isCompleted ? now : undefined,
        attempts: 1,
        correctCount: isCompleted ? 1 : 0,
        incorrectCount: isCompleted ? 0 : 1,
        lastAttemptAt: now,
      };

      await UserProgressModel.updateOne(
        {
          user_id: userId,
          category: category,
        },
        {
          $push: {
            progress: newProgressItem,
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
        [itemIdField]: itemId,
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
