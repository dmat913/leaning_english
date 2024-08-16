export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/utils/database";
import { UserModel } from "@/models/userModel";

export async function GET(
  request: NextRequest,
  { params }: { params: { name: string } }
) {
  try {
    await connectDb();

    // name を使ってユーザーを検索
    const user = await UserModel.findOne({ name: params.name });
    if (user) {
      return NextResponse.json({
        message: "データ取得成功",
        user: user,
      });
    } else {
      return NextResponse.json(
        { message: "ユーザーが見つかりません。" },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "サーバーでエラーが発生しました。" },
      { status: 500 }
    );
  }
}
