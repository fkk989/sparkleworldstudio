import { atom } from "recoil";

export const designAtom = atom({
  key: "desigAtom", // unique ID (with respect to other atoms/selectors)
  default: {
    title: "",
    info: "",
    decorId: "",
    imageUrl: "",
  },
});
