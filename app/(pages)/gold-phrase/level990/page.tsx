"use client";
import { statusState } from "@/states/trainingState";
import { Status } from "@/types/types";
import React, { useCallback } from "react";
import { useRecoilState } from "recoil";
import { Background } from "@/components/aceternity/Background";
import CompletedTraining from "@/components/training/CompletedTraining";
import DisplayList from "@/components/training/DisplayList";
import NotStarted from "@/components/training/NotStarted";
import SettingTraining from "@/components/training/SettingTraining";
import ProgressTraining from "@/components/training/ProgressTraining";
import { level990FromOptions, level990Options } from "@/data/level990";
import { level990State } from "@/states/testDataState";
import ListeningEnglish from "@/components/training/ListeningEnglish";
import DataLoader from "@/components/common/DataLoader";
import LoadingScreen from "@/components/common/LoadingScreen";

const Level990 = () => {
  // テスト状態
  const [status, setStatus] = useRecoilState(statusState);

  // テストstatus変更
  const handleChangeStatus = useCallback((status: Status) => {
    setStatus(status);
    // eslint-disable-next-line
  }, []);

  return (
    <DataLoader category="level990" dataState={level990State}>
      {(level990Data, isLoading) => {
        if (isLoading) {
          return (
            <LoadingScreen
              title="990点レベルデータを読み込み中"
              message="頂点の100語を準備しています..."
            />
          );
        }

        return (
          <Background>
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
                  totalQuestions={100}
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
              {status === "in_progress" && (
                <ProgressTraining setOriginalTestData={(data) => {}} />
              )}
              {status === "listening" && (
                <ListeningEnglish handleChangeStatus={handleChangeStatus} />
              )}
              {status === "completed" && (
                <CompletedTraining handleChangeStatus={handleChangeStatus} />
              )}
            </div>
          </Background>
        );
      }}
    </DataLoader>
  );
};

export default Level990;
