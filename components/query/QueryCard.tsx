"use client";
import { Query } from "@prisma/client";
import { useState } from "react";
import { useDeleteQuery } from "@/hooks";
export const QueryCard: React.FC<Partial<Query>> = ({
  id,
  name,
  email,
  phone,
  message,
}) => {
  const { mutation } = useDeleteQuery();
  const [open, setOpen] = useState(false);
  return (
    <div className=" relative w-[400px] h-[400px] flex flex-col justify-start  bg-[rgba(0,0,0,0.65)] cardShadow rounded-md text-white p-[10px]">
      <div className="text-[20px] font-[600] ">From: {name}</div>
      <p className="mt-[20px]">{message}</p>
      <div className=" mt-[20px] gap-[20px]">
        <div>
          <span>Email: {email}</span>
        </div>
        <div>
          <span>Phone: {phone}</span>
        </div>
      </div>
      <div>
        <div>
          <button
            onClick={() => {
              setOpen(true);
            }}
            className=" absolute bottom-[10px] left-[50%] translate-x-[-50%] bg-red-500 hover:bg-red-400 text-white text-center w-[60px] h-[30px] font-bold mt-[20px] rounded-md"
          >
            Delete
          </button>
        </div>
        {open && (
          <div
            onClick={() => setOpen(false)}
            className=" bg-[#0000004f]  w-screen h-screen fixed top-0 right-0 flex justify-center items-center z-10 "
          >
            {/* card */}
            <div className="w-[300px] h-[200px] flex flex-col justify-center items-center bg-[#23252d] rounded-md ">
              <div className="text-white text-[20px] font-bold">
                Are you sure?
              </div>
              <button
                onClick={() => {
                  mutation.mutate(id!);
                }}
                className="bg-red-500 hover:bg-red-400 text-white text-center w-[60px] h-[30px] font-bold mt-[30px] rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
