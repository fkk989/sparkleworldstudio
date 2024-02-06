import { atom } from "recoil";

export const ideaAtom = atom({
  key: "ideaAtom", // unique ID (with respect to other atoms/selectors)
  default: {
    title: "",
    type: "",
    info: "",
    imageUrl: "",
  },
});
