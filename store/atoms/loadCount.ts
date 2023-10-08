import { atom } from "recoil";

export const loadCount = atom({
  key: "loadCount", // unique ID (with respect to other atoms/selectors)
  default: false,
});
