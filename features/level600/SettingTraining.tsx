import { getRandomItems } from "@/common/utils";
import DMATButton from "@/components/elements/DMATButton";
import {
  level600Data,
  level600FromOptions,
  level600Options,
} from "@/data/level600";
import { level600ItemsState } from "@/states/trainingState";
import { EnglishData, Status } from "@/types/types";
import React, { ChangeEvent, useState } from "react";
import { FcStart } from "react-icons/fc";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { ImSortNumericAsc } from "react-icons/im";
import { IoMdCloseCircle } from "react-icons/io";
import { useSetRecoilState } from "recoil";

const SettingTraining = ({
  handleChangeStatus,
}: {
  handleChangeStatus: (status: Status) => void;
}) => {
  // 600点レベルstate
  const setLevel600Items: (level600Items: EnglishData[]) => void =
    useSetRecoilState(level600ItemsState);

  //問題数
  const [selectedValue, setSelectedValue] = useState<string>("10");
  const [selectedFromValue, setSelectedFromValue] = useState<string>("1");
  const [selectedToValue, setSelectedToValue] = useState<string>("10");

  // 問題数select変更時
  const handleChangeNumber = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
    setLevel600Items(getRandomItems(level600Data, Number(event.target.value)));
  };

  // from select変更時
  const handleChangeFromOption = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedFromValue(event.target.value);
    if (Number(event.target.value) >= Number(selectedToValue)) {
      setSelectedToValue(String(Number(event.target.value) + 10));
      setLevel600Items(
        level600Data.slice(
          Number(event.target.value),
          Number(event.target.value) + 10
        )
      );
    } else {
      setLevel600Items(
        level600Data.slice(Number(event.target.value), Number(selectedToValue))
      );
    }
  };

  // from select変更時
  const handleChangeToOption = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedToValue(event.target.value);
    setLevel600Items(
      level600Data.slice(
        selectedFromValue === "1" ? 0 : Number(selectedFromValue),
        Number(event.target.value)
      )
    );
  };

  //トレーニング種類
  const [trainingType, setTrainingType] = useState<string>("");

  //順番orランダム押下時
  const handleClickTrainingType = (type: string) => {
    setTrainingType(type);
    if (type === "random") {
      setLevel600Items(getRandomItems(level600Data, Number(selectedValue)));
    } else {
      setLevel600Items(
        level600Data.slice(
          selectedFromValue === "1" ? 0 : Number(selectedFromValue),
          Number(selectedToValue)
        )
      );
    }
  };

  // 開始ボタン押下時
  const handleClickStartButton = () => {
    handleChangeStatus("in_progress");
    setSelectedFromValue("1");
    setSelectedValue("10");
    setSelectedToValue("10");
    setTrainingType("");
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
      <IoMdCloseCircle
        onClick={() => handleChangeStatus("not_started")}
        color="#FAF0E6"
        className="absolute top-4 right-4"
        size={32}
      />
      <div className="flex items-center gap-2">
        <DMATButton
          title="順番"
          handleClick={() => handleClickTrainingType("order")}
          icon={<ImSortNumericAsc size={20} />}
        />
        <DMATButton
          title="ランダム"
          handleClick={() => handleClickTrainingType("random")}
          icon={<GiPerspectiveDiceSixFacesRandom size={24} />}
        />
      </div>
      {trainingType === "order" && (
        <div className="flex gap-2">
          <p className="text-white-1">from</p>
          <select value={selectedFromValue} onChange={handleChangeFromOption}>
            {level600FromOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <p className="text-white-1">to</p>
          <select value={selectedToValue} onChange={handleChangeToOption}>
            {level600Options.map((option) => (
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
      {trainingType === "random" && (
        <div className="flex items-center gap-2">
          <span className="text-white-1">問題数: </span>
          <select value={selectedValue} onChange={handleChangeNumber}>
            {level600Options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}
      <DMATButton
        title="開始"
        handleClick={handleClickStartButton}
        otherClassesButton={{ width: "200px" }}
        disabled={trainingType === ""}
        icon={<FcStart size={24} />}
      />
    </div>
  );
};

export default SettingTraining;
