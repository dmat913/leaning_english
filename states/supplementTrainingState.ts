import { WordData } from "@/types/types";
import { atom } from "recoil";

// テストデータstate
export const supplementTestDataState = atom<WordData[]>({
  key: "supplementTestDataState",
  default: [],
});

// 正解数
export const supplementTrainingResultState = atom<
  {
    data: WordData;
    result: boolean;
  }[]
>({
  key: "supplementTrainingResultState",
  default: [],
});
