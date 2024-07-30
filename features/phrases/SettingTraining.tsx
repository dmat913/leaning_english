import { getRandomItems } from "@/common/utils";
import CloseButton from "@/components/elements/CloseButton";
import DMATButton from "@/components/elements/DMATButton";
import {
  phrases120FromOptions,
  phrases120Options,
  phrasesData,
} from "@/data/120SetPhrases";
import { supplementTestDataState } from "@/states/supplementTrainingState";
import { trainingDisplayTypeState } from "@/states/trainingState";
import { Status, WordData } from "@/types/types";
import React, { ChangeEvent, memo, useEffect, useState } from "react";
import { FcStart } from "react-icons/fc";
import { useRecoilState, useSetRecoilState } from "recoil";

const SettingTraining = ({
  handleChangeStatus,
}: {
  handleChangeStatus: (status: Status) => void;
}) => {
  // testデータ
  const setTestData: (testData: WordData[]) => void = useSetRecoilState(
    supplementTestDataState
  );

  //問題数
  const [selectedValue, setSelectedValue] = useState<string>("10");
  const [selectedFromValue, setSelectedFromValue] = useState<string>("1");
  const [selectedToValue, setSelectedToValue] = useState<string>("10");

  // 画面切り替え時,先頭10個表示
  useEffect(() => {
    setTestData(phrasesData.slice(0, 10));
  }, []);

  // 問題数select変更時
  const handleChangeNumber = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
    setTestData(getRandomItems(phrasesData, Number(event.target.value)));
  };

  // from select変更時
  const handleChangeFromOption = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedFromValue(event.target.value);
    if (Number(event.target.value) >= Number(selectedToValue)) {
      setSelectedToValue(String(Number(event.target.value) + 10));
      setTestData(
        phrasesData.slice(
          Number(event.target.value),
          Number(event.target.value) + 10
        )
      );
    } else {
      setTestData(
        phrasesData.slice(Number(event.target.value), Number(selectedToValue))
      );
    }
  };

  // from select変更時
  const handleChangeToOption = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedToValue(event.target.value);
    setTestData(
      phrasesData.slice(
        selectedFromValue === "1" ? 0 : Number(selectedFromValue),
        Number(event.target.value)
      )
    );
  };

  //トレーニング種類
  const [orderType, setOrderType] = useState<string>("order");

  // 開始ボタン押下時
  const handleClickStartButton = () => {
    handleChangeStatus("in_progress");
    setSelectedFromValue("1");
    setSelectedValue("10");
    setSelectedToValue("10");
    setOrderType("");
  };

  //閉じるボタン押下時
  const handleClickCloseButton = () => {
    handleChangeStatus("not_started");
  };

  // ランダムor順番radioボタンchangeイベント
  const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOrderType(event.target.value);
    if (event.target.value === "random") {
      setTestData(getRandomItems(phrasesData, Number(selectedValue)));
    } else {
      setTestData(
        phrasesData.slice(
          selectedFromValue === "1" ? 0 : Number(selectedFromValue),
          Number(selectedToValue)
        )
      );
    }
  };

  // テスト表示種類
  const [displayType, setDisplayType] = useRecoilState(
    trainingDisplayTypeState
  );

  // テスト表示種類radioボタン変更
  const handleChangeDisplayRadio = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDisplayType(event.target.value);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      <CloseButton handleClick={handleClickCloseButton} />
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
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
          {orderType === "order" && (
            <div className="flex gap-2">
              <p className="text-white-1">from</p>
              <select
                value={selectedFromValue}
                onChange={handleChangeFromOption}
              >
                {phrases120FromOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <p className="text-white-1">to</p>
              <select value={selectedToValue} onChange={handleChangeToOption}>
                {phrases120Options.map((option) => (
                  <option
                    disabled={Number(selectedFromValue) >= option.value}
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}
          {orderType === "random" && (
            <div className="flex items-center gap-2">
              <span className="text-white-1">問題数: </span>
              <select value={selectedValue} onChange={handleChangeNumber}>
                {phrases120Options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}
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
      </div>
      <DMATButton
        title="開始"
        handleClick={handleClickStartButton}
        otherClassesButton={{ width: "200px" }}
        disabled={orderType === ""}
        icon={<FcStart size={24} />}
      />
    </div>
  );
};

export default memo(SettingTraining);
