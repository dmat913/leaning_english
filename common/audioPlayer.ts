// 🎵 新しいシンプルな音声プレイヤー
// 日本語と英語を簡単に指定して再生できる

export type Language = "ja" | "en";
export type AudioQuality = "standard" | "high" | "premium";

interface AudioSettings {
  pitch?: number;
  rate?: number;
  volume?: number;
  quality?: AudioQuality;
}

interface VoiceProfile {
  name: string;
  lang: string;
  priority: number;
  quality: AudioQuality;
}

// プラットフォーム別の最適な音声プロファイル
const VOICE_PROFILES: Record<Language, VoiceProfile[]> = {
  ja: [
    // macOS/iOS (最高品質)
    { name: "Kyoko", lang: "ja-JP", priority: 10, quality: "premium" },
    { name: "Otoya", lang: "ja-JP", priority: 9, quality: "premium" },

    // Google Chrome (高品質)
    { name: "Google 日本語", lang: "ja-JP", priority: 8, quality: "high" },
    { name: "Google Japanese", lang: "ja-JP", priority: 7, quality: "high" },

    // Windows (標準品質)
    {
      name: "Microsoft Sayaka",
      lang: "ja-JP",
      priority: 6,
      quality: "standard",
    },
    {
      name: "Microsoft Haruka",
      lang: "ja-JP",
      priority: 5,
      quality: "standard",
    },
    { name: "Sayaka", lang: "ja-JP", priority: 4, quality: "standard" },
    { name: "Haruka", lang: "ja-JP", priority: 3, quality: "standard" },
  ],
  en: [
    // macOS/iOS (最高品質)
    { name: "Samantha", lang: "en-US", priority: 10, quality: "premium" },
    { name: "Alex", lang: "en-US", priority: 9, quality: "premium" },

    // Google Chrome (高品質)
    { name: "Google US English", lang: "en-US", priority: 8, quality: "high" },
    { name: "Google English", lang: "en-US", priority: 7, quality: "high" },

    // Windows (標準品質)
    { name: "Microsoft Zira", lang: "en-US", priority: 6, quality: "standard" },
    {
      name: "Microsoft David",
      lang: "en-US",
      priority: 5,
      quality: "standard",
    },
  ],
};

// 言語別のデフォルト設定
const DEFAULT_SETTINGS: Record<Language, AudioSettings> = {
  ja: {
    pitch: 0.95, // 少し低めで自然
    rate: 1.0, // 日常会話レベルの自然なスピード
    volume: 0.95, // 少し抑えめ
    quality: "high",
  },
  en: {
    pitch: 1.0,
    rate: 1.0, // 英語も日常会話レベルに調整
    volume: 1.0,
    quality: "high",
  },
};

class AudioPlayer {
  private voices: SpeechSynthesisVoice[] = [];
  private isInitialized = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  // 初期化（音声リストの読み込み）
  async init(): Promise<void> {
    if (this.isInitialized) return;

    return new Promise((resolve) => {
      const loadVoices = () => {
        this.voices = window.speechSynthesis.getVoices();
        if (this.voices.length > 0) {
          this.isInitialized = true;
          console.log(
            `🎵 音声プレイヤー初期化完了: ${this.voices.length}個の音声を検出`
          );
          resolve();
        }
      };

      loadVoices();
      if (!this.isInitialized) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
    });
  }

  // 指定した言語で最適な音声を選択
  private selectBestVoice(
    language: Language,
    quality: AudioQuality = "high"
  ): SpeechSynthesisVoice | null {
    const profiles = VOICE_PROFILES[language];
    const availableVoices = this.voices;

    // 品質でフィルタリング
    const qualityFiltered = profiles.filter((profile) => {
      if (quality === "premium") return profile.quality === "premium";
      if (quality === "high")
        return ["premium", "high"].includes(profile.quality);
      return true; // standard なら全て
    });

    // 優先度順でマッチング
    for (const profile of qualityFiltered.sort(
      (a, b) => b.priority - a.priority
    )) {
      const voice = availableVoices.find(
        (v) =>
          v.name.includes(profile.name) &&
          v.lang.includes(language === "ja" ? "ja" : "en")
      );
      if (voice) {
        console.log(
          `🎯 選択された音声: ${voice.name} (${voice.lang}) - ${profile.quality}`
        );
        return voice;
      }
    }

    // フォールバック: 言語だけでマッチ
    const fallback = availableVoices.find((v) =>
      language === "ja" ? v.lang.includes("ja") : v.lang.includes("en")
    );

    if (fallback) {
      console.log(`⚠️ フォールバック音声: ${fallback.name} (${fallback.lang})`);
    }

    return fallback || null;
  }

  // メイン再生機能
  async play(
    text: string,
    language: Language,
    customSettings?: Partial<AudioSettings>
  ): Promise<void> {
    // 初期化確認
    if (!this.isInitialized) {
      await this.init();
    }

    // 既存の再生を停止
    this.stop();

    // 設定をマージ
    const settings = { ...DEFAULT_SETTINGS[language], ...customSettings };

    // 音声選択
    const voice = this.selectBestVoice(language, settings.quality);
    if (!voice) {
      console.error(`❌ ${language} の音声が見つかりません`);
      return;
    }

    // 音声合成の設定
    this.currentUtterance = new SpeechSynthesisUtterance(text);
    this.currentUtterance.voice = voice;
    this.currentUtterance.lang = language === "ja" ? "ja-JP" : "en-US";
    this.currentUtterance.pitch = settings.pitch!;
    this.currentUtterance.rate = settings.rate!;
    this.currentUtterance.volume = settings.volume!;

    // エラーハンドリング
    this.currentUtterance.onerror = (event) => {
      console.error("🚫 音声再生エラー:", event.error);
    };

    // 再生開始
    return new Promise((resolve) => {
      this.currentUtterance!.onend = () => {
        console.log("✅ 音声再生完了");
        resolve();
      };

      window.speechSynthesis.speak(this.currentUtterance!);
      console.log(`🔊 再生開始: "${text}" (${language})`);
    });
  }

