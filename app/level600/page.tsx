"use client";
import DMATButton from "@/components/elements/DMATButton";
import { level600Data } from "@/data/level600";
import { ProgressTest } from "@/features/level600/ProgressTest";
import { level600ItemsState, statusState } from "@/states/trainingState";
import { EnglishData, Status, Option } from "@/types/data";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { getRandomItems } from "@/common/utils";

const options: Option[] = [
  { value: 10, label: "10" },
  { value: 30, label: "30" },
  { value: 50, label: "50" },
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
    setStatus("not_started");
    setLevel600Items(level600Data);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2 w-full h-full p-2">
      {status === "not_started" && (
        <>
          <span onClick={() => router.push("/")}>トップページに戻る</span>
          <div>
            <span>問題数: </span>
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
          <p>終了~</p>
          <DMATButton title="ホームに戻る" handleClick={handleClickBackToTop} />
        </div>
      )}
    </div>
  );
};

export default Level600;
