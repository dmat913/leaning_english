"use client";
import { ProgressTraining } from "@/components/training/ProgressTraining";
import { statusState } from "@/states/trainingState";
import { Status } from "@/types/types";
import React, { useCallback } from "react";
import { useRecoilState } from "recoil";
import { Background } from "@/components/aceternity/Background";
import NotStarted from "@/features/level730/NotStarted";
import DisplayList from "@/features/level730/DisplayList";
import SettingTraining from "@/features/level730/SettingTraining";
import CompletedTraining from "@/components/training/CompletedTraining";

const Level730 = () => {
  // テスト状態
  const [status, setStatus] = useRecoilState(statusState);

  // テストstatus変更
  const handleChangeStatus = useCallback((status: Status) => {
    setStatus(status);
  }, []);

  return (
    <Background>
      <div className="flex w-full h-full relative p-10">
        {status === "not_started" && (
          <NotStarted handleChangeStatus={handleChangeStatus} />
        )}
        {status === "display_list" && (
          <DisplayList handleChangeStatus={handleChangeStatus} />
        )}
        {status === "setting_training" && (
          <SettingTraining handleChangeStatus={handleChangeStatus} />
        )}
        {status === "in_progress" && <ProgressTraining />}
        {status === "completed" && (
          <CompletedTraining handleChangeStatus={handleChangeStatus} />
        )}
      </div>
    </Background>
  );
};

export default Level730;
