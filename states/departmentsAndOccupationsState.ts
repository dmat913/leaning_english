import { WordData } from "@/types/types";
import { atom } from "recoil";

//
export const departmentsAndOccupationsTestDataState = atom<WordData[]>({
  key: "departmentsAndOccupationsTestDataState",
  default: [],
});

// 正解数
export const trainingResultState = atom<
  {
    data: WordData;
    result: boolean;
  }[]
>({
  key: "trainingResultState",
  default: [],
});
