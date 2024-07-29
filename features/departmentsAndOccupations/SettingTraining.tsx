import React, { useEffect, useState } from "react";
import {
  technicalOccupationsData,
  medicalRelatedOccupationsData,
  storesEtcOccupationsData,
  scholarsAndOthersOccupationsData,
  massMediaOccupationsData,
  travelEtcOccupationsData,
  artOccupationsData,
  othersOccupationsData,
  academicNameOccupationsData,
} from "@/data/occupations";
import { Status, WordData } from "@/types/types";
import { departmentData } from "@/data/departments";
import { useRecoilState, useSetRecoilState } from "recoil";
import { departmentsAndOccupationsTestDataState } from "@/states/departmentsAndOccupationsState";
import DMATButton from "@/components/elements/DMATButton";
import { FcStart } from "react-icons/fc";
import { statusState, trainingDisplayTypeState } from "@/states/trainingState";
import CloseButton from "@/components/elements/CloseButton";

interface CheckBox {
  label: string;
  data: WordData[];
  checked: boolean;
}

const SettingTraining = ({
  handleChangeStatus,
}: {
  handleChangeStatus: (status: Status) => void;
}) => {
  // testData
  const [
    departmentsAndOccupationsTestData,
    setDepartmentsAndOccupationsTestData,
  ] = useRecoilState(departmentsAndOccupationsTestDataState);
  // テスト状態
  const setStatus = useSetRecoilState(statusState);

  const [checkBoxData, setCheckBoxData] = useState<CheckBox[]>([
    { label: "部署名", data: departmentData, checked: false },
    { label: "技術系", data: technicalOccupationsData, checked: false },
    { label: "医療関連", data: medicalRelatedOccupationsData, checked: false },
    { label: "店等", data: storesEtcOccupationsData, checked: false },
    {
      label: "学者 他",
      data: scholarsAndOthersOccupationsData,
      checked: false,
    },
    { label: "マスコミ系", data: massMediaOccupationsData, checked: false },
    { label: "旅行 他", data: travelEtcOccupationsData, checked: false },
    { label: "芸術", data: artOccupationsData, checked: false },
    { label: "その他", data: othersOccupationsData, checked: false },
    { label: "学問名", data: academicNameOccupationsData, checked: false },
  ]);

  // checkbox event
  const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updateList: CheckBox[] = checkBoxData.map((data) => {
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
    // TODO: ランダムにする可能性あり
    setDepartmentsAndOccupationsTestData(updateList);
  }, [checkBoxData]);

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
    <div className="flex flex-col items-center justify-center gap-5 w-full h-full relative">
      <CloseButton handleClick={() => handleChangeStatus("not_started")} />
      <div className="flex flex-wrap gap-1">
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
      <DMATButton
        title="開始"
        handleClick={() => setStatus("in_progress")}
        icon={<FcStart size={24} />}
        disabled={departmentsAndOccupationsTestData.length === 0}
      />
    </div>
  );
};

export default SettingTraining;
