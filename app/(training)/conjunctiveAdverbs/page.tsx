"use client";

import NotStarted from "@/components/training/NotStarted";
import { statusState } from "@/states/trainingState";
import { Status } from "@/types/types";
import React, { useCallback } from "react";
import { useRecoilState } from "recoil";
import SettingTraining from "@/features/supplement/SettingTraining";
import CompletedTraining from "@/components/training/CompletedTraining";
import DisplayList from "@/components/training/DisplayList";
import { conjunctiveAdverbsState } from "@/states/testDataState";
import ProgressTraining from "@/components/training/ProgressTraining";

const FunctionWords = () => {
  // テスト状態
  const [status, setStatus] = useRecoilState(statusState);

  // 前置詞データ
  const [conjunctiveAdverbs, setConjunctiveAdverbs] = useRecoilState(
    conjunctiveAdverbsState
  );

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
          title="接続副詞"
          description="Prepositions"
        />
      )}
      {status === "setting_training" && (
        <SettingTraining
          handleChangeStatus={handleChangeStatus}
          targetTestData={conjunctiveAdverbs}
        />
      )}
      {status === "in_progress" && (
        <ProgressTraining setOriginalTestData={setConjunctiveAdverbs} />
      )}
      {status === "completed" && (
        <CompletedTraining handleChangeStatus={handleChangeStatus} />
      )}
      {status === "display_list" && (
        <DisplayList
          handleChangeStatus={handleChangeStatus}
          displayData={conjunctiveAdverbs}
          totalQuestions={conjunctiveAdverbs.length}
        />
      )}
    </div>
  );
};

export default FunctionWords;
