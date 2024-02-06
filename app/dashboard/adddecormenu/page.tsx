"use client";
import { AddDecorCard } from "@/components";
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
  // handling addding new deocr
  const { mutation } = useAddDecor();

  return (
    <div>
      <AddDecorCard
        title="Add Decor Menu"
        submit={(body) => {
          mutation.mutate(body);
        }}
      />
    </div>
  );
}