  // 再生停止
  stop(): void {
    window.speechSynthesis.cancel();
    this.currentUtterance = null;
    console.log("⏹️ 音声再生停止");
  }

  // 一時停止/再開
  pause(): void {
    window.speechSynthesis.pause();
    console.log("⏸️ 音声一時停止");
  }

  resume(): void {
    window.speechSynthesis.resume();
    console.log("▶️ 音声再開");
  }

  // 利用可能な音声の一覧を取得
  async getAvailableVoices(
    language?: Language
  ): Promise<SpeechSynthesisVoice[]> {
    if (!this.isInitialized) {
      await this.init();
    }

    if (!language) return this.voices;

    return this.voices.filter((voice) =>
      language === "ja" ? voice.lang.includes("ja") : voice.lang.includes("en")
    );
  }

  // デバッグ情報を表示
  async debug(): Promise<void> {
    if (!this.isInitialized) {
      await this.init();
    }

    console.log("🔍 AudioPlayer デバッグ情報");
    console.log(`総音声数: ${this.voices.length}`);

    for (const lang of ["ja", "en"] as Language[]) {
      const voices = await this.getAvailableVoices(lang);
      console.log(
        `\n${lang === "ja" ? "🇯🇵 日本語" : "🇺🇸 英語"}音声 (${voices.length}個):`
      );

      voices.forEach((voice, index) => {
        const profile = VOICE_PROFILES[lang].find((p) =>
          voice.name.includes(p.name)
        );
        const quality = profile ? profile.quality : "unknown";
        const priority = profile ? profile.priority : 0;

        console.log(
          `  ${index + 1}. ${voice.name} (${
            voice.lang
          }) - ${quality} [優先度: ${priority}]`
        );
      });
    }
  }
}

// シングルトンインスタンス
const audioPlayer = new AudioPlayer();

// 簡単に使えるエクスポート関数
export const playJapanese = async (
  text: string,
  settings?: Partial<AudioSettings>
) => {
  return audioPlayer.play(text, "ja", settings);
};

export const playEnglish = async (
  text: string,
  settings?: Partial<AudioSettings>
) => {
  return audioPlayer.play(text, "en", settings);
};

export const stopAudio = () => {
  audioPlayer.stop();
};

export const pauseAudio = () => {
  audioPlayer.pause();
};

export const resumeAudio = () => {
  audioPlayer.resume();
};

export const debugAudio = () => {
  audioPlayer.debug();
};

export const getVoices = (language?: Language) => {
  return audioPlayer.getAvailableVoices(language);
};

// デフォルトエクスポート
export default audioPlayer;

// 🎛️ 便利な設定関数

// 日本語の再生速度設定（プリセット）
export const playJapaneseWithSpeed = async (
  text: string,
  speed: "slow" | "normal" | "fast" = "normal",
  otherSettings?: Partial<AudioSettings>
) => {
  const speedSettings = {
    slow: { rate: 0.8, pitch: 0.95 }, // 学習用のゆっくり
    normal: { rate: 1.0, pitch: 0.95 }, // 日常会話レベル
    fast: { rate: 1.2, pitch: 0.95 }, // ネイティブ会話レベル
  };

  const settings = { ...speedSettings[speed], ...otherSettings };
  return audioPlayer.play(text, "ja", settings);
};

// 英語の再生速度設定（プリセット）
export const playEnglishWithSpeed = async (
  text: string,
  speed: "slow" | "normal" | "fast" = "normal",
  otherSettings?: Partial<AudioSettings>
) => {
  const speedSettings = {
    slow: { rate: 0.85, pitch: 1.0 }, // 学習用のゆっくり
    normal: { rate: 1.0, pitch: 1.0 }, // 日常会話レベル
    fast: { rate: 1.15, pitch: 1.0 }, // ネイティブ会話レベル
  };

  const settings = { ...speedSettings[speed], ...otherSettings };
  return audioPlayer.play(text, "en", settings);
};

// 学習レベル別の音声設定
export const playByLevel = async (
  text: string,
  language: Language,
  level: "beginner" | "intermediate" | "advanced" = "intermediate"
) => {
  const levelSettings = {
    beginner: {
      ja: { rate: 0.8, pitch: 0.95, quality: "high" as const }, // 学習者向け
      en: { rate: 0.85, pitch: 1.0, quality: "high" as const },
    },
    intermediate: {
      ja: { rate: 1.0, pitch: 0.95, quality: "high" as const }, // 日常会話レベル
      en: { rate: 1.0, pitch: 1.0, quality: "high" as const },
    },
    advanced: {
      ja: { rate: 1.2, pitch: 0.95, quality: "premium" as const }, // ネイティブレベル
      en: { rate: 1.15, pitch: 1.0, quality: "premium" as const },
    },
  };

  const settings = levelSettings[level][language];
  return audioPlayer.play(text, language, settings);
};

// カスタム速度で再生（数値で細かく指定）
export const playWithCustomSpeed = async (
  text: string,
  language: Language,
  rate: number, // 0.5 (遅い) ～ 2.0 (速い)
  otherSettings?: Partial<AudioSettings>
) => {
  const settings = { rate, ...otherSettings };
  return audioPlayer.play(text, language, settings);
};
