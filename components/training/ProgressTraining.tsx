"use client";
import { handlePlayAudio } from "@/common/utils";
import { TextRevealCard } from "@/components/aceternity/TextRevealCard";
import Dialog from "@/components/elements/Dialog";
import {
  TrainingResultState,
  testDataState,
  statusState,
  trainingDisplayTypeState,
} from "@/states/trainingState";
import React, { memo, useCallback, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import CloseButton from "../elements/CloseButton";
import { IoCloseCircle } from "react-icons/io5";
import { BiUserVoice } from "react-icons/bi";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { FaCheckCircle } from "react-icons/fa";
import useAudio from "@/hooks/useAudio";
import { EnglishData } from "@/types/types";

function ProgressTraining() {
  const { playInterrupt } = useAudio();

  // テスト対象
  const [testData, setTestData] = useRecoilState(testDataState);
  // 問題番号
  const [problemNumber, setProblemNumber] = useState<number>(0);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  // 面接中断ダイアログ 表示flag
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  // テスト結果画面表示flag
  const [isVisibleResult, setIsVisibleResult] = useState(false);

  // test種類 日本語→英語or英語→日本語
  const [trainingDisplayType, setTrainingDisplayType] = useRecoilState(
    trainingDisplayTypeState
  );
  // status,setter
  const setStatus = useSetRecoilState(statusState);
  //正解不正解,set
  const [trainingResult, setTrainingResult] =
    useRecoilState(TrainingResultState);

  // 問題表示判定
  const CheckCurrentProblem = () => {
    setIsVisibleResult(false);
    playInterrupt();
    if (testData.length > problemNumber + 1) {
      setProblemNumber((problemNumber) => problemNumber + 1);
    } else {
      setStatus("completed");
    }
  };

  // テスト結果データ更新
  const updateTrainingResult = (result: boolean) => {
    if (
      trainingResult.some((item) => item.data.id === testData[problemNumber].id)
    ) {
      const updateList: {
        data: EnglishData;
        result: boolean;
      }[] = trainingResult.map((item) => {
        if (item.data.id === testData[problemNumber].id) {
          return { ...item, result: !item.result };
        }
        return item;
      });
      setTrainingResult(updateList);
    } else {
      setTrainingResult((trainingResult) => [
        ...trainingResult,
        { data: testData[problemNumber], result: result },
      ]);
    }
  };

  // わかるボタン押下
  const handleClickRightButton = useCallback(() => {
    updateTrainingResult(true);
    playInterrupt();
    setIsCorrect(true);
    setIsVisibleResult(true);
  }, [testData, problemNumber, trainingResult]);

  // わからないボタン押下
  const handleClickLeftButton = useCallback(() => {
    updateTrainingResult(false);
    playInterrupt();
    setIsCorrect(false);
    setIsVisibleResult(true);
  }, [testData, problemNumber, trainingResult]);

  //閉じるボタン押下時
  const handleClickCloseButton = () => {
    setIsOpenDialog(true);
  };

  return (
    <>
      <div
        className="flex flex-col items-center justify-center rounded-2xl w-full"
        style={{ gap: "40px" }}
      >
        <CloseButton handleClick={handleClickCloseButton} />
        <div className="flex items-end gap-2 pl-1">
          <div
            onClick={() => handlePlayAudio(testData[problemNumber].word)}
            className="bg-[#FFEB3B] w-24 h-24 rounded-2xl flex items-center justify-center shadow-md active:scale-105"
          >
            <BiUserVoice size={60} color="" />
          </div>
          <div
            onClick={() => handlePlayAudio(testData[problemNumber].sentence)}
            className="bg-[#FFEB3B] w-16 h-16 rounded-2xl flex items-center justify-center shadow-md active:scale-105"
          >
            <BiUserVoice size={40} color="" />
          </div>
        </div>
        <div className="flex gap-3 flex-col w-full bg-gray-900 p-4 rounded-md shadow-xl opacity-95">
          <div className="flex items-center gap-2 w-full">
            <span className="text-white-1 font-bold text-3xl">
              {problemNumber + 1},
            </span>
            {trainingDisplayType === "englishToJapanese" ? (
              <TextRevealCard
                displayText={testData[problemNumber].word}
                bgText={testData[problemNumber].wordMeaning}
                className="flex flex-1"
              />
            ) : (
              <TextRevealCard
                displayText={testData[problemNumber].wordMeaning}
                bgText={testData[problemNumber].word}
                className="flex flex-1"
              />
            )}
          </div>
          {trainingDisplayType === "englishToJapanese" ? (
            <TextRevealCard
              displayText={testData[problemNumber].sentence}
              bgText={testData[problemNumber].sentenceMeaning}
              className="flex flex-1"
              size="small"
            />
          ) : (
            <TextRevealCard
              displayText={testData[problemNumber].sentenceMeaning}
              bgText={testData[problemNumber].sentence}
              className="flex flex-1"
              size="small"
            />
          )}

          <div className="flex items-center w-full pl-1" style={{ gap: "8px" }}>
            {testData[problemNumber].portOfSpeech.map((item, index) => (
              <div
                key={index}
                className="border text-sm text-black-1 bg-white-1"
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
        </div>
        <div className="flex flex-col gap-2 w-full">
          <button
            className="bg-white-1 h-10 rounded-lg text-black-1 w-full active:scale-105"
            onClick={handleClickLeftButton}
            disabled={isVisibleResult}
          >
            わからない
          </button>
          <button
            className="bg-[#FFEB3B] h-10 rounded-lg text-black-1 w-full active:scale-105"
            onClick={handleClickRightButton}
            disabled={isVisibleResult}
          >
            わかる
          </button>
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
            setTestData([]);
            setStatus("not_started");
            setTrainingDisplayType("englishToJapanese");
          }}
        />
      )}
      {isVisibleResult && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            backgroundColor: isCorrect ? "#d4edda" : "#f8d7da",
            padding: "10px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <div className="flex items-center justify-between">
            {isCorrect ? (
              <>
                <div className="flex items-center gap-2">
                  <FaCheckCircle color="#4cd964" size={32} />
                  <span className="text-[#4cd964]">わかる</span>
                </div>
                <IoCloseCircle
                  color="#ff5e57"
                  size={32}
                  onClick={handleClickLeftButton}
                />
              </>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <IoCloseCircle color="#ff5e57" size={32} />
                  <span className="text-[#ff5e57]">わからない</span>
                </div>
                <FaCheckCircle
                  color="#4cd964"
                  size={32}
                  onClick={handleClickRightButton}
                />
              </>
            )}
          </div>
          <div className="flex flex-col gap-1 text-black-1">
            <span>
              {trainingDisplayType === "englishToJapanese"
                ? testData[problemNumber].wordMeaning
                : testData[problemNumber].word}
            </span>
            <span>
              {trainingDisplayType === "englishToJapanese"
                ? testData[problemNumber].sentenceMeaning
                : testData[problemNumber].sentence}
            </span>
          </div>
          <button
            onClick={CheckCurrentProblem}
            className={cn(
              `w-full active:scale-105 bg-[#ff5e57] text-white-1 h-10 rounded-lg shadow-md`,
              `${isCorrect ? "bg-[#4cd964]" : "bg-[#ff5e57]"}`
            )}
          >
            次へ
          </button>
        </motion.div>
      )}
    </>
  );
}

export default memo(ProgressTraining);
