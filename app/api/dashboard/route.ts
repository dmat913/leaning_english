import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/utils/database";
import { UserProgressModel, UserProgress } from "@/models/userProgressModel";
import { UserModel } from "@/models/userModel";
import { WordModel } from "@/models/wordModel";

export async function GET(request: NextRequest) {
  try {
    await connectDb();

    const name = request.nextUrl.searchParams.get("name");

    if (!name) {
      return NextResponse.json(
        { error: "User name is required" },
        { status: 400 }
      );
    }

    // まずUserModelからユーザーを検索
    const user = await UserModel.findOne({ name: name });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // ユーザーのIDを使って進捗データを取得（新規データのみ：word_idにアンダースコアを含むもの）
    const allProgress = await UserProgressModel.find({
      user_id: user._id,
      "progress.word_id": { $regex: "_" },
    });

    // 全カテゴリーの定義
    const allCategories = [
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
    ];

    // カテゴリー別の統計を計算
    const categoryStats = await Promise.all(
      allCategories.map(async (category) => {
        // WordModelから該当カテゴリーの全単語数を取得（新規データのみ）
        const totalWordsInCategory = await WordModel.countDocuments({
          category: category,
          word_id: { $regex: "_" },
        });

        // 該当カテゴリーの進捗データを取得
        const categoryProgress = allProgress.find(
          (cp) => cp.category === category
        );

        // 新規データのみをフィルタリング（word_idにアンダースコアを含むもの）
        const newProgress = categoryProgress
          ? categoryProgress.progress.filter((p: UserProgress) =>
              p.word_id.includes("_")
            )
          : [];

        const completedWords = newProgress.filter(
          (p: UserProgress) => p.isCompleted
        ).length;

        const totalAttempts = newProgress.reduce(
          (sum: number, p: UserProgress) => sum + (p.attempts || 0),
          0
        );

        const completionRate =
          totalWordsInCategory > 0
            ? (completedWords / totalWordsInCategory) * 100
            : 0;

        return {
          category: category,
          totalWords: totalWordsInCategory,
          completedWords,
          completionRate: Math.round(completionRate),
          totalAttempts,
          lastUpdated: categoryProgress?.updatedAt || null,
        };
      })
    );

    // 全体統計を計算
    const totalStats = {
      totalWords: categoryStats.reduce(
        (sum: number, cat) => sum + cat.totalWords,
        0
      ),
      completedWords: categoryStats.reduce(
        (sum: number, cat) => sum + cat.completedWords,
        0
      ),
      totalAttempts: categoryStats.reduce(
        (sum: number, cat) => sum + cat.totalAttempts,
        0
      ),
    };

    const overallCompletionRate =
      totalStats.totalWords > 0
        ? Math.round((totalStats.completedWords / totalStats.totalWords) * 100)
        : 0;

    // レベル別の達成率を計算
    const levelStats = {
      level600: categoryStats.find((cat) => cat.category === "level600") || {
        completionRate: 0,
        totalWords: 0,
        completedWords: 0,
      },
      level730: categoryStats.find((cat) => cat.category === "level730") || {
        completionRate: 0,
        totalWords: 0,
        completedWords: 0,
      },
      level860: categoryStats.find((cat) => cat.category === "level860") || {
        completionRate: 0,
        totalWords: 0,
        completedWords: 0,
      },
      level990: categoryStats.find((cat) => cat.category === "level990") || {
        completionRate: 0,
        totalWords: 0,
        completedWords: 0,
      },
    };

    // 最近の学習活動（直近7日間、新規データのみ）
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentActivity = allProgress.flatMap((categoryProgress) =>
      categoryProgress.progress
        .filter(
          (p: UserProgress) =>
            p.word_id.includes("_") && // 新規データのみ
            p.lastAttemptAt &&
            new Date(p.lastAttemptAt) > sevenDaysAgo
        )
        .map((p: UserProgress) => ({
          category: categoryProgress.category,
          wordId: p.word_id,
          lastAttemptAt: p.lastAttemptAt,
          isCompleted: p.isCompleted,
        }))
    );

    // 日付でソート（新しい順）
    recentActivity.sort(
      (a, b) =>
        new Date(b.lastAttemptAt!).getTime() -
        new Date(a.lastAttemptAt!).getTime()
    );

    // 連続学習日数を計算（新規データのみ）
    const allAttemptDates = allProgress
      .flatMap((categoryProgress) =>
        categoryProgress.progress
          .filter(
            (p: UserProgress) => p.word_id.includes("_") && p.lastAttemptAt
          )
          .map((p: UserProgress) => new Date(p.lastAttemptAt!))
      )
      .sort((a, b) => b.getTime() - a.getTime());

    let studyStreak = 0;
    if (allAttemptDates.length > 0) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const lastStudyDate = new Date(allAttemptDates[0]);
      lastStudyDate.setHours(0, 0, 0, 0);

      // 最後の学習日が今日または昨日なら連続日数を計算
      const daysDiff = Math.floor(
        (today.getTime() - lastStudyDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (daysDiff <= 1) {
        studyStreak = 1;
        let currentDate = new Date(lastStudyDate);

        for (let i = 1; i < allAttemptDates.length; i++) {
          const attemptDate = new Date(allAttemptDates[i]);
          attemptDate.setHours(0, 0, 0, 0);

          const prevDate = new Date(currentDate);
          prevDate.setDate(prevDate.getDate() - 1);

          if (attemptDate.getTime() === prevDate.getTime()) {
            studyStreak++;
            currentDate = attemptDate;
          } else if (attemptDate.getTime() < prevDate.getTime()) {
            break;
          }
        }
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        overall: {
          ...totalStats,
          completionRate: overallCompletionRate,
          studyStreak,
        },
        levels: levelStats,
        categories: categoryStats,
        recentActivity: recentActivity.slice(0, 10), // 最新10件
      },
    });
  } catch (error) {
    console.error("Dashboard API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}
