"use client";
import { Background } from "@/components/aceternity/Background";
import NotStarted from "@/components/training/NotStarted";
import { statusState } from "@/states/trainingState";
import { Status } from "@/types/types";
import React, { useCallback } from "react";
import { useRecoilState } from "recoil";
import ProgressTraining from "@/components/training/supplement/ProgressTraining";
import CompletedTraining from "@/components/training/supplement/CompletedTraining";
import DisplayList from "@/features/phrases/DisplayList";
import SettingTraining from "@/features/phrases/SettingTraining";

const Phrases = () => {
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
            title="定型表現"
            description="120 Set Phrases"
          />
        )}
        {status === "setting_training" && (
          <SettingTraining handleChangeStatus={handleChangeStatus} />
        )}
        {status === "in_progress" && <ProgressTraining />}
        {status === "completed" && (
          <CompletedTraining handleChangeStatus={handleChangeStatus} />
        )}
        {status === "display_list" && (
          <DisplayList handleChangeStatus={handleChangeStatus} />
        )}
      </div>
    </Background>
  );
};

export default Phrases;
