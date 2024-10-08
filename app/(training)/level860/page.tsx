"use client";
import { statusState } from "@/states/trainingState";
import { Status } from "@/types/types";
import React, { useCallback } from "react";
import { useRecoilState } from "recoil";
import CompletedTraining from "@/components/training/CompletedTraining";
import DisplayList from "@/components/training/DisplayList";
import NotStarted from "@/components/training/NotStarted";
import SettingTraining from "@/components/training/SettingTraining";
import ProgressTraining from "@/components/training/ProgressTraining";
import { level860FromOptions, level860Options } from "@/data/level860";
import { level860State } from "@/states/testDataState";
import ListeningEnglish from "@/components/training/ListeningEnglish";

const Level860 = () => {
  // テスト状態
  const [status, setStatus] = useRecoilState(statusState);
  // level860 test data
  const [level860Data, setLevel860Data] = useRecoilState(level860State);

  // テストstatus変更
  const handleChangeStatus = useCallback((status: Status) => {
    setStatus(status);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="flex w-full h-full relative">
      {status === "not_started" && (
        <NotStarted
          handleChangeStatus={handleChangeStatus}
          title="860点レベル"
          description="飛躍の200語"
        />
      )}
      {status === "display_list" && (
        <DisplayList
          handleChangeStatus={handleChangeStatus}
          displayData={level860Data}
          totalQuestions={200}
        />
      )}
      {status === "setting_training" && (
        <SettingTraining
          handleChangeStatus={handleChangeStatus}
          targetData={level860Data}
          options={level860Options}
          fromOptions={level860FromOptions}
        />
      )}
      {status === "in_progress" && (
        <ProgressTraining setOriginalTestData={setLevel860Data} />
      )}
      {status === "listening" && (
        <ListeningEnglish handleChangeStatus={handleChangeStatus} />
      )}
      {status === "completed" && (
        <CompletedTraining handleChangeStatus={handleChangeStatus} />
      )}
    </div>
  );
};

export default Level860;
