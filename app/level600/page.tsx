"use client";
import { statusState } from "@/states/trainingState";
import { Status } from "@/types/types";
import React, { useCallback } from "react";
import { useRecoilState } from "recoil";
import { Background } from "@/components/aceternity/Background";
import DisplayList from "@/components/training/DisplayList";
import CompletedTraining from "@/components/training/CompletedTraining";
import {
  level600Data,
  level600FromOptions,
  level600Options,
} from "@/data/level600";
import NotStarted from "@/components/training/NotStarted";
import SettingTraining from "@/components/training/SettingTraining";
import ProgressTraining from "@/components/training/ProgressTraining";
import ContinuousEnglish from "@/components/training/ContinuousEnglish";

const Level600 = () => {
  // テスト状態
  const [status, setStatus] = useRecoilState(statusState);

  // テストstatus変更
  const handleChangeStatus = useCallback((status: Status) => {
    setStatus(status);
    // eslint-disable-next-line
  }, []);

  return (
    <Background>
      <div className="flex w-full h-full relative">
        {status === "not_started" && (
          <NotStarted
            handleChangeStatus={handleChangeStatus}
            title="600点レベル"
            description="助走の400語"
          />
        )}
        {status === "display_list" && (
          <DisplayList
            handleChangeStatus={handleChangeStatus}
            displayData={level600Data}
          />
        )}
        {status === "setting_training" && (
          <SettingTraining
            handleChangeStatus={handleChangeStatus}
            targetData={level600Data}
            options={level600Options}
            fromOptions={level600FromOptions}
          />
        )}
        {status === "in_progress" && <ProgressTraining />}
        {status === "continuous_english" && <ContinuousEnglish />}
        {status === "completed" && (
          <CompletedTraining handleChangeStatus={handleChangeStatus} />
        )}
      </div>
    </Background>
  );
};

export default Level600;
