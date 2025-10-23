"use client";
import { Background } from "@/components/aceternity/Background";
import NotStarted from "@/components/training/NotStarted";
import { statusState } from "@/states/trainingState";
import { Status } from "@/types/types";
import React, { useCallback } from "react";
import { useRecoilState } from "recoil";
import DisplayList from "@/components/training/DisplayList";
import { part1EssentialWords100State } from "@/states/testDataState";
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

const Part1EssentialWord100 = () => {
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
        category="part1_essentialWord100"
        dataState={part1EssentialWords100State}
      >
        {(part1EssentialWords100Data, isLoading) => {
          if (isLoading) {
            return (
              <LoadingScreen
                title="パート1重要語100"
                message="データを読み込み中..."
              />
            );
          }

          return (
            <div className="flex w-full h-full relative">
              {status === "not_started" && (
                <NotStarted
                  handleChangeStatus={handleChangeStatus}
                  title="パート1重要語100"
                  description="100 Essential Words for Part 1"
                />
              )}
              {status === "setting_training" && (
                <SettingTraining
                  handleChangeStatus={handleChangeStatus}
                  targetData={part1EssentialWords100Data}
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
                  totalQuestions={part1EssentialWords100Data.length}
                  displayData={part1EssentialWords100Data}
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

export default Part1EssentialWord100;
