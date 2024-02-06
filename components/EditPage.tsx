"use client";

import { useState } from "react";

interface EditPageProp {
  id: string;
  children: React.ReactNode;
}

// imput style
const inputStyle = `w-[100%] h-[50px] outline-none bg-transparent border-b border-[#23252d] placeholder:text-[#23252d] mobile:w-[90%]`;

export const EditPage: React.FC<EditPageProp> = ({ id, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="">
      <div>
        <button
          onClick={() => {
            setOpen(true);
          }}
          className="bg-blue-500 hover:bg-blue-400 text-white text-center w-[60px] h-[30px] font-bold mt-[20px] rounded-md"
        >
          Edit
        </button>
      </div>
      {open && (
        <div className=" bg-[#0000004f]  w-screen h-screen fixed top-0 right-0 flex justify-center items-center z-[5] ">
          <div
            onClick={() => {
              setOpen(false);
            }}
            className=" bg-[#0000004f]  w-screen h-screen fixed top-0 right-0 flex justify-center items-center z-[10]"
          ></div>
          {/* render passed component */}
          {children}
        </div>
      )}
    </div>
  );
};
