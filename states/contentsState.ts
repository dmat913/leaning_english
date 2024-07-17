import { level600Data } from "@/data/level600";
import { EnglishData } from "@/types/data";
import { atom } from "recoil";

// 600点レベルの項目
export const level600ItemsState = atom<EnglishData[]>({
  key: "level600ItemsState",
  default: level600Data,
});
