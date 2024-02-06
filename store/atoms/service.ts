import { atom } from "recoil";
// const [title, setTitle] = useState("");
// const [info, setInfo] = useState("");
// const [imageUrl, setImageUrl] = useState("");

export const serviceAtom = atom({
  key: "serviceAtom", // unique ID (with respect to other atoms/selectors)
  default: {
    title: "",
    info: "",
    imageUrl: "",
  },
});
