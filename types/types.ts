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
  // カテゴリ
  category?: CategoryType;
  // 備考
  remarks?: string;
  // 暗記済みflag
  isCompleted: boolean;
  // 完了日時
  completedAt?: Date;
  // 挑戦回数
  attempts?: number;
  // 正解回数
  correctCount?: number;
  // 失敗回数
  incorrectCount?: number;
  // 最後にアクセスした日時
  lastAttemptAt?: Date;
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

// 新しいDB構造用の型定義
export interface WordCategory {
  category: string;
  displayName: string;
}

export interface UserProgressSummary {
  category: string;
  totalWords: number;
  completedWords: number;
  completionRate: number;
  lastUpdated?: Date;
}

// カテゴリごとのタイプ定義
export type CategoryType =
  | "level600"
  | "level730"
  | "level860"
  | "level990"
  | "part1_essentialWord100"
  | "phrases120"
  | "prepositions"
  | "conjunctions"
  | "conjunctiveAdverbs";

// ユーザー進捗データと単語データを結合した型
export interface EnglishDataWithProgress {
  // 単語データ
  word_id: string;
  word: string;
  wordMeaning: string;
  sentence: string;
  sentenceMeaning: string;
  portOfSpeech: PortOfSpeech[];
  category?: CategoryType;

  // 進捗データ
  isCompleted: boolean;
  completedAt?: Date;
  attempts?: number;
  lastAttemptAt?: Date;
}

// 新しいDB構造対応のTestData型（EnglishDataと同じ構造）
export type TestData = EnglishData;
