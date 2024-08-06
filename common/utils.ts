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
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = language;

  if (onEndCallback) {
    utterance.onend = () => {
      onEndCallback();
    };
  }

  window.speechSynthesis.speak(utterance);
};
