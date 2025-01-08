// ランダムな数の値を抽出
export const getRandomItems = <T>(array: T[], count: number) => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// 音声再生
export const handlePlayAudio = (
  text: string,
  language: string = "en-US",
  onEndCallback?: () => void
) => {
  // 既存の再生を停止
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = language;
  
  // 声を明示的に選択
  const voices = window.speechSynthesis.getVoices();
  
  // 指定された言語に最適な声を選択
  const targetVoice = voices.find(voice => 
    language === "en-US" 
      ? (voice.lang.includes("en") && !voice.lang.includes("GB")) // アメリカ英語を優先
      : voice.lang.includes("ja")  // 日本語
  );
  
  if (targetVoice) {
    utterance.voice = targetVoice;
  }

  // 英語の場合、音声パラメータを調整
  if (language === "en-US") {
    utterance.pitch = 1.0;  // 標準のピッチ
    utterance.rate = 0.9;   // やや遅めの速度
  }

  if (onEndCallback) {
    utterance.onend = () => {
      onEndCallback();
    };
  }

  window.speechSynthesis.speak(utterance);
};

// voices配列を確実に取得するためのヘルパー関数
export const initVoices = (): Promise<SpeechSynthesisVoice[]> => {
  return new Promise((resolve) => {
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      resolve(voices);
    } else {
      window.speechSynthesis.onvoiceschanged = () => {
        resolve(window.speechSynthesis.getVoices());
      };
    }
  });
};
