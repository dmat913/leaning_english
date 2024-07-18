"use client";
import { TextRevealCard } from "@/components/aceternity/TextRevealCard";
import DMATButton from "@/components/elements/DMATButton";
import { level600ItemsState, statusState } from "@/states/trainingState";
import React, { useEffect, useState } from "react";
import { FaPlayCircle } from "react-icons/fa";
import { IoPlayForwardCircle } from "react-icons/io5";
import { useRecoilValue, useSetRecoilState } from "recoil";

export function ProgressTest() {
  // テスト対象
  const level600Items = useRecoilValue(level600ItemsState);
  // 問題番号
  const [problemNumber, setProblemNumber] = useState<number>(0);
  // 詳細表示
  const [isDisplayDetail, setIsDisplayDetail] = useState<boolean>(false);
  // status,setter
  const setStatus = useSetRecoilState(statusState);

  const handlePlayAudio = (text: string) => {
    const uttr = new SpeechSynthesisUtterance(text);
    uttr.lang = "en-US";
    window.speechSynthesis.speak(uttr);
  };

  // わかるボタン押下
  const handleClickRightButton = () => {
    if (level600Items.length > problemNumber + 1) {
      setProblemNumber(problemNumber + 1);
      setIsDisplayDetail(false);
    } else {
      setStatus("completed");
    }
  };

  // 表示するor次へボタン押下
  const handleClickLeftButton = () => {
    if (isDisplayDetail) {
      handleClickRightButton();
    } else {
      setIsDisplayDetail(true);
    }
  };

  return (
    <div className="flex flex-col gap-3 bg-[#0E0E10] rounded-2xl w-full">
      <div className="flex items-center gap-3">
        <p className="text-xl">
          {`${problemNumber + 1} ${level600Items[problemNumber].word}`}
        </p>
        <IoPlayForwardCircle
          size="2rem"
          onClick={() => handlePlayAudio(level600Items[problemNumber].sentence)}
        />
      </div>
      <TextRevealCard data={level600Items[problemNumber]} />
      {isDisplayDetail && (
        <div className="flex flex-col">
          <p>{level600Items[problemNumber].wordMeaning}</p>
          <p>
            {level600Items[problemNumber].portOfSpeech.map((item) => (
              <span>{item}</span>
            ))}
          </p>
        </div>
      )}
      <div className="flex justify-center gap-2 w-full">
        <DMATButton
          title={isDisplayDetail ? "次へ" : "表示する"}
          handleClick={handleClickLeftButton}
        />
        <DMATButton
          title={problemNumber + 1 === level600Items.length ? "終了" : "わかる"}
          handleClick={handleClickRightButton}
          disabled={isDisplayDetail}
        />
      </div>
    </div>
  );
}
