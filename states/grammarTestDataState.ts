import { GrammarExpress } from "@/models/grammarExpressModel";
import { atom, selector } from "recoil";

export const grammarTestDataState = atom<GrammarExpress[]>({
  key: "grammarTestDataState",
  default: [],
});

export const selectedGrammarState = atom<GrammarExpress | null>({
  key: "selectedGrammarState",
  default: null,
});

// Reset all states selector
export const grammarResetState = selector({
  key: "grammarResetState",
  get: () => {
    return;
  },
  set: ({ reset }) => {
    // リセットするためにresetを使用
    reset(grammarTestDataState);
  },
});
