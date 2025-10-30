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
import { level600State, phrases120State } from "@/states/testDataState";
import ListeningEnglish from "@/components/training/ListeningEnglish";
import DataLoader from "@/components/common/DataLoader";
import LoadingScreen from "@/components/common/LoadingScreen";
import { phrases120FromOptions, phrases120Options } from "@/data/120SetPhrases";
// import ContinuousEnglish from "@/components/training/ContinuousEnglish";

const Phrases120 = () => {
  // テスト状態
  const [status, setStatus] = useRecoilState(statusState);

  // テストstatus変更
  const handleChangeStatus = useCallback((status: Status) => {
    setStatus(status);
    // eslint-disable-next-line
  }, []);

  return (
    <DataLoader category="phrases120" dataState={phrases120State}>
      {(phrases120Data, isLoading) => {
        if (isLoading) {
          return (
            <LoadingScreen
              title="定型表現 120 set phrases"
              message="データを読み込み中..."
            />
          );
        }

        return (
          <Background>
            <div className="flex w-full h-full relative">
              {status === "not_started" && (
                <NotStarted
                  handleChangeStatus={handleChangeStatus}
                  title="定型表現"
                  description="120 Set Phrases"
                />
              )}
              {status === "display_list" && (
                <DisplayList
                  handleChangeStatus={handleChangeStatus}
                  displayData={phrases120Data}
                  totalQuestions={phrases120Data.length}
                />
              )}
              {status === "setting_training" && (
                <SettingTraining
                  handleChangeStatus={handleChangeStatus}
                  targetData={phrases120Data}
                  options={phrases120Options}
                  fromOptions={phrases120FromOptions}
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

export default Phrases120;
