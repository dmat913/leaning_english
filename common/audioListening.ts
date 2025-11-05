import { ListeningData } from "@/data/listening/listening";

// 音声再生の状態を管理
export class ListeningAudioPlayer {
  private synthesis: SpeechSynthesis;
  private utterances: SpeechSynthesisUtterance[] = [];
  private currentUtteranceIndex = 0;
  private isPaused = false;
  private isPlaying = false;
  private onEndCallback?: () => void;
  private onStartCallback?: () => void;
  private timeoutIds: number[] = [];

  constructor() {
    this.synthesis = window.speechSynthesis;
  }

  // 音声を再生
  async play(
    data: ListeningData,
    onStart?: () => void,
    onEnd?: () => void
  ): Promise<void> {
    // 既存の再生を停止
    this.stop();

    this.onStartCallback = onStart;
    this.onEndCallback = onEnd;
    this.isPlaying = true;

    if (this.onStartCallback) {
      this.onStartCallback();
    }

    // 会話文を読み上げ
    await this.speakText(data.questionEnglishText);

    // 5秒待機
    await this.wait(5000);

    // 各質問を読み上げ
    for (const question of data.questions) {
      if (!this.isPlaying) break;

      // 質問文を読み上げ
      await this.speakText(question.questionEnglishText);

      // 次の質問まで2秒待機
      if (this.isPlaying) {
        await this.wait(2000);
      }
    }

    this.isPlaying = false;
    if (this.onEndCallback) {
      this.onEndCallback();
    }
  }

  // テキストを読み上げる
  private speakText(text: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.isPlaying) {
        resolve();
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);

      // 英語の音声設定
      utterance.lang = "en-US";
      utterance.rate = 0.9; // 少しゆっくり
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      utterance.onend = () => {
        resolve();
      };

      utterance.onerror = (event) => {
        console.error("Speech synthesis error:", event);
        resolve(); // エラーでも続行
      };

      this.synthesis.speak(utterance);
      this.utterances.push(utterance);
    });
  }

  // 指定時間待機
  private wait(ms: number): Promise<void> {
    return new Promise((resolve) => {
      if (!this.isPlaying) {
        resolve();
        return;
      }

      const timeoutId = window.setTimeout(() => {
        resolve();
      }, ms);

      this.timeoutIds.push(timeoutId);
    });
  }

  // 一時停止
  pause(): void {
    if (this.isPlaying && !this.isPaused) {
      this.synthesis.pause();
      this.isPaused = true;
    }
  }

  // 再開
  resume(): void {
    if (this.isPaused) {
      this.synthesis.resume();
      this.isPaused = false;
    }
  }

  // 停止
  stop(): void {
    this.isPlaying = false;
    this.isPaused = false;
    this.synthesis.cancel();

    // タイムアウトをクリア
    this.timeoutIds.forEach((id) => clearTimeout(id));
    this.timeoutIds = [];

    this.utterances = [];
    this.currentUtteranceIndex = 0;
  }

  // 再生中かどうか
  getIsPlaying(): boolean {
    return this.isPlaying;
  }

  // 一時停止中かどうか
  getIsPaused(): boolean {
    return this.isPaused;
  }

  // クリーンアップ
  cleanup(): void {
    this.stop();
  }
}

// シングルトンインスタンスを作成するヘルパー
export const createListeningAudioPlayer = (): ListeningAudioPlayer => {
  return new ListeningAudioPlayer();
};
