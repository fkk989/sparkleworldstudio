"use client";

import { useSendQuery } from "@/hooks";
import { useState } from "react";

// input style
const inputStyle = `w-[100%] h-[50px] outline-none bg-transparent border-b border-[#23252d] placeholder:text-[#23252d] mobile:w-[90%]`;

export const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const queryBody = {
    name,
    email,
    phone,
    message,
  };

  const { mutation } = useSendQuery();

  return (
    <div>
      {/*  Form started*/}
      <div className="w-screen   bg-[rgb(238,241,242)] flex flex-col justify-start items-center p-[30px] mobile:w-[700px] mobile:items-start mobile:gap-[50px]">
        <h1 className="capitalize text-black text-[25px] font-[999] bg-white w-[250px] h-[50px] flex justify-center items-center digonals-lines mobile:text-[42px] mobile:w-[350px] mobile:h-[100px]  ">
          contact from
        </h1>
        <div
          typeof="contact"
          className=" w-[340px] gap-[30px] flex flex-col items-center max-mobile:mt-[20px] mobile:w-[100%] mobile:items-start"
        >
          <input
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="text"
            placeholder="Name"
            className={`${inputStyle}`}
            value={name}
          />
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="text"
            placeholder="Email"
            className={`${inputStyle}`}
            value={email}
          />
          <input
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            type="number"
            placeholder="Phone"
            className={`${inputStyle}`}
            value={phone}
          />
          <input
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            type="text"
            placeholder="Message"
            className={`${inputStyle}`}
            value={message}
          />

          {/* submit button */}
          <div className="w-[100%] flex justify-end items-center mobile:w-[90%]">
            <button
              onClick={() => {
                mutation.mutate(queryBody);
              }}
              className="w-[80px] h-[40px] bg-[#d7b39a] text-[11px] font-[600] tracking-[3px] uppercase"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      {/* form end */}
    </div>
  );
};
