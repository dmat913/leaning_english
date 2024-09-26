import React, { useEffect, useState } from "react";
import { Status } from "@/types/types";
import { useRecoilState, useSetRecoilState } from "recoil";
import DMATButton from "@/components/elements/DMATButton";
import { FcStart } from "react-icons/fc";
import {
  statusState,
  testDataState,
  trainingDisplayTypeState,
} from "@/states/trainingState";
import { getRandomItems } from "@/common/utils";
import DMATCloseButton from "@/components/elements/DMATCloseButton";
import { TestData } from "@/models/userModel";

const SettingTraining = ({
  handleChangeStatus,
  targetTestData,
}: {
  handleChangeStatus: (status: Status) => void;
  targetTestData: TestData[];
}) => {
  // testData
  const [testData, setTestData] = useRecoilState(testDataState);
  // テスト状態
  const setStatus = useSetRecoilState(statusState);

  // テスト表示種類
  const [displayType, setDisplayType] = useRecoilState(
    trainingDisplayTypeState
  );
  //トレーニング種類
  const [orderType, setOrderType] = useState<string>("order");

  // テストデータ設定
  useEffect(() => {
    setTestData(targetTestData);
  }, [targetTestData]);

  // テスト表示種類radioボタン変更
  const handleChangeDisplayRadio = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDisplayType(event.target.value);
  };

  // ランダムor順番radioボタンchangeイベント
  const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOrderType(event.target.value);
  };

  // 開始ボタン押下時
  const handleStartTest = () => {
    if (orderType === "random") {
      setTestData(getRandomItems(testData, testData.length));
    }
    setStatus("in_progress");
  };

  return (
    <div
      className="flex flex-col items-center justify-center w-full h-full relative"
      style={{ gap: "40px" }}
    >
      <DMATCloseButton
        handleClick={() => {
          handleChangeStatus("not_started");
          setDisplayType("englishToJapanese");
        }}
      />
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-1 text-white-1">
            <input
              type="radio"
              value="englishToJapanese"
              name="display"
              onChange={handleChangeDisplayRadio}
              checked={displayType === "englishToJapanese"}
            />
            英語→日本語
          </label>
          <label className="flex items-center gap-1 text-white-1">
            <input
              type="radio"
              value="japaneseToEnglish"
              name="display"
              onChange={handleChangeDisplayRadio}
              checked={displayType === "japaneseToEnglish"}
            />
            日本語→英語
          </label>
        </div>
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-1 text-white-1">
            <input
              type="radio"
              value="order"
              name="order"
              onChange={handleChangeRadio}
              checked={orderType === "order"}
            />
            順番
          </label>
          <label className="flex items-center gap-1 text-white-1">
            <input
              type="radio"
              value="random"
              name="order"
              onChange={handleChangeRadio}
              checked={orderType === "random"}
            />
            ランダム
          </label>
        </div>
      </div>
      <DMATButton
        title="開始"
        handleClick={handleStartTest}
        icon={<FcStart size={24} />}
      />
    </div>
  );
};

export default SettingTraining;
