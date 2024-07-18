import { EnglishData } from "@/types/types";

// ランダムな数の値を抽出
export const getRandomItems = (array: EnglishData[], count: number) => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
