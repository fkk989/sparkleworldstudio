"use client";
import { useEffect, useRef } from "react";
import {
  SlidesElementsProps,
  resizeImageOnClick,
  slidesAnimation,
} from "@/store";
import { gsap } from "gsap";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

// word style and para style
const animatedWordStyle = `fixed top-[50%] left-[50%] translate-x-[-50%] font-[999] text-[60px] mobile:text-[150px] uppercase tracking-[5px] `;
const paraStyle = `fixed  top-[60%] mobile:top-[70%] left-[50%] w-[360px] mobile:w-[800px] text-[20px] translate-x-[-50%] text-center font-bold tracking-[0]`;

export const SlideTwo = () => {
  const mainDiv = useRef<HTMLDivElement>(null);
  const sketchSlide = useRef<HTMLDivElement>(null);
  const imageSlide = useRef<HTMLDivElement>(null);
  const sketchContent = useRef<HTMLDivElement[]>([]);
  const imageContent = useRef<HTMLDivElement[]>([]);
  const resizerDiv = useRef<HTMLDivElement>(null);

  const pushIntoSketchContent = (e: HTMLDivElement) => {
    sketchContent.current.push(e);
  };
  const pushIntoImageContent = (e: HTMLDivElement) => {
    imageContent.current.push(e);
  };

  useEffect(() => {
    const slidesElementObj: SlidesElementsProps = {
      mainDiv: mainDiv.current!,
      sketchSlide: sketchSlide.current!,
      imageSlide: imageSlide.current!,
      sketchContent: sketchContent.current,
      imageContent: imageContent.current,
      resizerDiv: resizerDiv.current!,
    };
    let ctx = gsap.context(() => {
      slidesAnimation(slidesElementObj);
    });
    mainDiv.current!.addEventListener("click", (e) => {
      resizeImageOnClick(
        imageSlide.current!,
        resizerDiv.current!,
        e.clientY,
        e.clientX
      );
    });

    return () => ctx.revert(); // <-- CLEANUP!
  }, []);

  return (
    <div
      ref={mainDiv}
      className="relative top-0 left-0 w-screen h-screen translate-x-0 "
    >
      {/* resizer */}
      <div
        ref={resizerDiv}
        className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[50px] h-[50px] bg-[#23252d] flex justify-center items-center z-10"
      >
        <span>
          <ChevronLeftIcon className="w-[30px] h-[30px] text-white" />
        </span>
        <span>
          <ChevronRightIcon className="w-[30px] h-[30px] text-white" />
        </span>
      </div>
      {/* blackAnimated word */}
      <div
        ref={pushIntoSketchContent}
        className={`${animatedWordStyle} text-[#23252d] z-[2] `}
      >
        unique
      </div>
      <div ref={pushIntoSketchContent} className={`${paraStyle}  z-[2]`}>
        Right design and right ideas matter a lot of in interior design
        business. a style that makes a statement.
      </div>

      {/* sketch slide */}
      <div
        ref={sketchSlide}
        className="fixed top-0 w-screen h-screen bg-cover bg-no-repeat bg-right"
        style={{
          backgroundImage:
            "url('https://sparkel-world-studio.s3.ap-south-1.amazonaws.com/slide1sk.jpeg')",
        }}
      ></div>
      {/* image slide */}
      <div
        ref={imageSlide}
        className="fixed top-0 right-0 w-[50%] h-screen bg-cover bg-no-repeat bg-right z-[4]"
        style={{
          backgroundImage:
            "url('https://sparkel-world-studio.s3.ap-south-1.amazonaws.com/slide1.jpeg')",
          clipPath: "inset(0 0 0 0)",
        }}
      >
        {/* white animated word */}
        <div
          ref={pushIntoImageContent}
          className={`${animatedWordStyle}   text-white `}
          style={{
            WebkitTextStroke: "2px #23252d ",
          }}
        >
          unique
        </div>
        <div ref={pushIntoImageContent} className={`${paraStyle} text-white `}>
          Right design and right ideas matter a lot of in interior design
          business. a style that makes a statement.
        </div>
      </div>
    </div>
  );
};
