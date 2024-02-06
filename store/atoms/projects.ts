import { atom } from "recoil";

export const projectAtom = atom({
  key: "projectAtom", // unique ID (with respect to other atoms/selectors)
  default: {
    title: "",
    clientName: "",
    info: "",
    landArea: "",
    budget: "",
    architect: "",
    imageUrl: "",
  },
});
