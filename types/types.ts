// 表示する英語データ
export interface EnglishData {
  // mongodbId
  _id: string;
  // word_id
  word_id: string;
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
  // 暗記済みflag
  isCompleted: boolean;
}

export interface WordData {
  // 勉強する英単語
  word: string;
  // wordの意味
  wordMeaning: string;
}

export interface SentenceMeaning {
  // 例文
  sentence: string;
  // 例文の意味
  sentenceMeaning: string;
}

// 部門&職業 前置詞or接続詞or接続副詞 checkbox
export interface SupplementCheckbox {
  label: string;
  data: WordData[];
  checked: boolean;
}

// 多義語
export interface MultipleMeanings {
  // id
  id: string;
  // 勉強する英単語
  word: string;
  // wordの意味
  wordMeaning: string;
  // 例文
  meanings: Meaning[];
}

// 多義語 例文
export interface Meaning {
  meaning: string;
  sentence: string;
  sentenceMeaning: string;
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
  | "listening"
  | "completed"
  | "blocked";

export type Option = {
  value: number;
  label: string;
};
