"use client";
import { Project } from "@/store";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { PhotoIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useAddAdmin, useAddProject, useUploadToAws } from "@/hooks";

// imput style
const inputStyle = `w-[100%] h-[50px] outline-none bg-transparent border-b border-[#23252d] placeholder:text-[#23252d] mobile:w-[90%]`;

export default function AddProject() {
  const [title, setTitle] = useState("");
  const [clientName, setClientName] = useState("");
  const [info, setInfo] = useState("");
  const [landArea, setLandArea] = useState("");
  const [budget, setBudget] = useState("");
  const [architect, setArchitect] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const body: Project = {
    title,
    clientName,
    info,
    landArea,
    budget,
    architect,
    imageUrl,
  };

  const { mutate, data, isSuccess } = useUploadToAws();
  const { mutation, projectData } = useAddProject();

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
    <div className="w-screen h-[150vh] mobile:h-screen flex justify-center items-center">
      {/* contact Form started*/}
      <div className="w-screen h-[100vh] mobile:h-[80vh]  bg-[rgb(238,241,242)] flex flex-col justify-start items-center p-[5px] mobile:p-[30px] mobile:w-[700px] mobile:items-start mobile:gap-[50px]">
        <h1 className="capitalize text-black text-[25px] font-[999] bg-white w-[250px] h-[50px] flex justify-center items-center digonals-lines mobile:text-[42px] mobile:w-[350px] mobile:h-[100px]  ">
          add project
        </h1>
        <div
          typeof="contact"
          className=" w-[340px] gap-[30px] flex flex-col items-start max-mobile:mt-[10px] mobile:w-[100%] "
        >
          {/* title */}
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
            placeholder="title"
            className={`${inputStyle}`}
          />
          {/* clientName */}
          <input
            onChange={(e) => {
              setClientName(e.target.value);
            }}
            type="text"
            placeholder="Client Name"
            className={`${inputStyle}`}
          />
          {/* info */}
          <input
            onChange={(e) => {
              setInfo(e.target.value);
            }}
            type="text"
            placeholder="info"
            className={`${inputStyle}`}
          />
          {/* landArea */}
          <input
            onChange={(e) => {
              setLandArea(e.target.value);
            }}
            type="text"
            placeholder="Land Area"
            className={`${inputStyle}`}
          />
          {/* budget */}
          <input
            onChange={(e) => {
              setBudget(e.target.value);
            }}
            type="text"
            placeholder="Budget"
            className={`${inputStyle}`}
          />
          {/* architect */}
          <input
            onChange={(e) => {
              setArchitect(e.target.value);
            }}
            type="text"
            placeholder="Architect"
            className={`${inputStyle}`}
          />
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
