"use client";
import { Background } from "@/components/aceternity/Background";
import NotStarted from "@/components/training/NotStarted";
import { statusState } from "@/states/trainingState";
import { Status } from "@/types/types";
import React, { useCallback } from "react";
import { useRecoilState } from "recoil";
import DisplayList from "@/components/training/DisplayList";
import { phrases120State } from "@/states/testDataState";
import ProgressTraining from "@/components/training/ProgressTraining";
import SettingTraining from "@/components/training/SettingTraining";
import { phrases120FromOptions, phrases120Options } from "@/data/120SetPhrases";
import CompletedTraining from "@/components/training/CompletedTraining";
import ListeningEnglish from "@/components/training/ListeningEnglish";
import DataLoader from "@/components/common/DataLoader";
import LoadingScreen from "@/components/common/LoadingScreen";

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
      <DataLoader category="phrases120" dataState={phrases120State}>
        {(phrase120Data, isLoading) => {
          if (isLoading) {
            return (
              <LoadingScreen title="定型表現" message="データを読み込み中..." />
            );
          }

          return (
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
                <ProgressTraining
                  setOriginalTestData={(data) => {
                    // DataLoaderを使用しているため、直接状態を更新する必要がある場合は
                    // ここで適切な処理を行う
                  }}
                />
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
          );
        }}
      </DataLoader>
    </Background>
  );
};

export default Phrases;
