// 🎵 学習アプリ用の音声ヘルパー関数
// 英語学習に特化した便利な音声機能

import { playJapanese, playEnglish, stopAudio } from "./audioPlayer";

// AudioSettings型を再定義（audioPlayer.tsから）
interface AudioSettings {
  pitch?: number;
  rate?: number;
  volume?: number;
  quality?: "standard" | "high" | "premium";
}

// 英単語の練習用
export const practiceWord = async (
  englishWord: string,
  japaneseTranslation: string,
  options?: {
    speakTranslation?: boolean;
    repeatCount?: number;
    pauseBetween?: number;
  }
) => {
  const {
    speakTranslation = true,
    repeatCount = 1,
    pauseBetween = 1000,
  } = options || {};

  for (let i = 0; i < repeatCount; i++) {
    // 英語で単語を発音
    await playEnglish(englishWord, { rate: 0.8, quality: "high" });

    if (pauseBetween > 0) {
      await new Promise((resolve) => setTimeout(resolve, pauseBetween));
    }

    // 日本語で意味を説明（オプション）
    if (speakTranslation) {
      await playJapanese(`${englishWord}の意味は${japaneseTranslation}です`);

      if (i < repeatCount - 1 && pauseBetween > 0) {
        await new Promise((resolve) => setTimeout(resolve, pauseBetween * 2));
      }
    }
  }
};

// フレーズの練習用
export const practicePhrase = async (
  englishPhrase: string,
  japaneseTranslation: string,
  options?: {
    explainFirst?: boolean;
    repeatEnglish?: number;
    slowSpeed?: boolean;
  }
) => {
  const {
    explainFirst = true,
    repeatEnglish = 2,
    slowSpeed = true,
  } = options || {};

  // 最初に日本語で説明
  if (explainFirst) {
    await playJapanese("次のフレーズを覚えましょう");
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  // 英語フレーズを指定回数繰り返し
  for (let i = 0; i < repeatEnglish; i++) {
    const settings: Partial<AudioSettings> = {
      rate: slowSpeed ? 0.7 : 0.9,
      quality: "high",
    };

    await playEnglish(englishPhrase, settings);

    if (i < repeatEnglish - 1) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  await new Promise((resolve) => setTimeout(resolve, 1000));

  // 日本語訳
  await playJapanese(`意味は「${japaneseTranslation}」です`);
};

// 正解・不正解のフィードバック
export const playFeedback = async (
  isCorrect: boolean,
  customMessage?: string
) => {
  if (isCorrect) {
    const message = customMessage || "正解です！";
    await playJapanese(message, {
      pitch: 1.2,
      rate: 1.1,
      quality: "high",
    });
  } else {
    const message = customMessage || "間違いです。もう一度挑戦してみましょう";
    await playJapanese(message, {
      pitch: 0.9,
      rate: 0.9,
      quality: "high",
    });
  }
};

// レベル/セクション完了のお祝い
export const celebrateCompletion = async (level: string, score?: number) => {
  let message = `おめでとうございます！${level}レベルを完了しました！`;

  if (score !== undefined) {
    message += `スコアは${score}点です！`;
  }

  await playJapanese(message, {
    pitch: 1.3,
    rate: 1.0,
    quality: "premium",
  });
};

// 学習開始の挨拶
export const startLearningSession = async (level?: string) => {
  const message = level
    ? `${level}レベルの学習を始めましょう！`
    : "英語学習を始めましょう！";

  await playJapanese(message, {
    pitch: 1.1,
    rate: 1.0,
    quality: "high",
  });
};

// 休憩時間の案内
export const suggestBreak = async () => {
  await playJapanese("お疲れ様でした。少し休憩しませんか？", {
    pitch: 0.95,
    rate: 0.9,
    quality: "high",
  });
};

// 進捗報告
export const reportProgress = async (completed: number, total: number) => {
  const percentage = Math.round((completed / total) * 100);
  const message = `現在の進捗は${completed}問中${total}問完了。${percentage}パーセントです`;

  await playJapanese(message, {
    rate: 0.9,
    quality: "high",
  });
};

// カウントダウン
export const countdown = async (seconds: number = 3) => {
  for (let i = seconds; i > 0; i--) {
    await playJapanese(i.toString(), {
      pitch: 1.2,
      rate: 1.0,
      quality: "high",
    });

    if (i > 1) {
      await new Promise((resolve) => setTimeout(resolve, 800));
    }
  }

  await new Promise((resolve) => setTimeout(resolve, 300));
  await playJapanese("始めましょう！", {
    pitch: 1.3,
    rate: 1.2,
    quality: "high",
  });
};

// リスニング問題用のフレーズ再生
export const playListeningPhrase = async (
  phrase: string,
  language: "ja" | "en" = "en",
  options?: {
    speed?: "slow" | "normal" | "fast";
    repeatCount?: number;
    pauseBetween?: number;
  }
) => {
  const {
    speed = "normal",
    repeatCount = 2,
    pauseBetween = 1500,
  } = options || {};

  const rateMap = {
    slow: 0.7,
    normal: 0.9,
    fast: 1.1,
  };

  const settings: Partial<AudioSettings> = {
    rate: rateMap[speed],
    quality: "high",
  };

  for (let i = 0; i < repeatCount; i++) {
    if (language === "ja") {
      await playJapanese(phrase, settings);
    } else {
      await playEnglish(phrase, settings);
    }

    if (i < repeatCount - 1) {
      await new Promise((resolve) => setTimeout(resolve, pauseBetween));
    }
  }
};

// 緊急停止（全ての音声を停止）
export const emergencyStop = () => {
  stopAudio();
  console.log("🛑 全ての音声を緊急停止しました");
};

// 音声設定のプリセット
export const AUDIO_PRESETS = {
  // 初心者向け：ゆっくり、はっきり
  beginner: {
    ja: { pitch: 0.95, rate: 0.8, volume: 1.0, quality: "high" as const },
    en: { pitch: 1.0, rate: 0.85, volume: 1.0, quality: "high" as const },
  },

  // 中級者向け：日常会話レベル
  intermediate: {
    ja: { pitch: 0.95, rate: 1.0, volume: 0.95, quality: "high" as const },
    en: { pitch: 1.0, rate: 1.0, volume: 1.0, quality: "high" as const },
  },

  // 上級者向け：ネイティブスピード
  advanced: {
    ja: { pitch: 0.95, rate: 1.2, volume: 0.95, quality: "premium" as const },
    en: { pitch: 1.0, rate: 1.15, volume: 1.0, quality: "premium" as const },
  },
};

// プリセットを使った再生
export const playWithPreset = async (
  text: string,
  language: "ja" | "en",
  preset: keyof typeof AUDIO_PRESETS = "intermediate"
) => {
  const settings = AUDIO_PRESETS[preset][language];

  if (language === "ja") {
    await playJapanese(text, settings);
  } else {
    await playEnglish(text, settings);
  }
};
