export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { UserModel } from "@/models/userModel";

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    // クエリパラメータから name を取得
    const { searchParams } = new URL(request.url);
    const name = searchParams.get("name");

    if (!name) {
      return NextResponse.json(
        { message: "name が不足しています" },
        { status: 400 }
      );
    }

    // ユーザー基本情報を取得
    const user = await UserModel.findOne({ name });
    if (!user) {
      return NextResponse.json(
        { message: "ユーザーが見つかりません。" },
        { status: 404 }
      );
    }

    // ユーザー基本情報のみ返す
    return NextResponse.json({
      message: "データ取得成功",
      user: {
        _id: user._id,
        name: user.name,
        thumbnail: user.thumbnail,
      },
    });
  } catch (error) {
    console.error("ユーザーデータ取得エラー:", error);
    return NextResponse.json(
      { message: "サーバーでエラーが発生しました。" },
      { status: 500 }
    );
  }
}
