import { getRandomItems } from "@/common/utils";
import DMATButton from "@/components/elements/DMATButton";
import {
  trainingDisplayTypeState,
  testDataState,
} from "@/states/trainingState";
import { EnglishData, Option, Status } from "@/types/types";
import React, { ChangeEvent, memo, useEffect, useState } from "react";
import { FcStart } from "react-icons/fc";
import { useRecoilState, useSetRecoilState } from "recoil";
import CloseButton from "../elements/CloseButton";

const SettingTraining = ({
  handleChangeStatus,
  targetData,
  options,
  fromOptions,
}: {
  handleChangeStatus: (status: Status) => void;
  targetData: EnglishData[];
  options: Option[];
  fromOptions: Option[];
}) => {
  // testデータ
  const setTestData: (testData: EnglishData[]) => void =
    useSetRecoilState(testDataState);

  //問題数
  const [selectedValue, setSelectedValue] = useState<string>("10");
  const [selectedFromValue, setSelectedFromValue] = useState<string>("1");
  const [selectedToValue, setSelectedToValue] = useState<string>("10");

  // 画面切り替え時,先頭10個表示
  useEffect(() => {
    setTestData(targetData.slice(0, 10));
    // eslint-disable-next-line
  }, []);

  // 問題数select変更時
  const handleChangeNumber = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
    setTestData(getRandomItems(targetData, Number(event.target.value)));
  };

  // from select変更時
  const handleChangeFromOption = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedFromValue(event.target.value);
    if (Number(event.target.value) >= Number(selectedToValue)) {
      setSelectedToValue(String(Number(event.target.value) + 10));
      setTestData(
        targetData.slice(
          Number(event.target.value),
          Number(event.target.value) + 10
        )
      );
    } else {
      setTestData(
        targetData.slice(Number(event.target.value), Number(selectedToValue))
      );
    }
  };

  // from select変更時
  const handleChangeToOption = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedToValue(event.target.value);
    setTestData(
      targetData.slice(
        selectedFromValue === "1" ? 0 : Number(selectedFromValue),
        Number(event.target.value)
      )
    );
  };

  //トレーニング種類
  const [orderType, setOrderType] = useState<string>("order");

  // 開始ボタン押下時
  const handleClickStartButton = () => {
    if (orderType === "continuousEnglish") {
      handleChangeStatus("continuous_english");
    } else {
      handleChangeStatus("in_progress");
    }
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
      setTestData(getRandomItems(targetData, Number(selectedValue)));
    } else {
      setTestData(
        targetData.slice(
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
            <label className="flex items-center gap-1 text-white-1">
              <input
                type="radio"
                value="continuousEnglish"
                name="order"
                onChange={handleChangeRadio}
                checked={orderType === "continuousEnglish"}
              />
              垂れ流し
            </label>
          </div>
          {orderType !== "random" && (
            <div className="flex gap-2">
              <p className="text-white-1">from</p>
              <select
                value={selectedFromValue}
                onChange={handleChangeFromOption}
              >
                {fromOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <p className="text-white-1">to</p>
              <select value={selectedToValue} onChange={handleChangeToOption}>
                {options.map((option) => (
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
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        {orderType !== "continuousEnglish" && (
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
        )}
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
