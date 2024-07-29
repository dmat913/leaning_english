"use client";
import { handlePlayAudio } from "@/common/utils";
import { TextRevealCard } from "@/components/aceternity/TextRevealCard";
import DMATButton from "@/components/elements/DMATButton";
import Dialog from "@/components/elements/Dialog";
import { statusState, trainingDisplayTypeState } from "@/states/trainingState";
import React, { memo, useCallback, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { IoPlayCircleOutline } from "react-icons/io5";
import { BsCheckSquare } from "react-icons/bs";
import { CgCloseR } from "react-icons/cg";
import CloseButton from "@/components/elements/CloseButton";
import {
  departmentsAndOccupationsTestDataState,
  trainingResultState,
} from "@/states/departmentsAndOccupationsState";

function ProgressTraining() {
  // テスト対象
  const [testData, setTestData] = useRecoilState(
    departmentsAndOccupationsTestDataState
  );
  // 問題番号
  const [problemNumber, setProblemNumber] = useState<number>(0);

  // test種類 日本語→英語or英語→日本語
  const [trainingDisplayType, setTrainingDisplayType] = useRecoilState(
    trainingDisplayTypeState
  );
  // status,setter
  const setStatus = useSetRecoilState(statusState);
  //正解不正解,set
  const setTrainingResult = useSetRecoilState(trainingResultState);

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

          <div className="flex gap-2 pl-1">
            <button
              className="inline-flex items-center gap-2 border py-1 px-2.5 rounded-md active:scale-105"
              onClick={() => handlePlayAudio(testData[problemNumber].word)}
            >
              <IoPlayCircleOutline size={24} color="#FAF0E6" />
              <span className="text-white-1">単語</span>
            </button>
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
            // setTrainingDisplayType("englishToJapanese");
          }}
        />
      )}
    </>
  );
}

export default memo(ProgressTraining);
