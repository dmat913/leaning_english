"use client";
import { statusState } from "@/states/trainingState";
import { Status } from "@/types/types";
import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { Background } from "@/components/aceternity/Background";
import DisplayList from "@/components/training/DisplayList";
import CompletedTraining from "@/components/training/CompletedTraining";
import { level600FromOptions, level600Options } from "@/data/level600";
import NotStarted from "@/components/training/NotStarted";
import SettingTraining from "@/components/training/SettingTraining";
import ProgressTraining from "@/components/training/ProgressTraining";
import { level600State } from "@/states/testDataState";
import ListeningEnglish from "@/components/training/ListeningEnglish";
import DataLoader from "@/components/common/DataLoader";
import LoadingScreen from "@/components/common/LoadingScreen";
// import ContinuousEnglish from "@/components/training/ContinuousEnglish";

const Level600 = () => {
  // テスト状態
  const [status, setStatus] = useRecoilState(statusState);

  // テストstatus変更
  const handleChangeStatus = useCallback((status: Status) => {
    setStatus(status);
    // eslint-disable-next-line
  }, []);

  return (
    <DataLoader category="level600" dataState={level600State}>
      {(level600Data, isLoading) => {
        if (isLoading) {
          return (
            <LoadingScreen
              title="600点レベルデータを読み込み中"
              message="助走の400語を準備しています..."
            />
          );
        }

        return (
          <Background>
            <div className="flex w-full h-full relative">
              {status === "not_started" && (
                <NotStarted
                  handleChangeStatus={handleChangeStatus}
                  title="600点レベル"
                  description="助走の400語"
                />
              )}
              {status === "display_list" && (
                <DisplayList
                  handleChangeStatus={handleChangeStatus}
                  displayData={level600Data}
                  totalQuestions={400}
                />
              )}
              {status === "setting_training" && (
                <SettingTraining
                  handleChangeStatus={handleChangeStatus}
                  targetData={level600Data}
                  options={level600Options}
                  fromOptions={level600FromOptions}
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

export default Level600;
