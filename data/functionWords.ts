import { SupplementCheckbox, WordData } from "@/types/types";

// 前置詞データ
export const prepositionsData: WordData[] = [
  {
    word: "due to",
    wordMeaning: "〜が理由で",
  },
  {
    word: "owing to",
    wordMeaning: "〜が理由で",
  },
  {
    word: "despite",
    wordMeaning: "〜にもかかわらず",
  },
  {
    word: "in spite of",
    wordMeaning: "〜にもかかわらず",
  },
  {
    word: "notwithstanding",
    wordMeaning: "〜にもかかわらず",
  },
  {
    word: "given",
    wordMeaning: "〜を考慮に入れると",
  },
  {
    word: "in light of",
    wordMeaning: "〜を考慮に入れると",
  },
  {
    word: "in the event of",
    wordMeaning: "〜の場合",
  },
  {
    word: "in addition to",
    wordMeaning: "〜に加えて",
  },
  {
    word: "except for",
    wordMeaning: "〜を除いて",
  },
  {
    word: "regardless of",
    wordMeaning: "〜とは無関係に",
  },
  {
    word: "instead of",
    wordMeaning: "〜の代わりに",
  },
];

// 接続詞データ
export const conjunctionsData: WordData[] = [
  {
    word: "whereas",
    wordMeaning: "一方で",
  },
  {
    word: "whether",
    wordMeaning: "〜であろうと、〜かどうか",
  },
  {
    word: "as soon as",
    wordMeaning: "〜するとすぐに",
  },
  {
    word: "once",
    wordMeaning: "いったん〜したら",
  },
  {
    word: "unless",
    wordMeaning: "〜しない限り",
  },
  {
    word: "now that",
    wordMeaning: "今はもう〜なので",
  },
  {
    word: "so that",
    wordMeaning: "〜するように",
  },
  {
    word: "in order that",
    wordMeaning: "〜するように",
  },
  {
    word: "although",
    wordMeaning: "〜にもかかわらず",
  },
  {
    word: "though",
    wordMeaning: "〜にもかかわらず",
  },
  {
    word: "even though",
    wordMeaning: "〜にもかかわらず",
  },
  {
    word: "even if",
    wordMeaning: "たとえ〜でも",
  },
  {
    word: "provided that",
    wordMeaning: "〜するという条件でのみ",
  },
  {
    word: "as long as",
    wordMeaning: "〜する限り",
  },
  {
    word: "in case",
    wordMeaning: "〜するといけないので",
  },
  {
    word: "given that",
    wordMeaning: "〜考慮すると",
  },
  {
    word: "in the event that",
    wordMeaning: "〜した場合",
  },
  {
    word: "insofar as",
    wordMeaning: "〜する限りにおいて",
  },
  {
    word: "inasmuch as",
    wordMeaning: "〜する限りにおいて、〜するので",
  },
];

// 接続副詞
export const conjunctiveAdverbsData: WordData[] = [
  {
    word: "therefore",
    wordMeaning: "したがって",
  },
  {
    word: "however",
    wordMeaning: "しかしながら",
  },
  {
    word: "nevertheless",
    wordMeaning: "それにもかかわらず",
  },
  {
    word: "moreover",
    wordMeaning: "その上",
  },
  {
    word: "furthermore",
    wordMeaning: "さらに",
  },
  {
    word: "consequently",
    wordMeaning: "結果として",
  },
  {
    word: "thereby",
    wordMeaning: "そうすることで",
  },
  {
    word: "thus",
    wordMeaning: "このようにして",
  },
  {
    word: "meanwhile",
    wordMeaning: "その間",
  },
];

// checkbox 表示用
export const FunctionWordsCheckBoxData: SupplementCheckbox[] = [
  { label: "前置詞", data: prepositionsData, checked: false },
  { label: "接続詞", data: conjunctionsData, checked: false },
  { label: "接続副詞", data: conjunctiveAdverbsData, checked: false },
];

// 一覧表示用データ
export const FunctionWordsDisplayListData: {
  title: string;
  data: WordData[];
}[] = [
  { title: "前置詞", data: [...prepositionsData] },
  { title: "接続詞", data: [...conjunctionsData] },
  { title: "接続副詞", data: [...conjunctiveAdverbsData] },
];
