import { EnglishData, PortOfSpeech } from "@/types/types";

// ランダムな数の値を抽出
export const getRandomItems = (array: EnglishData[], count: number) => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

//品詞にあったカラーコード返却
export const getPortOfSpeechColor = (portOfSpeech: PortOfSpeech) => {
  switch (portOfSpeech) {
    case "動詞":
      return "#FF5733";
    case "形容詞":
      return "#33FF57";
    case "副詞":
      return "#33A1FF";
    case "名詞":
      return "#FFC300";
    case "前置詞":
      return "#FF33A1";
    case "接続詞":
      return "#8D33FF";
    default:
      return;
  }
};
