"use client";
import { statusState } from "@/states/trainingState";
import { Status } from "@/types/types";
import React, { useCallback } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import CompletedTraining from "@/components/training/CompletedTraining";
import DisplayList from "@/components/training/DisplayList";
import NotStarted from "@/components/training/NotStarted";
import SettingTraining from "@/components/training/SettingTraining";
import ProgressTraining from "@/components/training/ProgressTraining";
import { level990FromOptions, level990Options } from "@/data/level990";
import { level990State } from "@/states/testDataState";
// import ContinuousEnglish from "@/components/training/ContinuousEnglish";

const Level990 = () => {
  // テスト状態
  const [status, setStatus] = useRecoilState(statusState);
  // level990 test data
  const level990Data = useRecoilValue(level990State);

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
          title="990点レベル"
          description="頂点の100語"
        />
      )}
      {status === "display_list" && (
        <DisplayList
          handleChangeStatus={handleChangeStatus}
          displayData={level990Data}
        />
      )}
      {status === "setting_training" && (
        <SettingTraining
          handleChangeStatus={handleChangeStatus}
          targetData={level990Data}
          options={level990Options}
          fromOptions={level990FromOptions}
        />
      )}
      {status === "in_progress" && <ProgressTraining />}
      {/* {status === "continuous_english" && <ContinuousEnglish />} */}
      {status === "completed" && (
        <CompletedTraining handleChangeStatus={handleChangeStatus} />
      )}
    </div>
  );
};

export default Level990;
