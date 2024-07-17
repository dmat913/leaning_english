"use client";
import DMATButton from "@/components/elements/DMATButton";
import { level600Data } from "@/data/level600";
import { ProgressTest } from "@/features/level600/ProgressTest";
import { level600ItemsState, statusState } from "@/states/trainingState";
import { EnglishData, Status } from "@/types/data";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

const Level600 = () => {
  const router = useRouter();

  // テスト状態
  const [status, setStatus] = useRecoilState(statusState);

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

  // テストstatus変更
  const handleChangeStatus = (type: Status) => {
    setStatus(type);
  };

  // ホームへ戻るボタン押下
  const handleClickBackToTop = () => {
    router.push("/");
    setStatus("not_started");
    setLevel600Items(level600Data);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2 w-full h-full p-2">
      {status === "not_started" && (
        <>
          <span onClick={() => router.push("/")}>トップページに戻る</span>
          <span>問題数選択できるようにする。</span>
          <span>今は仮でData.tsからランダム10問</span>
          <DMATButton
            title="開始"
            handleClick={() => handleChangeStatus("in_progress")}
          />
        </>
      )}
      {status === "in_progress" && <ProgressTest />}
      {status === "completed" && (
        <div className="flex flex-col gap-3 items-center">
          <p>終了~</p>
          <DMATButton title="ホームに戻る" handleClick={handleClickBackToTop} />
        </div>
      )}
    </div>
  );
};

export default Level600;
