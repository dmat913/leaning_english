import { EnglishData, PortOfSpeech } from "@/types/types";

// ランダムな数の値を抽出
export const getRandomItems = (array: EnglishData[], count: number) => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// 音声再生
export const handlePlayAudio = (text: string) => {
  const uttr = new SpeechSynthesisUtterance(text);
  uttr.lang = "en-US";
  window.speechSynthesis.speak(uttr);
};
