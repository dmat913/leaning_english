"use client";
import DMATButton from "@/components/elements/DMATButton";
import { level600Data, level600Options } from "@/data/level600";
import { ProgressTest } from "@/features/level600/ProgressTest";
import { level600ItemsState, statusState } from "@/states/trainingState";
import { EnglishData, Status, Option } from "@/types/types";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { getRandomItems } from "@/common/utils";
import { Background } from "@/components/aceternity/Background";

const options: Option[] = [
  ...level600Options,
  { value: level600Data.length, label: `Max(${level600Data.length})` },
];

const Level600 = () => {
  const router = useRouter();

  // テスト状態
  const [status, setStatus] = useRecoilState(statusState);
  // 600点レベルstate
  const setLevel600Items: (level600Items: EnglishData[]) => void =
    useSetRecoilState(level600ItemsState);

  //問題数
  const [selectedValue, setSelectedValue] = useState<string>("10");

  // 問題リスト更新
  useEffect(() => {
    setLevel600Items(getRandomItems(level600Data, Number(selectedValue)));
  }, [selectedValue]);

  // 問題数select変更時
  const handleChangeNumber = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };

  // テストstatus変更
  const handleChangeStatus = (type: Status) => {
    setStatus(type);
  };

  // ホームへ戻るボタン押下
  const handleClickBackToTop = () => {
    router.push("/");
    setTimeout(() => {
      setStatus("not_started");
    }, 1000);
  };

  return (
    <Background>
      <div className="flex flex-col items-center justify-center gap-2 w-full h-full p-2">
        {status === "not_started" && (
          <>
            <span className="text-white-1" onClick={() => router.push("/")}>
              トップページに戻る
            </span>
            <div>
              <span className="text-white-1">問題数: </span>
              <select value={selectedValue} onChange={handleChangeNumber}>
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <DMATButton
              title="開始"
              handleClick={() => handleChangeStatus("in_progress")}
            />
          </>
        )}
        {status === "in_progress" && <ProgressTest />}
        {status === "completed" && (
          <div className="flex flex-col gap-3 items-center">
            <p className="text-white-1">終了~</p>
            <DMATButton
              title="ホームに戻る"
              handleClick={handleClickBackToTop}
            />
          </div>
        )}
      </div>
    </Background>
  );
};

export default Level600;
