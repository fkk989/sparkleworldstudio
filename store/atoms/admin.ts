import { atom } from "recoil";

export const isAdmin = atom({
  key: "isAdmin", // unique ID (with respect to other atoms/selectors)
  default: {
    isAdmin: false,
  },
});
