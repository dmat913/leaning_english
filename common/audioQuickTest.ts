// 🧪 新しい音声プレイヤーのクイックテスト

import {
  playJapanese,
  playEnglish,
  stopAudio,
  debugAudio,
  playJapaneseWithSpeed,
  playEnglishWithSpeed,
  playByLevel,
  playWithCustomSpeed,
} from "./audioPlayer";

import {
  practiceWord,
  practicePhrase,
  playFeedback,
  celebrateCompletion,
  startLearningSession,
  playWithPreset,
  countdown,
} from "./audioHelpers";

// 基本テスト
export const runBasicTests = async () => {
  console.log("🎵 基本テスト開始");

  // 1. 日本語テスト
  console.log("1. 日本語テスト");
  await playJapanese("こんにちは、新しい音声プレイヤーです");
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // 2. 英語テスト
  console.log("2. 英語テスト");
  await playEnglish("Hello, this is the new audio player");
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // 3. 高品質設定テスト
  console.log("3. 高品質設定テスト");
  await playJapanese("これは高品質設定のテストです", {
    quality: "premium",
    pitch: 0.95,
    rate: 0.8,
  });

  console.log("✅ 基本テスト完了");
};

// 学習機能テスト
export const runLearningTests = async () => {
  console.log("📚 学習機能テスト開始");

  // 1. 学習開始
  await startLearningSession("600点レベル");
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // 2. 単語練習
  console.log("単語練習テスト");
  await practiceWord("apple", "りんご", { repeatCount: 1 });
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // 3. フレーズ練習
  console.log("フレーズ練習テスト");
  await practicePhrase("How are you?", "お元気ですか？", { repeatEnglish: 1 });
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // 4. フィードバック
  console.log("フィードバックテスト");
  await playFeedback(true); // 正解
  await new Promise((resolve) => setTimeout(resolve, 1000));
  await playFeedback(false); // 不正解
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // 5. 完了お祝い
  await celebrateCompletion("基礎レベル", 85);

  console.log("✅ 学習機能テスト完了");
};

// プリセットテスト
export const runPresetTests = async () => {
  console.log("⚙️ プリセットテスト開始");

  const testText = "This is a test sentence";

  // 初心者プリセット
  console.log("初心者プリセット（ゆっくり）");
  await playWithPreset(testText, "en", "beginner");
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // 中級者プリセット
  console.log("中級者プリセット（標準）");
  await playWithPreset(testText, "en", "intermediate");
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // 上級者プリセット
  console.log("上級者プリセット（速い）");
  await playWithPreset(testText, "en", "advanced");

  console.log("✅ プリセットテスト完了");
};

// デバッグ情報表示
export const showDebugInfo = async () => {
  console.log("🔍 デバッグ情報表示");
  await debugAudio();
};

// 全テスト実行
export const runAllTests = async () => {
  console.log("🚀 全テスト開始");

  try {
    await showDebugInfo();
    await new Promise((resolve) => setTimeout(resolve, 1000));

    await runBasicTests();
    await new Promise((resolve) => setTimeout(resolve, 2000));

    await runLearningTests();
    await new Promise((resolve) => setTimeout(resolve, 2000));

    await runPresetTests();

    console.log("🎉 全テスト完了！音声プレイヤーが正常に動作しています");
  } catch (error) {
    console.error("❌ テスト中にエラーが発生しました:", error);
  }
};

// カウントダウンテスト
export const testCountdown = async () => {
  console.log("⏰ カウントダウンテスト");
  await countdown(3);
};

// ブラウザコンソール用の簡単テスト関数
export const quickTest = {
  // 基本テスト
  ja: () => playJapanese("日本語テストです"),
  en: () => playEnglish("English test"),

  // 🎛️ 速度テスト（日常会話レベルに調整済み）
  jaSlow: () => playJapaneseWithSpeed("学習用のゆっくりな日本語です", "slow"), // 0.8倍速
  jaNormal: () => playJapaneseWithSpeed("日常会話レベルの日本語です", "normal"), // 1.0倍速
  jaFast: () => playJapaneseWithSpeed("ネイティブレベルの日本語です", "fast"), // 1.2倍速

  enSlow: () =>
    playEnglishWithSpeed("This is slow English for learning", "slow"), // 0.85倍速
  enNormal: () =>
    playEnglishWithSpeed("This is natural conversation speed", "normal"), // 1.0倍速
  enFast: () =>
    playEnglishWithSpeed("This is native conversation speed", "fast"), // 1.15倍速

  // レベル別テスト（日常会話レベルに調整済み）
  beginner: () => playByLevel("初心者向けの速度です", "ja", "beginner"), // 0.8倍速
  intermediate: () =>
    playByLevel("日常会話レベルの速度です", "ja", "intermediate"), // 1.0倍速
  advanced: () => playByLevel("ネイティブレベルの速度です", "ja", "advanced"), // 1.2倍速

  // カスタム速度テスト
  custom09: () => playWithCustomSpeed("カスタム速度0.9です", "ja", 0.9),
  custom11: () => playWithCustomSpeed("カスタム速度1.1です", "ja", 1.1),
  custom13: () => playWithCustomSpeed("カスタム速度1.3です", "ja", 1.3),

  // 学習機能テスト
  word: () => practiceWord("hello", "こんにちは"),
  phrase: () => practicePhrase("Nice to meet you", "はじめまして"),
  correct: () => playFeedback(true),
  wrong: () => playFeedback(false),
  celebrate: () => celebrateCompletion("テストレベル"),

  // 制御
  stop: () => stopAudio(),
  debug: () => debugAudio(),

  // 全テスト
  all: () => runAllTests(),
  countdown: () => testCountdown(),
};

// グローバル関数として登録（ブラウザコンソールでテスト用）
if (typeof window !== "undefined") {
  (window as any).audioQuickTest = quickTest;
  console.log(
    "🎵 AudioPlayer クイックテスト関数を登録しました（日常会話レベルに調整済み）"
  );
  console.log("使用例:");
  console.log("  audioQuickTest.ja()         - 日本語テスト（1.0倍速）");
  console.log("  audioQuickTest.en()         - 英語テスト（1.0倍速）");
  console.log("  🎛️ 速度テスト（日常会話レベル基準）:");
  console.log("  audioQuickTest.jaSlow()     - 学習用（0.8倍速）");
  console.log("  audioQuickTest.jaNormal()   - 日常会話（1.0倍速）");
  console.log("  audioQuickTest.jaFast()     - ネイティブ（1.2倍速）");
  console.log("  audioQuickTest.beginner()   - 初心者（0.8倍速）");
  console.log("  audioQuickTest.intermediate() - 中級者（1.0倍速）");
  console.log("  audioQuickTest.advanced()   - 上級者（1.2倍速）");
  console.log("  audioQuickTest.custom11()   - カスタム速度1.1");
  console.log("  audioQuickTest.word()       - 単語練習テスト");
  console.log("  audioQuickTest.phrase()     - フレーズ練習テスト");
  console.log("  audioQuickTest.correct()    - 正解フィードバック");
  console.log("  audioQuickTest.wrong()      - 不正解フィードバック");
  console.log("  audioQuickTest.celebrate()  - 完了お祝い");
  console.log("  audioQuickTest.countdown()  - カウントダウン");
  console.log("  audioQuickTest.stop()       - 停止");
  console.log("  audioQuickTest.debug()      - デバッグ情報");
  console.log("  audioQuickTest.all()        - 全テスト実行");
}
