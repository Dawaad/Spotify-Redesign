import { atom } from "recoil";

export const currentTrackIDState = atom<string | null>({
  key: "currentTrackIDState",
  default: null,
});
export const isPlayingState = atom<boolean>({
  key: "isPlayingState",
  default: false,
});

export const isShuffleState = atom<boolean>({
  key: 'isShuffleState',
  default:false
})
export const isRepeatState = atom<string>({
  key:'isRepeatState',
  default:'off'
})
