import { atom } from "recoil";

export const currentTrackIDState = atom<string | null>({
  key: "currentTrackIDState",
  default: null,
});
export const isPlayingState = atom<boolean>({
  key: "isPlayingState",
  default: false,
});
