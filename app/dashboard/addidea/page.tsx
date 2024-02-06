"use client";
import { AddIdeaCard } from "@/components";
import { useAddDecor, useAddIdea, useGetDecor, useUploadToAws } from "@/hooks";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { Idea } from "@prisma/client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// imput style
const inputStyle = `w-[100%] h-[50px] outline-none bg-transparent border-b border-[#23252d] placeholder:text-[#23252d] mobile:w-[90%]`;

// title    String
// type     String
// imageUrl String
export default function AddIdea() {
  const { mutation } = useAddIdea();

  return (
    <div>
      <AddIdeaCard
        title={"Add Design Idea"}
        submit={(body) => {
          mutation.mutate(body);
        }}
      />
    </div>
  );
}
