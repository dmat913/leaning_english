"use client";
import { handlePlayAudio } from "@/common/utils";
import { TextRevealCard } from "@/components/aceternity/TextRevealCard";
import DMATButton from "@/components/elements/DMATButton";
import Dialog from "@/components/elements/Dialog";
import {
  TrainingResultState,
  level600ItemsState,
  statusState,
} from "@/states/trainingState";
import React, { useCallback, useState } from "react";
import { FaPlayCircle } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { IoMdClose, IoMdCloseCircle } from "react-icons/io";
import { useRecoilState, useSetRecoilState } from "recoil";

export function ProgressTraining() {
  // テスト対象
  const [level600Items, setLevel600Item] = useRecoilState(level600ItemsState);
  // 問題番号
  const [problemNumber, setProblemNumber] = useState<number>(0);
  // status,setter
  const setStatus = useSetRecoilState(statusState);
  //正解不正解,set
  const setTrainingResult = useSetRecoilState(TrainingResultState);

  // 問題表示判定
  const CheckCurrentProblem = () => {
    if (level600Items.length > problemNumber + 1) {
      setProblemNumber((problemNumber) => problemNumber + 1);
    } else {
      setStatus("completed");
    }
  };

  // わかるボタン押下
  const handleClickRightButton = useCallback(() => {
    setTrainingResult((trainingResult) => [
      ...trainingResult,
      { data: level600Items[problemNumber], result: true },
    ]);
    CheckCurrentProblem();
  }, [level600Items, problemNumber]);

  // わからないボタン押下
  const handleClickLeftButton = useCallback(() => {
    setTrainingResult((trainingResult) => [
      ...trainingResult,
      { data: level600Items[problemNumber], result: false },
    ]);
    CheckCurrentProblem();
  }, [level600Items, problemNumber]);

  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);

  return (
    <>
      <div
        className="flex flex-col items-center justify-center bg-[#0E0E10] rounded-2xl w-full"
        style={{ gap: "40px" }}
      >
        <IoMdCloseCircle
          size={32}
          onClick={() => setIsOpenDialog(true)}
          color="#FAF0E6"
          className="absolute top-4 right-4"
        />
        <div className="flex gap-3 flex-col w-full">
          <div className="flex items-center gap-2 w-full">
            <span className="text-white-1 font-bold text-3xl">
              {problemNumber + 1},
            </span>
            <TextRevealCard
              displayText={level600Items[problemNumber].word}
              bgText={level600Items[problemNumber].wordMeaning}
              className="flex flex-1"
            />
          </div>
          <TextRevealCard
            displayText={level600Items[problemNumber].sentence}
            bgText={level600Items[problemNumber].sentenceMeaning}
            className="flex flex-1"
            size="small"
          />
          <div className="flex items-center w-full" style={{ gap: "8px" }}>
            {level600Items[problemNumber].portOfSpeech.map((item, index) => (
              <div
                key={index}
                className="border text-sm text-white-1"
                style={{
                  padding: "4px 10px",
                  borderColor: "#FAF0E6",
                  borderRadius: "4px",
                }}
              >
                {item}
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <div
              className="inline-flex items-center gap-2 border"
              style={{ padding: "4px 10px", borderRadius: "4px" }}
              onClick={() => handlePlayAudio(level600Items[problemNumber].word)}
            >
              <FaPlayCircle size={24} color="#FAF0E6" />
              <span className="text-white-1">単語</span>
            </div>
            <div
              className="inline-flex items-center gap-2 border"
              style={{ padding: "4px 10px", borderRadius: "4px" }}
              onClick={() =>
                handlePlayAudio(level600Items[problemNumber].sentence)
              }
            >
              <FaPlayCircle size={24} color="#FAF0E6" />
              <span className="text-white-1">文章</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2 w-full">
          <DMATButton
            title="わからない"
            handleClick={handleClickLeftButton}
            otherClassesButton={{ width: "50%" }}
            otherClassesSpan={{ color: "#0B0B0B", backgroundColor: "#FAF0E6" }}
            icon={<IoMdClose size={16} />}
          />
          <DMATButton
            title={
              problemNumber + 1 === level600Items.length ? "終了" : "わかる"
            }
            handleClick={handleClickRightButton}
            otherClassesButton={{ width: "50%" }}
            icon={<FaCheck size={16} />}
          />
        </div>
      </div>
      {isOpenDialog && (
        <Dialog
          mainText="Trainingを中断しますか？"
          leftButtonText="キャンセル"
          rightButtonText="中断"
          handleClickLeftButton={() => setIsOpenDialog(false)}
          handleClickRightButton={() => {
            setIsOpenDialog(false);
            setLevel600Item([]);
            setStatus("not_started");
          }}
        />
      )}
    </>
  );
}
