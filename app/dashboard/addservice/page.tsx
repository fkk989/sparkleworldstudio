"use client";
import { useAddService, useUploadToAws } from "@/hooks";
import { Services } from "@/store";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// imput style
const inputStyle = `w-[100%] h-[50px] outline-none bg-transparent border-b border-[#23252d] placeholder:text-[#23252d] mobile:w-[90%]`;

export default function AddService() {
  const [title, setTitle] = useState("");
  const [info, setInfo] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const body: Services = {
    title,
    info,
    imageUrl,
  };

  const { mutate, data, isSuccess } = useUploadToAws();
  const { mutation, serviceData } = useAddService();
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
      <div className="w-screen  bg-[rgb(238,241,242)] flex flex-col justify-start items-center p-[30px] mobile:w-[700px] mobile:items-start mobile:gap-[50px]">
        <h1 className="capitalize text-black text-[25px] font-[999] bg-white w-[250px] h-[50px] flex justify-center items-center digonals-lines mobile:text-[42px] mobile:w-[350px] mobile:h-[100px]  ">
          add services
        </h1>
        <div
          typeof="contact"
          className=" w-[340px] gap-[30px] flex flex-col i max-mobile:mt-[20px] mobile:w-[100%] "
        >
          {/* title */}
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
            placeholder="Title"
            className={`${inputStyle}`}
          />
          {/* info */}
          <input
            onChange={(e) => {
              setInfo(e.target.value);
            }}
            type="text"
            placeholder="Info"
            className={`${inputStyle}`}
          />
          {/* imageUrl */}
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
              mutation.mutate(body);
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
