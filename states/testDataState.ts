import { TestData } from "@/models/userModel";
import { atom, selector } from "recoil";

// level600 data
export const level600State = atom<TestData[]>({
  key: "level600State",
  default: [],
});

// level730 data
export const level730State = atom<TestData[]>({
  key: "level730State",
  default: [],
});

// level860 data
export const level860State = atom<TestData[]>({
  key: "level860State",
  default: [],
});

// level990 data
export const level990State = atom<TestData[]>({
  key: "level990State",
  default: [],
});

// part1EssentialWords100 data
export const part1EssentialWords100State = atom<TestData[]>({
  key: "part1EssentialWords100State",
  default: [],
});

// phrase120 data
export const phrase120State = atom<TestData[]>({
  key: "phrase120State",
  default: [],
});

// Reset all states selector
export const resetState = selector({
  key: "resetState",
  get: () => {
    return;
  },
  set: ({ reset }) => {
    // リセットするためにresetを使用
    reset(level600State);
    reset(level730State);
    reset(level860State);
    reset(level990State);
    reset(part1EssentialWords100State);
    reset(phrase120State);
  },
});
