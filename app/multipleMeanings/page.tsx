"use client";
import { Background } from "@/components/aceternity/Background";
import NotStarted from "@/components/training/NotStarted";
import { statusState } from "@/states/trainingState";
import { Status } from "@/types/types";
import React, { useCallback } from "react";
import { useRecoilState } from "recoil";
import ProgressTraining from "@/components/training/supplement/ProgressTraining";
import CompletedTraining from "@/components/training/supplement/CompletedTraining";
import SettingTraining from "@/components/training/supplement/SettingTraining";
import {
  FunctionWordsCheckBoxData,
  FunctionWordsDisplayListData,
} from "@/data/functionWords";
import DisplayList from "@/features/multipleMeanings/DisplayList";

const MultiplePhrases = () => {
  // テスト状態
  const [status, setStatus] = useRecoilState(statusState);

  // テストstatus変更
  const handleChangeStatus = useCallback((status: Status) => {
    setStatus(status);
  }, []);

  return (
    <Background>
      <div className="flex justify-center w-full h-full relative">
        {status === "not_started" && (
          <NotStarted
            handleChangeStatus={handleChangeStatus}
            title="多義語"
            description="88 Words with multiple Meanings"
          />
        )}
        {status === "setting_training" && (
          <SettingTraining
            handleChangeStatus={handleChangeStatus}
            defaultCheckboxData={FunctionWordsCheckBoxData}
          />
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

export default MultiplePhrases;
