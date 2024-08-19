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
import {
  essentialWords100ForPart1FromOptions,
  essentialWords100ForPart1Options,
} from "@/data/EssentialWords100_forPart1";
import { part1EssentialWords100State } from "@/states/testDataState";
// import ContinuousEnglish from "@/components/training/ContinuousEnglish";

const EssentialWords100ForPart1 = () => {
  // テスト状態
  const [status, setStatus] = useRecoilState(statusState);

  // パート1重要語100 test data
  const [part1EssentialWords100, setPartEssentialWord100] = useRecoilState(
    part1EssentialWords100State
  );

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
          title="パート1重要語100"
          description="100 Essential Words for Part 1"
        />
      )}
      {status === "display_list" && (
        <DisplayList
          handleChangeStatus={handleChangeStatus}
          displayData={part1EssentialWords100}
          totalQuestions={100}
        />
      )}
      {status === "setting_training" && (
        <SettingTraining
          handleChangeStatus={handleChangeStatus}
          targetData={part1EssentialWords100}
          options={essentialWords100ForPart1Options}
          fromOptions={essentialWords100ForPart1FromOptions}
        />
      )}
      {status === "in_progress" && (
        <ProgressTraining setOriginalTestData={setPartEssentialWord100} />
      )}
      {/* {status === "continuous_english" && <ContinuousEnglish />} */}
      {status === "completed" && (
        <CompletedTraining handleChangeStatus={handleChangeStatus} />
      )}
    </div>
  );
};

export default EssentialWords100ForPart1;
