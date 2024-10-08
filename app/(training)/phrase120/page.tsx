"use client";
import { Background } from "@/components/aceternity/Background";
import NotStarted from "@/components/training/NotStarted";
import { statusState } from "@/states/trainingState";
import { Status } from "@/types/types";
import React, { useCallback } from "react";
import { useRecoilState } from "recoil";
import DisplayList from "@/components/training/DisplayList";
import { phrase120State } from "@/states/testDataState";
import ProgressTraining from "@/components/training/ProgressTraining";
import SettingTraining from "@/components/training/SettingTraining";
import { phrases120FromOptions, phrases120Options } from "@/data/120SetPhrases";
import CompletedTraining from "@/components/training/CompletedTraining";
import ListeningEnglish from "@/components/training/ListeningEnglish";

const Phrases = () => {
  // テスト状態
  const [status, setStatus] = useRecoilState(statusState);

  // phrase120 test data
  const [phrase120Data, setPhrase120Data] = useRecoilState(phrase120State);

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
          <SettingTraining
            handleChangeStatus={handleChangeStatus}
            targetData={phrase120Data}
            options={phrases120Options}
            fromOptions={phrases120FromOptions}
          />
        )}
        {status === "in_progress" && (
          <ProgressTraining setOriginalTestData={setPhrase120Data} />
        )}
        {status === "completed" && (
          <CompletedTraining handleChangeStatus={handleChangeStatus} />
        )}
        {status === "listening" && (
          <ListeningEnglish handleChangeStatus={handleChangeStatus} />
        )}
        {status === "display_list" && (
          <DisplayList
            totalQuestions={120}
            displayData={phrase120Data}
            handleChangeStatus={handleChangeStatus}
          />
        )}
      </div>
    </Background>
  );
};

export default Phrases;
