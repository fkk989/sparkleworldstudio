"use client";
import { useAddDecor, useUploadToAws } from "@/hooks";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { DecorMenu } from "@prisma/client";
import { createKey } from "next/dist/shared/lib/router/router";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// imput style
const inputStyle = `w-[100%] h-[50px] outline-none bg-transparent border-b border-[#23252d] placeholder:text-[#23252d] mobile:w-[90%]`;

// title    String
// type     String
// imageUrl String
export default function AddDecorMenu() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [info, setInfo] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const decorBody: Partial<DecorMenu> = {
    title,
    type,
    imageUrl,
    info,
  };

  // handling addding new deocr
  const { mutation } = useAddDecor();
  const { mutate, data, isSuccess } = useUploadToAws();

  useEffect(() => {
    if (isSuccess) {
      const url = new URL(data.url);
      const imagePath = `${url.origin}${url.pathname}`;
      setImageUrl(imagePath);
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
      {/* contact Form started*/}
      <div className="w-screen  bg-[rgb(238,241,242)] flex flex-col justify-start items-center p-[30px] mobile:w-[700px] mobile:items-start mobile:gap-[50px] overflow-scroll">
        <h1 className="capitalize text-black text-[25px] font-[999] bg-white w-[250px] h-[50px] flex justify-center items-center digonals-lines mobile:text-[42px] mobile:w-[350px] mobile:h-[100px]  ">
          add new deocor
        </h1>
        <div
          typeof="contact"
          className=" w-[340px] gap-[30px] flex flex-col  max-mobile:mt-[20px] mobile:w-[100%] "
        >
          <div>
            {imageUrl && (
              <Image src={imageUrl} alt="" width={200} height={200} />
            )}
          </div>
          {/* title */}
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
            placeholder="Title"
            className={`${inputStyle}`}
          />

          <input
            onChange={(e) => {
              setType(e.target.value);
            }}
            type="text"
            placeholder="Type"
            className={`${inputStyle}`}
          />

          <input
            onChange={(e) => {
              setInfo(e.target.value);
            }}
            type="text"
            placeholder="Info"
            className={`${inputStyle}`}
          />

          <div className="flex  flex-wrap items-center gap-[5px]"></div>
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
              mutation.mutate(decorBody);
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
}
