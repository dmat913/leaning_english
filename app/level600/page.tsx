"use client";
import DMATButton from "@/components/elements/DMATButton";
import { ProgressTraining } from "@/features/level600/ProgressTraining";
import { statusState } from "@/states/trainingState";
import { Status } from "@/types/types";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { useRecoilState } from "recoil";
import { Background } from "@/components/aceternity/Background";
import NotStarted from "@/features/level600/NotStarted";
import DisplayList from "@/features/level600/DisplayList";
import SettingTraining from "@/features/level600/SettingTraining";

const Level600 = () => {
  const router = useRouter();

  // テスト状態
  const [status, setStatus] = useRecoilState(statusState);

  // ホームへ戻るボタン押下
  const handleClickBackToTop = () => {
    router.push("/");
    setTimeout(() => {
      handleChangeStatus("not_started");
    }, 1000);
  };

  // テストstatus変更
  const handleChangeStatus = useCallback((status: Status) => {
    setStatus(status);
  }, []);

  return (
    <Background>
      <div className="flex w-full h-full relative p-10">
        {status === "not_started" && (
          <NotStarted handleChangeStatus={handleChangeStatus} />
        )}
        {status === "display_list" && (
          <DisplayList handleChangeStatus={handleChangeStatus} />
        )}
        {status === "setting_training" && (
          <SettingTraining handleChangeStatus={handleChangeStatus} />
        )}
        {status === "in_progress" && <ProgressTraining />}
        {status === "completed" && (
          <div className="flex flex-col gap-3 items-center justify-center w-full h-full ">
            <p className="text-white-1">終了~</p>
            <DMATButton
              title="ホームに戻る"
              handleClick={handleClickBackToTop}
            />
          </div>
        )}
      </div>
    </Background>
  );
};

export default Level600;
