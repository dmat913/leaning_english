"use client";
import { handlePlayAudio } from "@/common/utils";
import { TextRevealCard } from "@/components/aceternity/TextRevealCard";
import DMATButton from "@/components/elements/DMATButton";
import Dialog from "@/components/elements/Dialog";
import {
  TrainingResultState,
  testDataState,
  statusState,
} from "@/states/trainingState";
import React, { memo, useCallback, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import CloseButton from "../elements/CloseButton";
import { IoPlayCircleOutline } from "react-icons/io5";
import { BsCheckSquare } from "react-icons/bs";
import { CgCloseR } from "react-icons/cg";

function ProgressTraining() {
  // テスト対象
  const [testData, setTestData] = useRecoilState(testDataState);
  // 問題番号
  const [problemNumber, setProblemNumber] = useState<number>(0);
  // status,setter
  const setStatus = useSetRecoilState(statusState);
  //正解不正解,set
  const setTrainingResult = useSetRecoilState(TrainingResultState);

  // 問題表示判定
  const CheckCurrentProblem = () => {
    if (testData.length > problemNumber + 1) {
      setProblemNumber((problemNumber) => problemNumber + 1);
    } else {
      setStatus("completed");
    }
  };

  // わかるボタン押下
  const handleClickRightButton = useCallback(() => {
    setTrainingResult((trainingResult) => [
      ...trainingResult,
      { data: testData[problemNumber], result: true },
    ]);
    CheckCurrentProblem();
  }, [testData, problemNumber]);

  // わからないボタン押下
  const handleClickLeftButton = useCallback(() => {
    setTrainingResult((trainingResult) => [
      ...trainingResult,
      { data: testData[problemNumber], result: false },
    ]);
    CheckCurrentProblem();
  }, [testData, problemNumber]);

  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);

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
        <div className="flex gap-3 flex-col w-full">
          <div className="flex items-center gap-2 w-full">
            <span className="text-white-1 font-bold text-3xl">
              {problemNumber + 1},
            </span>
            <TextRevealCard
              displayText={testData[problemNumber].word}
              bgText={testData[problemNumber].wordMeaning}
              className="flex flex-1"
            />
          </div>
          <TextRevealCard
            displayText={testData[problemNumber].sentence}
            bgText={testData[problemNumber].sentenceMeaning}
            className="flex flex-1"
            size="small"
          />

          <div className="flex gap-2">
            <div
              className="inline-flex items-center gap-2 border"
              style={{ padding: "4px 10px", borderRadius: "4px" }}
              onClick={() => handlePlayAudio(testData[problemNumber].word)}
            >
              <IoPlayCircleOutline size={24} color="#FAF0E6" />
              <span className="text-white-1">単語</span>
            </div>
            <div
              className="inline-flex items-center gap-2 border"
              style={{ padding: "4px 10px", borderRadius: "4px" }}
              onClick={() => handlePlayAudio(testData[problemNumber].sentence)}
            >
              <IoPlayCircleOutline size={24} color="#FAF0E6" />
              <span className="text-white-1">文章</span>
            </div>
          </div>
          <div className="flex items-center w-full" style={{ gap: "8px" }}>
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
        <div className="flex gap-2 w-full">
          <DMATButton
            title="わからない"
            handleClick={handleClickLeftButton}
            otherClassesButton={{ width: "50%" }}
            icon={<CgCloseR size={18} />}
            type="white"
          />
          <DMATButton
            title="わかる"
            handleClick={handleClickRightButton}
            otherClassesButton={{ width: "50%" }}
            icon={<BsCheckSquare size={18} />}
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
            setTestData([]);
            setStatus("not_started");
          }}
        />
      )}
    </>
  );
}

export default memo(ProgressTraining);
