// 音声テスト用のスクリプト
// ブラウザのコンソールで実行してください

import { debugAudio, playJapanese, playEnglish } from "@/common/audioPlayer";

// 1. 利用可能な音声を確認
console.log("=== 音声診断開始 ===");
debugAudio();

// 2. 音質テスト
setTimeout(() => {
  console.log("日本語音質テスト開始");
  playJapanese("これは音声品質のテストです。自然で滑らかに聞こえますか？");
}, 2000);

// 3. 実際の改善された音声でテスト
setTimeout(() => {
  const testText =
    "こんにちは。これは新しい音声エンジンのテストです。より自然で滑らかな音声になりましたか？";
  playJapanese(testText);
}, 5000);

// 4. 英語テスト
setTimeout(() => {
  playEnglish(
    "Hello, this is a test of the new audio engine. Does it sound more natural and smooth?"
  );
}, 8000);
