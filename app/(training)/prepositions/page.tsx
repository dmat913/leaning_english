"use client";

import NotStarted from "@/components/training/NotStarted";
import { statusState } from "@/states/trainingState";
import { Status } from "@/types/types";
import React, { useCallback } from "react";
import { useRecoilState } from "recoil";
import SettingTraining from "@/features/supplement/SettingTraining";
import CompletedTraining from "@/components/training/CompletedTraining";
import DisplayList from "@/components/training/DisplayList";
import { TestData } from "@/models/userModel";
import { prepositionsState } from "@/states/testDataState";
import ProgressTraining from "@/components/training/ProgressTraining";

const FunctionWords = () => {
  // テスト状態
  const [status, setStatus] = useRecoilState(statusState);

  // 前置詞データ
  const [prepositionsData, setPrepositionsData] =
    useRecoilState(prepositionsState);

  // テストstatus変更
  const handleChangeStatus = useCallback((status: Status) => {
    setStatus(status);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="flex w-full h-full relative">
      {status === "not_started" && (
        <NotStarted
          handleChangeStatus={handleChangeStatus}
          title="前置詞"
          description="Prepositions"
        />
      )}
      {status === "setting_training" && (
        <SettingTraining
          handleChangeStatus={handleChangeStatus}
          targetTestData={prepositionsData}
        />
      )}
      {status === "in_progress" && (
        <ProgressTraining setOriginalTestData={setPrepositionsData} />
      )}
      {status === "completed" && (
        <CompletedTraining handleChangeStatus={handleChangeStatus} />
      )}
      {status === "display_list" && (
        <DisplayList
          handleChangeStatus={handleChangeStatus}
          displayData={prepositionsData}
          totalQuestions={prepositionsData.length}
        />
      )}
    </div>
  );
};

export default FunctionWords;
