"use client";
import { useEffect, useState } from "react";
import { SlideOne } from "./slideOne";
import { SlideTwo } from "./slideTwo";
import { useRecoilValue } from "recoil";
import { loadCount } from "@/store";

export const SlidesContainer = (): JSX.Element => {
  const slidesNumbers = ["one", "two"];
  const [slide, setSlide] = useState("one");

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (slide === "one") {
        setSlide("two");
      }
      if (slide === "two") {
        setSlide("one");
      }
    }, 1000 * 13);

    return () => clearInterval(intervalId);
  }, [slide]);

  return slide === "one" ? (
    <div className="relative w-screen h-screen ">
      <div className="slideOne absolute top-0 left-0">
        <SlideOne />
      </div>
    </div>
  ) : (
    <div className="relative w-screen h-screen ">
      <div className="slideOne absolute top-0 left-0">
        <SlideTwo />
      </div>
    </div>
  );
};
