import { level600Data } from "@/data/level600";
import { EnglishData, Status } from "@/types/types";
import { atom } from "recoil";

// 600点レベルの項目
export const level600ItemsState = atom<EnglishData[]>({
  key: "level600ItemsState",
  default: level600Data,
});

// テスト状態
export const statusState = atom<Status>({
  key: "statusState",
  default: "not_started",
});

// 正解数
export const TrainingResultState = atom<
  {
    data: EnglishData;
    result: boolean;
  }[]
>({
  key: "TrainingResultState",
  default: [],
});
