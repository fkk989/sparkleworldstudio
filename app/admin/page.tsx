"use client";
import { useEffect, useState } from "react";
import { isAdmin } from "@/store";
import { useSetRecoilState } from "recoil";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAdminLogin } from "@/hooks";

// imput style
const inputStyle = `w-[100%] h-[50px] outline-none bg-transparent border-b border-[#23252d] placeholder:text-[#23252d] mobile:w-[90%]`;

export default function Admin() {
  const navigate = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setAdmin = useSetRecoilState(isAdmin);
  const body = {
    email,
    password,
  };
  // fetching  admin
  const { refetch, error, isError, isSuccess, data } = useAdminLogin(body);

  useEffect(() => {
    if (isSuccess) {
      toast.success("successfully loged in", {
        id: "admin-login",
      });
      setAdmin({ isAdmin: true });
      navigate.push("/dashboard/addadmin");
    }

    if (isError) {
      // @ts-ignore
      const message = error.response.data.message;
      toast.error(message ? message : "error", {
        id: "admin-login",
      });
    }
  });
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      {/*  Form started*/}
      <div className="w-screen   bg-[rgb(238,241,242)] flex flex-col justify-start items-center p-[30px] mobile:w-[700px] mobile:items-start mobile:gap-[50px]">
        <h1 className="capitalize text-black text-[25px] font-[999] bg-white w-[250px] h-[50px] flex justify-center items-center digonals-lines mobile:text-[42px] mobile:w-[350px] mobile:h-[100px]  ">
          Admin Login
        </h1>
        <div
          typeof="contact"
          className=" w-[340px] gap-[30px] flex flex-col items-center max-mobile:mt-[20px] mobile:w-[100%] mobile:items-start"
        >
          <input
            type="email"
            placeholder="email"
            className={`${inputStyle}`}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="password"
            className={`${inputStyle}`}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          {/* submit button */}
          <div
            onClick={() => {
              refetch();
            }}
            className="w-[100%] flex justify-end items-center mobile:w-[90%]"
          >
            <button className="w-[80px] h-[40px] bg-[#d7b39a] hover:bg-[#ac7a56] text-[11px] font-[600] tracking-[3px] uppercase">
              Submit
            </button>
          </div>
        </div>
      </div>
      {/* form end */}
    </div>
  );
}
