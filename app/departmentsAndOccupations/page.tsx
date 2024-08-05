"use client";
import { Background } from "@/components/aceternity/Background";
import NotStarted from "@/components/training/NotStarted";
import { statusState } from "@/states/trainingState";
import { Status } from "@/types/types";
import React, { useCallback } from "react";
import { useRecoilState } from "recoil";
import ProgressTraining from "@/components/training/supplement/ProgressTraining";
import CompletedTraining from "@/components/training/supplement/CompletedTraining";
import DisplayList from "@/components/training/supplement/DisplayList";
import SettingTraining from "@/components/training/supplement/SettingTraining";
import {
  DepartmentsAndOccupationsCheckBoxData,
  DepartmentsAndOccupationsDisplayListData,
} from "@/data/occupations";

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
      <div className="flex w-full h-full relative">
        {status === "not_started" && (
          <NotStarted
            handleChangeStatus={handleChangeStatus}
            title="部署・職業名"
            description="departments & occupations"
          />
        )}
        {status === "setting_training" && (
          <SettingTraining
            handleChangeStatus={handleChangeStatus}
            defaultCheckboxData={DepartmentsAndOccupationsCheckBoxData}
          />
        )}
        {status === "in_progress" && <ProgressTraining />}
        {status === "completed" && (
          <CompletedTraining handleChangeStatus={handleChangeStatus} />
        )}
        {status === "display_list" && (
          <DisplayList
            handleChangeStatus={handleChangeStatus}
            displayData={DepartmentsAndOccupationsDisplayListData}
          />
        )}
      </div>
    </Background>
  );
};

export default DepartmentsAndOccupations;
