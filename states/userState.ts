import { UserDocument } from "@/models/userModel";
import { atom } from "recoil";

export const userState = atom<UserDocument | null>({
  key: "userState",
  default: null,
});
