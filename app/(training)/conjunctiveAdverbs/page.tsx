"use client";

import NotStarted from "@/components/training/NotStarted";
import { statusState } from "@/states/trainingState";
import { Status } from "@/types/types";
import React, { useCallback } from "react";
import { useRecoilState } from "recoil";
import SettingTraining from "@/features/supplement/SettingTraining";
import CompletedTraining from "@/components/training/CompletedTraining";
import DisplayList from "@/components/training/DisplayList";
import { conjunctiveAdverbsState } from "@/states/testDataState";
import ProgressTraining from "@/components/training/ProgressTraining";
import { Background } from "@/components/aceternity/Background";
import DataLoader from "@/components/common/DataLoader";
import LoadingScreen from "@/components/common/LoadingScreen";

const FunctionWords = () => {
  // テスト状態
  const [status, setStatus] = useRecoilState(statusState);

  // テストstatus変更
  const handleChangeStatus = useCallback((status: Status) => {
    setStatus(status);
    // eslint-disable-next-line
  }, []);

  return (
    <Background>
      <DataLoader
        category="conjunctiveAdverbs"
        dataState={conjunctiveAdverbsState}
      >
        {(conjunctiveAdverbsData, isLoading) => {
          if (isLoading) {
            return (
              <LoadingScreen title="接続副詞" message="データを読み込み中..." />
            );
          }

          return (
            <div className="flex w-full h-full relative">
              {status === "not_started" && (
                <NotStarted
                  handleChangeStatus={handleChangeStatus}
                  title="接続副詞"
                  description="Conjunctive Adverbs"
                />
              )}
              {status === "setting_training" && (
                <SettingTraining
                  handleChangeStatus={handleChangeStatus}
                  targetTestData={conjunctiveAdverbsData}
                />
              )}
              {status === "in_progress" && (
                <ProgressTraining setOriginalTestData={(data) => {}} />
              )}
              {status === "completed" && (
                <CompletedTraining handleChangeStatus={handleChangeStatus} />
              )}
              {status === "display_list" && (
                <DisplayList
                  handleChangeStatus={handleChangeStatus}
                  displayData={conjunctiveAdverbsData}
                  totalQuestions={conjunctiveAdverbsData.length}
                />
              )}
            </div>
          );
        }}
      </DataLoader>
    </Background>
  );
};

export default FunctionWords;
