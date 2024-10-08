import { TestData } from "@/models/userModel";
import { EnglishData, Status } from "@/types/types";
import { atom } from "recoil";

// trainingの項目
export const testDataState = atom<TestData[]>({
  key: "testDataState",
  default: [],
});

// テスト状態
export const statusState = atom<Status>({
  key: "statusState",
  default: "not_started",
});

// 正解数
export const TrainingResultState = atom<
  {
    data: TestData;
    result: boolean;
  }[]
>({
  key: "TrainingResultState",
  default: [],
});

// test種類 日本語→英語or英語→日本語
export const trainingDisplayTypeState = atom<string>({
  key: "trainingDisplayTypeState",
  default: "englishToJapanese",
});
