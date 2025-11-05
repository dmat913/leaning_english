import { ListeningData } from "@/data/listening/listening";
import { atom } from "recoil";

// リスニングテストのデータ（13問セット）
export const listeningTestDataState = atom<ListeningData[]>({
  key: "listeningTestDataState",
  default: [],
});

// 現在の問題のインデックス
export const currentQuestionIndexState = atom<number>({
  key: "currentQuestionIndexState",
  default: 0,
});

// ユーザーの回答
export const userAnswersState = atom<
  {
    questionIndex: number;
    subQuestionIndex: number;
    answer: string;
  }[]
>({
  key: "userAnswersState",
  default: [],
});

// テスト完了フラグ
export const isTestCompletedState = atom<boolean>({
  key: "isTestCompletedState",
  default: false,
});

// テストの状態
export type ListeningTestStatus = "not_started" | "in_progress" | "completed";

export const listeningTestStatusState = atom<ListeningTestStatus>({
  key: "listeningTestStatusState",
  default: "not_started",
});

// 問題文（会話文）の表示/非表示
export const showQuestionTextState = atom<boolean>({
  key: "showQuestionTextState",
  default: false,
});

// 設問の日本語訳の表示/非表示
export const showSubQuestionJapaneseState = atom<boolean>({
  key: "showSubQuestionJapaneseState",
  default: false,
});
