"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { loadingAnimation } from "@/store";

export const Loader = () => {
  const [display, setDisplay] = useState(true);
  const loader = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      loader.current && loadingAnimation(loader.current);
    });

    // display none to loader after 2 sec
    setTimeout(() => {
      setDisplay(false);
    }, 2000);

    return () => ctx.revert(); // <-- CLEANUP!
  }, []);

  return (
    <div className="fixed top-0 z-20">
      <div
        ref={loader}
        className={`${
          display ? "block" : "hidden"
        } z-20  relative  w-screen h-screen flex flex-col justify-center items-center bg-[#18191e]  animate-bgDisappear  text-white font-[verdana] text-[200px] font-bold tracking-[10px]`}
      >
        <Image
          src={
            "https://sparkel-world-studio.s3.ap-south-1.amazonaws.com/sws.png"
          }
          width={500}
          height={500}
          alt="logo"
        />
        <div className=" absolute w-[300px] h-[300px] border-l border-t rounded-full   animate-spin"></div>
      </div>
    </div>
  );
};
