export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { UserModel } from "@/models/userModel";
import { UserProgressModel } from "@/models/userProgressModel";
import { GrammarExpressModel } from "@/models/grammarExpressModel";

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

    // 語彙データ取得
    const grammars = await GrammarExpressModel.find({
      category,
    }).sort({ grammar_id: 1 });

    // ユーザーの進捗データ取得
    const userProgress = await UserProgressModel.findOne({
      user_id: user._id.toString(),
      category: category,
    });

    // 進捗データを語彙データとマージ
    const grammarsWithProgress = grammars.map((grammar) => {
      const progress = userProgress?.progress.find(
        (p: any) => p.grammar_id === grammar.grammar_id
      );
      return {
        _id: grammar._id,
        grammar_id: grammar.grammar_id,
        sentence: grammar.sentence,
        sentence_meaning: grammar.sentence_meaning,
        category: grammar.category,
        options: grammar.options,
        answer: grammar.answer,
        strategy: grammar.strategy,
        type: grammar.type,
        description: grammar.description,
        tips: grammar.tips,
        navigation: grammar.navigation,
        remarks: grammar.remarks || "",
        isCompleted: progress?.isCompleted || false,
        completedAt: progress?.completedAt,
        attempts: progress?.attempts || 0,
        correctCount: progress?.correctCount || 0,
        incorrectCount: progress?.incorrectCount || 0,
        lastAttemptAt: progress?.lastAttemptAt,
      };
    });

    return NextResponse.json(
      {
        message: "文法特急データ取得成功",
        grammars: grammarsWithProgress,
        category: category,
        statistics: {
          total: grammars.length,
          completed: grammarsWithProgress.filter((g) => g.isCompleted).length,
          completionRate: Math.round(
            (grammarsWithProgress.filter((g) => g.isCompleted).length /
              grammars.length) *
              100
          ),
        },
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        },
      }
    );
  } catch (error) {
    console.error("grammarデータ取得エラー:", error);
    return NextResponse.json(
      { message: "サーバーでエラーが発生しました。" },
      { status: 500 }
    );
  }
}
