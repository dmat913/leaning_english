import { useCallback } from "react";

const useAudio = () => {
  const playInterrupt = useCallback(() => {
    try {
      const audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();

      // メインクリック音 (高周波のシャープな音)
      const oscillator1 = audioContext.createOscillator();
      const gainNode1 = audioContext.createGain();

      oscillator1.type = "sine";
      oscillator1.frequency.setValueAtTime(1400, audioContext.currentTime);
      oscillator1.frequency.exponentialRampToValueAtTime(
        900,
        audioContext.currentTime + 0.04
      );

      gainNode1.gain.setValueAtTime(0.25, audioContext.currentTime);
      gainNode1.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.04
      );

      // サブベース (低周波で深みを追加)
      const oscillator2 = audioContext.createOscillator();
      const gainNode2 = audioContext.createGain();

      oscillator2.type = "sine";
      oscillator2.frequency.setValueAtTime(120, audioContext.currentTime);

      gainNode2.gain.setValueAtTime(0.15, audioContext.currentTime);
      gainNode2.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.06
      );

      // ホワイトノイズ (クリック感を強調)
      const bufferSize = audioContext.sampleRate * 0.02;
      const buffer = audioContext.createBuffer(
        1,
        bufferSize,
        audioContext.sampleRate
      );
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = audioContext.createBufferSource();
      whiteNoise.buffer = buffer;
      const noiseGain = audioContext.createGain();
      noiseGain.gain.setValueAtTime(0.08, audioContext.currentTime);
      noiseGain.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.02
      );

      // 接続
      oscillator1.connect(gainNode1);
      oscillator2.connect(gainNode2);
      whiteNoise.connect(noiseGain);
      gainNode1.connect(audioContext.destination);
      gainNode2.connect(audioContext.destination);
      noiseGain.connect(audioContext.destination);

      // 再生
      oscillator1.start(audioContext.currentTime);
      oscillator2.start(audioContext.currentTime);
      whiteNoise.start(audioContext.currentTime);

      oscillator1.stop(audioContext.currentTime + 0.04);
      oscillator2.stop(audioContext.currentTime + 0.06);
      whiteNoise.stop(audioContext.currentTime + 0.02);

      // クリーンアップ
      setTimeout(() => {
        audioContext.close();
      }, 100);
    } catch (error) {
      console.error("Audio playback error:", error);
    }
  }, []);

  return { playInterrupt };
};

export default useAudio;
