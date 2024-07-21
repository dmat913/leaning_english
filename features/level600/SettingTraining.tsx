import { getRandomItems } from "@/common/utils";
import DMATButton from "@/components/elements/DMATButton";
import { level600Data, level600Options } from "@/data/level600";
import { level600ItemsState } from "@/states/trainingState";
import { EnglishData, Option, Status } from "@/types/types";
import React, { ChangeEvent, useEffect, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { useSetRecoilState } from "recoil";

const options: Option[] = [
  ...level600Options,
  { value: level600Data.length, label: `Max(${level600Data.length})` },
];

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

  // 問題リスト更新
  useEffect(() => {
    setLevel600Items(getRandomItems(level600Data, Number(selectedValue)));
  }, [selectedValue]);

  // 問題数select変更時
  const handleChangeNumber = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
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
        <span className="text-white-1">問題数: </span>
        <select value={selectedValue} onChange={handleChangeNumber}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <DMATButton
        title="開始"
        handleClick={() => handleChangeStatus("in_progress")}
        otherClassesButton={{ width: "200px" }}
      />
    </div>
  );
};

export default SettingTraining;
