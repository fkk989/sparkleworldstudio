"use client";
import { useGetDecor, useUploadToAws } from "@/hooks";
import { designAtom } from "@/store";
import { PhotoIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";

interface AddIdeaCardProp {
  title: string;
  submit: (body: object) => void;
}

// imput style
const inputStyle = `w-[100%] h-[50px] outline-none bg-transparent border-b border-[#23252d] placeholder:text-[#23252d] mobile:w-[90%]`;

export const AddIdeaCard: React.FC<AddIdeaCardProp> = ({ title, submit }) => {
  const [idea, setIdea] = useRecoilState(designAtom);

  // checkbox refs
  const checkbox = useRef<HTMLInputElement[]>([]);

  const pushToCheckbox = (e: HTMLInputElement) => {
    checkbox.current.push(e);
  };

  const selectOnlyCheckBox = (checkedInput: HTMLInputElement) => {
    checkbox.current &&
      checkbox.current.map((checkbox) => {
        if (checkbox) {
          checkbox.checked = false;
        }
      });
    checkedInput.checked = true;
  };

  // handling addding new deocr
  const { decorData } = useGetDecor();

  const { mutate, data, isSuccess } = useUploadToAws();

  useEffect(() => {
    if (isSuccess) {
      const url = new URL(data.url);
      const imagePath = `${url.origin}${url.pathname}`;
      setIdea({ ...idea, imageUrl: imagePath });
    }
  }, [isSuccess]);

  const handleImgInput = async () => {
    const imgInput = document.createElement("input");
    imgInput.setAttribute("type", "file"),
      imgInput.setAttribute("accept", "image/*");
    imgInput.addEventListener("change", () => {
      mutate(imgInput);
    });
    imgInput.click();
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      {/*  Form started*/}
      <div className="w-screen  bg-[rgb(238,241,242)] flex flex-col justify-start items-center p-[30px] mobile:w-[700px] mobile:items-start mobile:gap-[50px] overflow-scroll">
        <h1 className="capitalize text-black text-[25px] font-[999] bg-white w-[250px] h-[50px] flex justify-center items-center digonals-lines mobile:text-[42px] mobile:w-[350px] mobile:h-[100px]  ">
          {title}
        </h1>
        <div
          typeof="contact"
          className=" w-[340px] gap-[30px] flex flex-col  max-mobile:mt-[20px] mobile:w-[100%] "
        >
          <div>
            {idea.imageUrl.length !== 0 && (
              <Image src={idea.imageUrl} alt="" width={200} height={200} />
            )}
          </div>
          {/* title */}
          <input
            onChange={(e) => {
              setIdea({ ...idea, title: e.target.value });
            }}
            type="text"
            placeholder="Title"
            className={`${inputStyle}`}
          />
          {/* info */}
          <input
            onChange={(e) => {
              setIdea({ ...idea, info: e.target.value });
            }}
            type="text"
            placeholder="Info"
            className={`${inputStyle}`}
          />

          <div className="flex  flex-wrap items-center gap-[5px]">
            <div>type:</div>

            {decorData?.map((decorData) => {
              return (
                <div key={decorData.id}>
                  <input
                    ref={(e) => {
                      pushToCheckbox(e!);
                    }}
                    onClick={(e) => {
                      setIdea({ ...idea, decorId: decorData.id });
                      selectOnlyCheckBox(e.currentTarget);
                    }}
                    type="checkbox"
                    name={decorData.type}
                    value={decorData.type}
                  />
                  <label> {decorData.type}</label>
                </div>
              );
            })}
          </div>
          {/* image input */}
          <button
            onClick={() => {
              handleImgInput();
            }}
          >
            <PhotoIcon className="w-[30px] h-[30px] text-slate-400 hover:text-slate-800" />
          </button>

          {/* submit button */}
          <div
            onClick={() => {
              submit(idea);
            }}
            className="w-[100%] flex justify-end items-center mobile:w-[90%]"
          >
            <button className="w-[80px] h-[40px] bg-[#d7b39a] text-[11px] font-[600] tracking-[3px] uppercase">
              Submit
            </button>
          </div>
        </div>
      </div>
      {/* form end */}
    </div>
  );
};
