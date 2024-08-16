"use client";
import { statusState } from "@/states/trainingState";
import { Status } from "@/types/types";
import React, { useCallback } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import CompletedTraining from "@/components/training/CompletedTraining";
import { level730FromOptions, level730Options } from "@/data/level730";
import DisplayList from "@/components/training/DisplayList";
import NotStarted from "@/components/training/NotStarted";
import SettingTraining from "@/components/training/SettingTraining";
import ProgressTraining from "@/components/training/ProgressTraining";
import { level730State } from "@/states/testDataState";
// import ContinuousEnglish from "@/components/training/ContinuousEnglish";

const Level730 = () => {
  // テスト状態
  const [status, setStatus] = useRecoilState(statusState);
  // level730 test data
  const level730Data = useRecoilValue(level730State);

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
          title="730点レベル"
          description="加速の300語"
        />
      )}
      {status === "display_list" && (
        <DisplayList
          handleChangeStatus={handleChangeStatus}
          displayData={level730Data}
        />
      )}
      {status === "setting_training" && (
        <SettingTraining
          handleChangeStatus={handleChangeStatus}
          targetData={level730Data}
          options={level730Options}
          fromOptions={level730FromOptions}
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

export default Level730;
