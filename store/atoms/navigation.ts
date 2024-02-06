import { atom } from "recoil";

export const changeSlide = atom({
  key: "changeSlide", // unique ID (with respect to other atoms/selectors)
  default: {
    changeSlide: false,
  },
});
