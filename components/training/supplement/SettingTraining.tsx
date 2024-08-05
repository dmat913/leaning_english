import React, { useEffect, useState } from "react";
import { Status, SupplementCheckbox, WordData } from "@/types/types";
import { useRecoilState, useSetRecoilState } from "recoil";
import DMATButton from "@/components/elements/DMATButton";
import { FcStart } from "react-icons/fc";
import { statusState, trainingDisplayTypeState } from "@/states/trainingState";
import CloseButton from "@/components/elements/CloseButton";
import { supplementTestDataState } from "@/states/supplementTrainingState";
import { getRandomItems } from "@/common/utils";

const SettingTraining = ({
  handleChangeStatus,
  defaultCheckboxData,
}: {
  handleChangeStatus: (status: Status) => void;
  defaultCheckboxData: SupplementCheckbox[];
}) => {
  // testData
  const [supplementTestData, setSupplementTestData] = useRecoilState(
    supplementTestDataState
  );
  // テスト状態
  const setStatus = useSetRecoilState(statusState);

  const [checkBoxData, setCheckBoxData] =
    useState<SupplementCheckbox[]>(defaultCheckboxData);

  // checkbox event
  const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updateList: SupplementCheckbox[] = checkBoxData.map((data) => {
      if (data.label === event.target.value) {
        return { ...data, checked: !data.checked };
      }
      return data;
    });
    setCheckBoxData(updateList);
  };

  // checkbox更新時,テストデータも更新
  useEffect(() => {
    let updateList: WordData[] = [];
    checkBoxData.forEach((data) => {
      if (data.checked) {
        updateList.push(...data.data);
      }
    });
    setSupplementTestData(updateList);
    // eslint-disable-next-line
  }, [checkBoxData]);

  // テスト表示種類
  const [displayType, setDisplayType] = useRecoilState(
    trainingDisplayTypeState
  );
  //トレーニング種類
  const [orderType, setOrderType] = useState<string>("order");

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
      setSupplementTestData(
        getRandomItems(supplementTestData, supplementTestData.length)
      );
    }
    setStatus("in_progress");
  };

  return (
    <div
      className="flex flex-col items-center justify-center w-full h-full relative"
      style={{ gap: "40px" }}
    >
      <CloseButton
        handleClick={() => {
          handleChangeStatus("not_started");
          setDisplayType("englishToJapanese");
        }}
      />
      <div className="flex flex-col gap-3">
        <div className="flex gap-1 w-full" style={{ flexWrap: "wrap" }}>
          {checkBoxData.map((data, index) => (
            <label className="flex items-center gap-2" key={index}>
              <input
                type="checkbox"
                checked={data.checked}
                value={data.label}
                onChange={handleChangeCheckbox}
              />
              <span className="text-white-1">{data.label}</span>
            </label>
          ))}
        </div>
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
        disabled={supplementTestData.length === 0}
      />
    </div>
  );
};

export default SettingTraining;
