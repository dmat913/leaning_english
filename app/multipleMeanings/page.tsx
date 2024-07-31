"use client";
import { Background } from "@/components/aceternity/Background";
// import NotStarted from "@/components/training/NotStarted";
import { statusState } from "@/states/trainingState";
import { Status } from "@/types/types";
import React, { useCallback } from "react";
import { useRecoilState } from "recoil";
// import ProgressTraining from "@/components/training/supplement/ProgressTraining";
// import CompletedTraining from "@/components/training/supplement/CompletedTraining";
// import SettingTraining from "@/components/training/supplement/SettingTraining";
// import {
//   FunctionWordsCheckBoxData,
//   FunctionWordsDisplayListData,
// } from "@/data/functionWords";
import DisplayList from "@/features/multipleMeanings/DisplayList";
import { IoMdCloseCircle } from "react-icons/io";
import { useRouter } from "next/navigation";
import DMATButton from "@/components/elements/DMATButton";
import { RiSortNumberAsc } from "react-icons/ri";
import useCloseAudio from "@/hooks/useCloseAudio";

const MultiplePhrases = () => {
  const router = useRouter();
  const { playInterrupt } = useCloseAudio();

  // テスト状態
  const [status, setStatus] = useRecoilState(statusState);

  // テストstatus変更
  const handleChangeStatus = useCallback((status: Status) => {
    setStatus(status);
  }, []);

  return (
    <Background>
      <div className="flex justify-center w-full h-full relative">
        {/* {status === "not_started" && (
          <>
            <IoMdCloseCircle
              size={32}
              onClick={() => {
                playInterrupt();
                router.push("/");
              }}
              color="#FAF0E6"
              className="absolute top-2 right-2 z-50"
            />
            <div className="relative w-full h-full flex items-center justify-center flex-col gap-3">
              <div className="flex flex-col items-center gap-1">
                <span className="text-white-1 text-3xl">多義語</span>
                <span className="text-white-1 text-sm">
                  88 Words with multiple Meanings
                </span>
              </div>
              <div className="flex items-center gap-3">
                <DMATButton
                  title="一覧"
                  handleClick={() => handleChangeStatus("display_list")}
                  icon={<RiSortNumberAsc color="#0B0B0B" />}
                  type="white"
                />
                <DMATButton
                  title="Training"
                  handleClick={() => handleChangeStatus("setting_training")}
                />
              </div>
            </div>
          </>
        )} */}
        {/* {status === "setting_training" && (
          <SettingTraining
            handleChangeStatus={handleChangeStatus}
            defaultCheckboxData={FunctionWordsCheckBoxData}
          />
        )} */}
        {/* {status === "in_progress" && <ProgressTraining />}
        {status === "completed" && (
          <CompletedTraining handleChangeStatus={handleChangeStatus} />
        )} */}
        {/* {status === "display_list" && ( */}
        <DisplayList />
        {/* )} */}
      </div>
    </Background>
  );
};

export default MultiplePhrases;
