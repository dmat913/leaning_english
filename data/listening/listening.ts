export type ListeningData = {
  // 問題文（英語）
  questionEnglishText: string;
  // 問題文（日本語訳）
  questionJapaneseText: string;
  // 問いの配列
  questions: Question[];
  // カテゴリー
  category: string;
};

export type Question = {
  // 問題文（英語）
  questionEnglishText: string;
  // 問題文（日本語訳）
  questionJapaneseText: string;
  // 選択肢
  options: Option[];
  // 正解フラグ
  answer: string;
};

export type Option = {
  // 選択肢（英語）
  optionEnglishText: string;
  // 選択肢（日本語訳）
  optionJapaneseText: string;
};

export const part3ListeningData: ListeningData[] = [
  {
    questionEnglishText:
      "Clara's Dog Grooming Service. How can I help you?Hi, I'm Mr. Cohen. My dog, Rusty, got out of the yard and ran through the farmer's field next to my house. He's filthy and I'd like to bring him in for a wash. He might as well get groomed while we're there.When would you like to come in?As soon as possible. He really is very dirty.Ok, we can take care of that right away. Does Rusty have long hair or short hair?He's a long-haired terrier. We'll be there in about ten minutes.",
    questionJapaneseText:
      "こんにちは、コーエンと申します。私の犬のラスティが庭から出て、家の隣の農家の畑を走り抜けてしまいました。とても汚れてしまったので、洗ってもらいたいです。せっかくなのでグルーミングもお願いしたいです。ご来店はいつご希望ですか？できるだけ早くお願いします。本当にとても汚れているんです。かしこまりました、すぐに対応できます。ラスティは長毛ですか、それとも短毛ですか？長毛のテリアです。10分ほどで伺います。",
    questions: [
      {
        questionEnglishText: "Who, most likely, is the woman?",
        questionJapaneseText: "その女性は、おそらく誰ですか？",
        options: [
          {
            optionEnglishText: "(A) A receptionist",
            optionJapaneseText: "受付係",
          },
          {
            optionEnglishText: "(B) A salesperson",
            optionJapaneseText: "販売員",
          },
          {
            optionEnglishText: "(C) A dentist",
            optionJapaneseText: "歯科医",
          },
          {
            optionEnglishText: "(D) A fitness instructor",
            optionJapaneseText: "フィットネスインストラクター",
          },
        ],
        answer: "(A) A receptionist",
      },
      {
        questionEnglishText: "Why is the man calling?",
        questionJapaneseText: "男性はなぜ電話をかけていますか？",
        options: [
          {
            optionEnglishText: "(A) To confirm a schedule",
            optionJapaneseText: "スケジュールを確認するため",
          },
          {
            optionEnglishText: "(B) To cancel a subscription",
            optionJapaneseText: "定期購読を解約するため",
          },
          {
            optionEnglishText: "(C) To make an appointment",
            optionJapaneseText: "予約を取るため",
          },
          {
            optionEnglishText: "(D) To check on a shipment",
            optionJapaneseText: "配送状況を確認するため",
          },
        ],
        answer: "(C) To make an appointment",
      },
      {
        questionEnglishText: "What is true about the dog?",
        questionJapaneseText: "その犬について正しいのはどれですか？",
        options: [
          {
            optionEnglishText: "(A) It is not dirty",
            optionJapaneseText: "汚れていない",
          },
          {
            optionEnglishText: "(B) It will receive a veterinary treatment.",
            optionJapaneseText: "獣医の治療を受ける",
          },
          {
            optionEnglishText: "(C) It is very noisy",
            optionJapaneseText: "とてもうるさい",
          },
          {
            optionEnglishText: "(D) It has long hair.",
            optionJapaneseText: "長い毛がある",
          },
        ],
        answer: "(D) It has long hair.",
      },
    ],
    category: "part3",
  },
];
