// 表示する英語データ
export interface EnglishData {
  // id
  id: string;
  // 勉強する英単語
  word: string;
  // wordの意味
  wordMeaning: string;
  // 例文
  sentence: string;
  // 例文の意味
  sentenceMeaning: string;
  // 品詞
  portOfSpeech: PortOfSpeech[];
}

// 品詞
export type PortOfSpeech =
  | "動詞"
  | "形容詞"
  | "副詞"
  | "名詞"
  | "前置詞"
  | "接続詞";

// status
export type Status =
  | "not_started"
  | "display_list"
  | "setting_training"
  | "in_progress"
  | "completed"
  | "blocked";

export type Option = {
  value: number;
  label: string;
};
