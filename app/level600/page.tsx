"use client";
import DMATButton from "@/components/elements/DMATButton";
import { level600ItemsState } from "@/states/contentsState";
import { EnglishData } from "@/types/data";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";

const Level600 = () => {
  const router = useRouter();

  // 600点レベルstate
  const [level600Items, setLevel600Items] = useRecoilState(level600ItemsState);

  // TODO: ランダムが選択されたときに実行
  useEffect(() => {
    // 配列からランダムな件数を取得
    const getRandomItems = (array: EnglishData[], count: number) => {
      const shuffled = [...array].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    };

    setLevel600Items(getRandomItems(level600Items, 10));
    // eslint-disable-next-line
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-2 w-full h-full">
      <span onClick={() => router.push("/")}>トップページに戻る</span>
      <span>問題数選択できるようにする。</span>
      <span>今は仮でData.tsからランダム10問</span>
      <DMATButton title="開始" />
    </div>
  );
};

export default Level600;
