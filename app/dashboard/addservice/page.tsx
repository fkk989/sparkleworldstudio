"use client";
import { Services } from "@/store";
import { useState } from "react";
import toast from "react-hot-toast";

// imput style
const inputStyle = `w-[100%] h-[50px] outline-none bg-transparent border-b border-[#23252d] placeholder:text-[#23252d] mobile:w-[90%]`;

export default function AddAdmin() {
  const [title, setTitle] = useState("");
  const [info, setInfo] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const body: Services = {
    title,
    info,
    imageUrl,
  };
  const hanldeAddService = async () => {
    try {
      toast.loading("adding services", { id: "adding-services" });
      const res = await fetch(
        "http://localhost:3000/api/services/addservices",
        {
          method: "POST",
          body: JSON.stringify(body),
        }
      );

      const data = await res.json();

      if (!data.success) {
        return toast.error(data.message, { id: "adding-services" });
      }
      toast.success("added successfully", { id: "adding-services" });
    } catch (error) {
      toast.error("error adding services", { id: "adding-services" });
    }
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
          className=" w-[340px] gap-[30px] flex flex-col items-center max-mobile:mt-[20px] mobile:w-[100%] mobile:items-start"
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
          <input
            onChange={(e) => {
              setImageUrl(e.target.value);
            }}
            type="text"
            placeholder="Image"
            className={`${inputStyle}`}
          />

          {/* submit button */}
          <div
            onClick={() => {
              hanldeAddService();
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
