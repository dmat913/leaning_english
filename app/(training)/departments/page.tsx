"use client";

import NotStarted from "@/components/training/NotStarted";
import { statusState } from "@/states/trainingState";
import { Status } from "@/types/types";
import React, { useCallback } from "react";
import { useRecoilState } from "recoil";
import SettingTraining from "@/features/supplement/SettingTraining";
import CompletedTraining from "@/components/training/CompletedTraining";
import { Background } from "@/components/aceternity/Background";
import DataLoader from "@/components/common/DataLoader";
import LoadingScreen from "@/components/common/LoadingScreen";
import { departmentAndOccupationsState } from "@/states/testDataState";
import DisplayList from "@/components/training/DisplayList";
import ProgressTraining from "@/components/training/ProgressTraining";

const DepartmentsAndOccupations = () => {
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
        category="departmentAndOccupations"
        dataState={departmentAndOccupationsState}
      >
        {(departmentAndOccupationsData, isLoading) => {
          if (isLoading) {
            return (
              <LoadingScreen title="部署" message="データを読み込み中..." />
            );
          }

          return (
            <div className="flex w-full h-full relative">
              {status === "not_started" && (
                <NotStarted
                  handleChangeStatus={handleChangeStatus}
                  title="部署"
                  description="Departments"
                />
              )}
              {status === "setting_training" && (
                <SettingTraining
                  handleChangeStatus={handleChangeStatus}
                  targetTestData={departmentAndOccupationsData}
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
                  displayData={departmentAndOccupationsData}
                  totalQuestions={departmentAndOccupationsData.length}
                />
              )}
            </div>
          );
        }}
      </DataLoader>
    </Background>
  );
};

export default DepartmentsAndOccupations;
