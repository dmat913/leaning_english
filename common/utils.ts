// 🎵 新しい音声プレイヤーを使用（日本語と英語対応）
// audioPlayer.ts からインポートした関数を再エクスポート
import {
  playJapanese,
  playEnglish,
  stopAudio,
  pauseAudio,
  resumeAudio,
  debugAudio,
  playJapaneseWithSpeed,
  playEnglishWithSpeed,
  playByLevel,
  playWithCustomSpeed,
} from "./audioPlayer";

// ランダムな数の値を抽出
export const getRandomItems = <T>(array: T[], count: number) => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// 未完了（isCompleted: false）の問題のみを抽出してランダムに選択
export const getRandomIncompleteItems = <T extends { isCompleted: boolean }>(
  array: T[],
  count: number
): T[] => {
  const incompleteItems = array.filter((item) => !item.isCompleted);
  const shuffled = [...incompleteItems].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, incompleteItems.length));
};

// 便利な統合関数
export const playAudio = async (
  text: string,
  language: "ja" | "en" = "en",
  onEndCallback?: () => void
) => {
  if (language === "ja") {
    await playJapanese(text);
  } else {
    await playEnglish(text);
  }

  if (onEndCallback) {
    onEndCallback();
  }
};

// 後方互換性のための関数（既存コードが動くように）
export const handlePlayAudio = async (
  text: string,
  language: string = "en-US",
  onEndCallback?: () => void
) => {
  const lang = language.includes("ja") ? "ja" : "en";
  await playAudio(text, lang, onEndCallback);
};

// 便利な個別関数
export const playJapaneseAudio = playJapanese;
export const playEnglishAudio = playEnglish;
export const stopCurrentAudio = stopAudio;
export const pauseCurrentAudio = pauseAudio;
export const resumeCurrentAudio = resumeAudio;
export const showAudioDebugInfo = debugAudio;

// 🎛️ 新しい速度制御関数
export const playJapaneseAudioWithSpeed = playJapaneseWithSpeed;
export const playEnglishAudioWithSpeed = playEnglishWithSpeed;
export const playAudioByLevel = playByLevel;
export const playAudioWithCustomSpeed = playWithCustomSpeed;
