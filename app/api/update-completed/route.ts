import { connectDb } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { UserModel } from "@/models/userModel";

export async function POST(request: NextRequest) {
  try {
    await connectDb();

    const { userId, word_id, isCompleted, levelKey } = await request.json();

    if (!userId || !word_id || isCompleted === undefined || !levelKey) {
      return NextResponse.json(
        { message: "入力データが不足しています" },
        { status: 400 }
      );
    }

    // 動的なフィールド名を使用
    const query = {
      _id: new ObjectId(String(userId)),
      [`${levelKey}.word_id`]: word_id,
    };
    const update = { $set: { [`${levelKey}.$.isCompleted`]: isCompleted } };

    // ユーザーを検索してデータを更新
    const user = await UserModel.findOneAndUpdate(query, update, { new: true });

    console.log(update);

    if (user) {
      return NextResponse.json({ message: "更新成功", user });
    } else {
      return NextResponse.json(
        { message: "ユーザーまたは単語が見つかりません" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("更新エラー:", error);
    return NextResponse.json({ message: "更新失敗" }, { status: 500 });
  }
}
