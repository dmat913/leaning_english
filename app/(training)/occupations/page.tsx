"use client";
import { Background } from "@/components/aceternity/Background";
import NotStarted from "@/components/training/NotStarted";
import { statusState } from "@/states/trainingState";
import { Status } from "@/types/types";
import React, { useCallback } from "react";
import { useRecoilState } from "recoil";
import DisplayList from "@/components/training/DisplayList";
import { occupationsState } from "@/states/testDataState";
import ProgressTraining from "@/components/training/ProgressTraining";
import SettingTraining from "@/components/training/SettingTraining";
import {
  occupationsFromOptions,
  occupationsOptions,
} from "@/data/120SetPhrases";
import CompletedTraining from "@/components/training/CompletedTraining";
import ListeningEnglish from "@/components/training/ListeningEnglish";
import DataLoader from "@/components/common/DataLoader";
import LoadingScreen from "@/components/common/LoadingScreen";

const Occupations = () => {
  // テスト状態
  const [status, setStatus] = useRecoilState(statusState);

  // テストstatus変更
  const handleChangeStatus = useCallback((status: Status) => {
    setStatus(status);
    // eslint-disable-next-line
  }, []);

  return (
    <Background>
      <DataLoader category="occupations" dataState={occupationsState}>
        {(occupationsData, isLoading) => {
          if (isLoading) {
            return (
              <LoadingScreen title="職業" message="データを読み込み中..." />
            );
          }

          return (
            <div className="flex w-full h-full relative">
              {status === "not_started" && (
                <NotStarted
                  handleChangeStatus={handleChangeStatus}
                  title="職業"
                  description="Occupations"
                />
              )}
              {status === "setting_training" && (
                <SettingTraining
                  handleChangeStatus={handleChangeStatus}
                  targetData={occupationsData}
                  options={occupationsOptions}
                  fromOptions={occupationsFromOptions}
                />
              )}
              {status === "in_progress" && (
                <ProgressTraining setOriginalTestData={(data) => {}} />
              )}
              {status === "completed" && (
                <CompletedTraining handleChangeStatus={handleChangeStatus} />
              )}
              {status === "listening" && (
                <ListeningEnglish handleChangeStatus={handleChangeStatus} />
              )}
              {status === "display_list" && (
                <DisplayList
                  totalQuestions={occupationsData.length}
                  displayData={occupationsData}
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

export default Occupations;
