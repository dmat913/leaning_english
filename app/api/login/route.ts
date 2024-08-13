import { UserModel } from "@/models/userModel";
import { connectDb } from "@/utils/database";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    await connectDb();

    const { name, password } = await req.json();

    // name と password を使ってユーザーを検索
    const user = await UserModel.findOne({ name, password });

    if (user) {
      return NextResponse.json({
        message: "ログイン成功",
        user: user,
      });
    } else {
      return NextResponse.json(
        { message: "ログイン失敗：ユーザーが見つかりません" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "ログイン失敗：エラーが発生しました" },
      { status: 500 }
    );
  }
};
