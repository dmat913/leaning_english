// 🎮 AudioPlayer の使用例とテスト

import {
  playJapanese,
  playEnglish,
  stopAudio,
  pauseAudio,
  resumeAudio,
  debugAudio,
  getVoices,
} from "./audioPlayer";

// 基本的な使用方法
export const basicUsageExamples = {
  // 1. 日本語を再生
  async playJapaneseExample() {
    await playJapanese("こんにちは、世界！");
  },

  // 2. 英語を再生
  async playEnglishExample() {
    await playEnglish("Hello, World!");
  },

  // 3. カスタム設定で再生
  async playWithCustomSettings() {
    await playJapanese("これはカスタム設定のテストです", {
      pitch: 1.2, // 高めの声
      rate: 0.7, // ゆっくり
      volume: 0.8, // 少し小さく
      quality: "premium", // 最高品質
    });
  },

  // 4. 連続再生
  async playSequence() {
    await playJapanese("最初の文章です");
    await playEnglish("This is the second sentence");
    await playJapanese("最後の文章です");
  },

  // 5. 再生制御
  playWithControls() {
    // 再生開始
    playJapanese(
      "長い文章をテストしています。途中で停止したり一時停止したりできます。"
    );

    // 3秒後に一時停止
    setTimeout(() => {
      pauseAudio();
      console.log("一時停止しました");
    }, 3000);

    // 5秒後に再開
    setTimeout(() => {
      resumeAudio();
      console.log("再開しました");
    }, 5000);

    // 8秒後に停止
    setTimeout(() => {
      stopAudio();
      console.log("停止しました");
    }, 8000);
  },
};

// デバッグとテスト用の関数
export const debugAndTest = {
  // 利用可能な音声を確認
  async checkAvailableVoices() {
    console.log("=== 日本語音声 ===");
    const japaneseVoices = await getVoices("ja");
    japaneseVoices.forEach((voice, i) => {
      console.log(`${i + 1}. ${voice.name} (${voice.lang})`);
    });

    console.log("\n=== 英語音声 ===");
    const englishVoices = await getVoices("en");
    englishVoices.forEach((voice, i) => {
      console.log(`${i + 1}. ${voice.name} (${voice.lang})`);
    });
  },

  // 全てのデバッグ情報を表示
  async fullDebug() {
    await debugAudio();
  },

  // 品質別テスト
  async qualityTest() {
    const testText = "これは音質テストです";

    console.log("標準品質でテスト...");
    await playJapanese(testText, { quality: "standard" });

    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("高品質でテスト...");
    await playJapanese(testText, { quality: "high" });

    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("最高品質でテスト...");
    await playJapanese(testText, { quality: "premium" });
  },
};

// 学習アプリでの実際の使用例
export const learningAppExamples = {
  // 英単語の発音練習
  async practiceWord(englishWord: string, japaneseTranslation: string) {
    console.log(`📚 単語練習: ${englishWord}`);

    // 英語で発音
    await playEnglish(englishWord);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // 日本語で意味を説明
    await playJapanese(`${englishWord}の意味は、${japaneseTranslation}です`);
  },

  // フレーズの練習
  async practicePhrase(englishPhrase: string, japaneseTranslation: string) {
    console.log(`💬 フレーズ練習: ${englishPhrase}`);

    // 日本語で説明
    await playJapanese(`次のフレーズを覚えましょう`);
    await new Promise((resolve) => setTimeout(resolve, 500));

    // 英語フレーズ
    await playEnglish(englishPhrase, { rate: 0.8 }); // ゆっくり
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // 日本語訳
    await playJapanese(`意味は「${japaneseTranslation}」です`);
  },

  // 正解・不正解のフィードバック
  async playFeedback(isCorrect: boolean) {
    if (isCorrect) {
      await playJapanese("正解です！", { pitch: 1.2, rate: 1.1 }); // 明るい声で
    } else {
      await playJapanese("間違いです。もう一度挑戦してみましょう", {
        pitch: 0.9,
      }); // 落ち着いた声で
    }
  },

  // レベル完了のお祝い
  async celebrateCompletion(level: string) {
    await playJapanese(`おめでとうございます！${level}レベルを完了しました！`, {
      pitch: 1.3,
      rate: 1.0,
      quality: "premium",
    });
  },
};

// ブラウザコンソールでテストするための関数
export const consoleTests = {
  basic: () => playJapanese("基本テストです"),
  english: () => playEnglish("Basic test"),
  custom: () => playJapanese("カスタム設定テスト", { pitch: 1.5, rate: 0.6 }),
  debug: () => debugAudio(),
  stop: () => stopAudio(),
};

// グローバルに公開（コンソールでテスト用）
if (typeof window !== "undefined") {
  (window as any).audioTest = consoleTests;
  console.log("🎵 AudioPlayer テスト関数をグローバルに登録しました");
  console.log("使用例:");
  console.log("  audioTest.basic()    - 日本語基本テスト");
  console.log("  audioTest.english()  - 英語基本テスト");
  console.log("  audioTest.custom()   - カスタム設定テスト");
  console.log("  audioTest.debug()    - デバッグ情報表示");
  console.log("  audioTest.stop()     - 再生停止");
}
