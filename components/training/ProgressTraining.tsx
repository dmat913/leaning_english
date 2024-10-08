"use client";
import { handlePlayAudio } from "@/common/utils";
import { TextRevealCard } from "@/components/aceternity/TextRevealCard";
import {
  TrainingResultState,
  testDataState,
  statusState,
  trainingDisplayTypeState,
} from "@/states/trainingState";
import React, { memo, useCallback, useMemo, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { IoCloseCircle } from "react-icons/io5";
import { BiUserVoice } from "react-icons/bi";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { FaCheckCircle, FaRegStar, FaStar } from "react-icons/fa";
import useAudio from "@/hooks/useAudio";
import { EnglishData } from "@/types/types";
import { usePathname } from "next/navigation";
import { userState } from "@/states/userState";
import { TestData } from "@/models/userModel";
import DMATLoading from "../elements/DMATLoading";
import DMATDialog from "../elements/DMATDialog";
import DMATCloseButton from "../elements/DMATCloseButton";

interface ProgressTrainingProps {
  setOriginalTestData: (testData: TestData[]) => void;
}

function ProgressTraining({ setOriginalTestData }: ProgressTrainingProps) {
  const { playInterrupt } = useAudio();
  const pathname = usePathname();

  // user info
  const user = useRecoilValue(userState);

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
      trainingResult.some(
        (item) => item.data._id === testData[problemNumber]._id
      )
    ) {
      const updateList: {
        data: EnglishData;
        result: boolean;
      }[] = trainingResult.map((item) => {
        if (item.data._id === testData[problemNumber]._id) {
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

  // わかるorわからないボタン押下
  const handleClickDisplayResult = useCallback(
    (displayResultFlag: boolean) => {
      updateTrainingResult(displayResultFlag);
      playInterrupt();
      setIsCorrect(displayResultFlag);
      setIsVisibleResult(true);
    },
    // eslint-disable-next-line
    [testData, problemNumber, trainingResult]
  );

  // 単語意味,カンマで分割
  const wordSplit: string[] = useMemo(() => {
    return testData[problemNumber].wordMeaning.split(",");
    // eslint-disable-next-line
  }, [problemNumber]);

  // 更新対象テスト結果取得
  const getUpdateTargetData = (data: any) => {
    switch (pathname) {
      case "/level600":
        return data.user.level600_data;
      case "/level730":
        return data.user.level730_data;
      case "/level860":
        return data.user.level860_data;
      case "/level990":
        return data.user.level990_data;
      case "/part1_essentialWord100":
        return data.user.part1_essentialWord100;
      case "/phrase120":
        return data.user.phrase120_data;
      case "/prepositions":
        return data.user.prepositions_data;
      case "/conjunctions":
        return data.user.conjunctions_data;
      case "/conjunctiveAdverbs":
        return data.user.conjunctiveAdverbs_data;
      default:
        return [];
    }
  };

  // Api呼び出し時ローディング判定
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 星押下時
  const handleClickStar = async (isCompleted: boolean) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/update-completed", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?._id,
          word_id: testData[problemNumber].word_id,
          isCompleted: isCompleted,
          levelKey:
            pathname === "/part1_essentialWord100"
              ? "part1_essentialWord100"
              : `${pathname.slice(1)}_data`,
        }),
      });
      // 更新後データ
      const data = await response.json();
      // 更新成功時
      if (response.ok) {
        sessionStorage.clear();
        sessionStorage.setItem("user", JSON.stringify(data.user));
        setTestData((testData) =>
          testData.map((data) => {
            if (data.word_id === testData[problemNumber].word_id) {
              return { ...data, isCompleted: isCompleted };
            } else {
              return data;
            }
          })
        );
        setOriginalTestData(getUpdateTargetData(data));
      }
    } catch (error) {
      alert("更新失敗");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        className="flex flex-col items-center justify-center rounded-2xl w-full"
        style={{ gap: "40px" }}
      >
        <DMATCloseButton handleClick={() => setIsOpenDialog(true)} />
        <div className="flex items-end gap-2 pl-1">
          <div
            onClick={() => handlePlayAudio(testData[problemNumber].word)}
            className="bg-yellow-2 w-24 h-24 rounded-2xl flex items-center justify-center shadow-md active:scale-105"
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
          {testData[problemNumber].sentence !== "" &&
            (trainingDisplayType === "englishToJapanese" ? (
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
            ))}

          <div className="flex items-center justify-between">
            <div className="flex items-center pl-1" style={{ gap: "8px" }}>
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
            <button
              className="border rounded-md h-10 w-10 flex items-center justify-center active:scale-105"
              disabled={isLoading}
              onClick={() =>
                handleClickStar(!testData[problemNumber].isCompleted)
              }
            >
              {isLoading ? (
                <DMATLoading otherClass="h-5 w-5" />
              ) : (
                <>
                  {testData[problemNumber].isCompleted ? (
                    <FaStar color="#FFD700" size={24} />
                  ) : (
                    <FaRegStar color="#FFD700" size={24} />
                  )}
                </>
              )}
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <button
            className="bg-white-1 h-10 rounded-lg text-black-1 w-full active:scale-105"
            onClick={() => handleClickDisplayResult(false)}
            disabled={isVisibleResult}
          >
            わからない
          </button>
          <div className="flex items-center gap-2">
            <button
              className="bg-yellow-2 h-10 rounded-lg text-black-1 flex-1 active:scale-105"
              onClick={() => handleClickDisplayResult(true)}
              disabled={isVisibleResult}
            >
              わかる
            </button>
          </div>
        </div>
      </div>
      {isOpenDialog && (
        <DMATDialog
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
                  <span className="text-green-2">わかる</span>
                </div>
                <IoCloseCircle
                  color="#ff5e57"
                  size={32}
                  onClick={() => handleClickDisplayResult(false)}
                />
              </>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <IoCloseCircle color="#ff5e57" size={32} />
                  <span className="text-red-2">わからない</span>
                </div>
                <FaCheckCircle
                  color="#4cd964"
                  size={32}
                  onClick={() => handleClickDisplayResult(true)}
                />
              </>
            )}
          </div>
          <div className="flex flex-col gap-1 text-black-1">
            <span>
              {trainingDisplayType === "englishToJapanese" ? (
                <div className="flex flex-col gap-1">
                  {wordSplit.map((word, index) => (
                    <div className="flex items-center gap-2" key={index}>
                      {testData[problemNumber].portOfSpeech.length > 0 && (
                        <span
                          className={cn(
                            `border text-sm text-white-1 bg-green-2`,
                            !isCorrect && "bg-red-2"
                          )}
                          style={{
                            padding: "4px 10px",
                            borderRadius: "4px",
                          }}
                        >
                          {testData[problemNumber].portOfSpeech[index]}
                        </span>
                      )}
                      {word}
                    </div>
                  ))}
                </div>
              ) : (
                testData[problemNumber].word
              )}
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
              `w-full active:scale-105 bg-red-2 text-white-1 h-10 rounded-lg shadow-md`,
              `${isCorrect ? "bg-green-2" : "bg-red-2"}`
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
