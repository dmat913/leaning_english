"use client";
import { Background } from "@/components/aceternity/Background";
import NotStarted from "@/components/training/NotStarted";
import { departmentData } from "@/data/departments";
import {
  academicNameOccupationsData,
  artOccupationsData,
  massMediaOccupationsData,
  medicalRelatedOccupationsData,
  othersOccupationsData,
  scholarsAndOthersOccupationsData,
  storesEtcOccupationsData,
  technicalOccupationsData,
  travelEtcOccupationsData,
} from "@/data/occupations";
import { departmentsAndOccupationsTestDataState } from "@/states/departmentsAndOccupationsState";
import { statusState, trainingDisplayTypeState } from "@/states/trainingState";
import { Status, WordData } from "@/types/types";
import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import ProgressTraining from "@/features/departmentsAndOccupations/ProgressTraining";
import CompletedTraining from "@/features/departmentsAndOccupations/CompletedTraining";
import DisplayList from "@/features/departmentsAndOccupations/DisplayList";
import SettingTraining from "@/features/departmentsAndOccupations/SettingTraining";

interface CheckBox {
  label: string;
  data: WordData[];
  checked: boolean;
}

const DepartmentsAndOccupations = () => {
  // テスト状態
  const [status, setStatus] = useRecoilState(statusState);

  // テストstatus変更
  const handleChangeStatus = useCallback((status: Status) => {
    setStatus(status);
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

export default DepartmentsAndOccupations;
