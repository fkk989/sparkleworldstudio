"use client";
import { Admin } from "@/store";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

// imput style
const inputStyle = `w-[100%] h-[50px] outline-none bg-transparent border-b border-[#23252d] placeholder:text-[#23252d] mobile:w-[90%]`;

export default function AddAdmin() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const body: Admin = {
    email,
    name,
    password,
  };
  const handleAddAdmin = async () => {
    try {
      toast.loading("Creating Admin", { id: "creating-admin" });

      const res = await fetch("http://localhost:3000/api/admin/addadmin", {
        method: "POST",
        body: JSON.stringify(body),
      });

      const data = await res.json();

      // if login failed
      if (!data.success) {
        toast.error(data.message, { id: "creating-admin" });
      }
      // if login success
      toast.success(data.message, { id: "creating-admin" });
    } catch (error) {
      toast.error("error while creating", { id: "creating-admin" });
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      {/* contact Form started*/}
      <div className="w-screen  bg-[rgb(238,241,242)] flex flex-col justify-start items-center p-[30px] mobile:w-[700px] mobile:items-start mobile:gap-[50px]">
        <h1 className="capitalize text-black text-[25px] font-[999] bg-white w-[250px] h-[50px] flex justify-center items-center digonals-lines mobile:text-[42px] mobile:w-[350px] mobile:h-[100px]  ">
          add admin
        </h1>
        <div
          typeof="contact"
          className=" w-[340px] gap-[30px] flex flex-col items-center max-mobile:mt-[20px] mobile:w-[100%] mobile:items-start"
        >
          {/* email */}
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="text"
            placeholder="Email"
            className={`${inputStyle}`}
          />
          {/* name */}
          <input
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="text"
            placeholder="Name"
            className={`${inputStyle}`}
          />
          {/* password */}
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="text"
            placeholder="Password"
            className={`${inputStyle}`}
          />

          {/* submit button */}
          <div
            onClick={() => {
              handleAddAdmin();
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
