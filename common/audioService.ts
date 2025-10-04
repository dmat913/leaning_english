// 外部音声サービス連携用の代替案
// より高品質な音声再生のためのサービス層

export interface AudioService {
  synthesizeAudio(text: string, language: string): Promise<string>;
  playAudio(audioUrl: string): Promise<void>;
}

// Google Cloud Text-to-Speech API (将来実装)
export class GoogleTTSService implements AudioService {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async synthesizeAudio(text: string, language: string): Promise<string> {
    const endpoint = "https://texttospeech.googleapis.com/v1/text:synthesize";

    const requestBody = {
      input: { text },
      voice: {
        languageCode: language === "ja-JP" ? "ja-JP" : "en-US",
        name: language === "ja-JP" ? "ja-JP-Neural2-B" : "en-US-Neural2-C",
        ssmlGender: "NEUTRAL",
      },
      audioConfig: {
        audioEncoding: "MP3",
        pitch: language === "ja-JP" ? -2.0 : 0.0,
        speakingRate: language === "ja-JP" ? 0.85 : 1.0,
        volumeGainDb: 0.0,
      },
    };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      return `data:audio/mp3;base64,${data.audioContent}`;
    } catch (error) {
      console.error("Google TTS API error:", error);
      throw error;
    }
  }

  async playAudio(audioUrl: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const audio = new Audio(audioUrl);
      audio.onended = () => resolve();
      audio.onerror = (error) => reject(error);
      audio.play().catch(reject);
    });
  }
}

// Azure Speech Service (将来実装)
export class AzureTTSService implements AudioService {
  private subscriptionKey: string;
  private region: string;

  constructor(subscriptionKey: string, region: string) {
    this.subscriptionKey = subscriptionKey;
    this.region = region;
  }

  async synthesizeAudio(text: string, language: string): Promise<string> {
    const endpoint = `https://${this.region}.tts.speech.microsoft.com/cognitiveservices/v1`;

    const ssml = `
      <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="${language}">
        <voice name="${
          language === "ja-JP" ? "ja-JP-NanamiNeural" : "en-US-AriaNeural"
        }">
          <prosody pitch="${language === "ja-JP" ? "-5%" : "+0%"}" rate="${
      language === "ja-JP" ? "0.9" : "1.0"
    }">
            ${text}
          </prosody>
        </voice>
      </speak>
    `;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Ocp-Apim-Subscription-Key": this.subscriptionKey,
          "Content-Type": "application/ssml+xml",
          "X-Microsoft-OutputFormat": "audio-16khz-128kbitrate-mono-mp3",
        },
        body: ssml,
      });

      const audioBlob = await response.blob();
      return URL.createObjectURL(audioBlob);
    } catch (error) {
      console.error("Azure TTS API error:", error);
      throw error;
    }
  }

  async playAudio(audioUrl: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const audio = new Audio(audioUrl);
      audio.onended = () => {
        URL.revokeObjectURL(audioUrl); // メモリリークを防ぐ
        resolve();
      };
      audio.onerror = (error) => reject(error);
      audio.play().catch(reject);
    });
  }
}

// 音声品質検証用のテスト関数
export const testAudioQuality = async () => {
  const testText = "これは音声品質のテストです。自然で滑らかに聞こえますか？";

  console.log("=== 音声品質テスト開始 ===");

  // Web Speech API
  console.log("1. Web Speech API でテスト中...");
  const utterance = new SpeechSynthesisUtterance(testText);
  utterance.lang = "ja-JP";

  const voices = window.speechSynthesis.getVoices();
  const japaneseVoices = voices.filter((v) => v.lang.includes("ja"));

  console.log(`利用可能な日本語音声: ${japaneseVoices.length}個`);
  japaneseVoices.forEach((voice, index) => {
    console.log(
      `  ${index + 1}. ${voice.name} (${voice.lang}) - ${
        voice.localService ? "ローカル" : "リモート"
      }`
    );
  });

  if (japaneseVoices.length > 0) {
    utterance.voice = japaneseVoices[0];
    utterance.pitch = 0.95;
    utterance.rate = 0.85;
    utterance.volume = 0.9;

    window.speechSynthesis.speak(utterance);
  } else {
    console.log("日本語音声が見つかりません");
  }
};

// SSML（Speech Synthesis Markup Language）を使った高度な制御
export const createSSMLForJapanese = (text: string): string => {
  return `
    <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="ja-JP">
      <voice name="ja-JP-NanamiNeural">
        <prosody pitch="-10%" rate="0.85" volume="90%">
          <emphasis level="moderate">${text}</emphasis>
        </prosody>
      </voice>
    </speak>
  `;
};
