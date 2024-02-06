"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

// const subHeadingStyle = ` text-[25px] font-[600] uppercase`;
const imageStyle = `rounded-full w-[120px] h-[110px] `;
// const subContainerStyle = ``
// const paraStyle = ``;

interface ProcessObj {
  title: string;
  para: string;
  image: any;
}

const processObj: ProcessObj[] = [
  {
    title: "design",
    para: `Design is our passion! Our team of Top Interior Designers work
        with you to realize the home of your dreams. We work with
        different styles - Classical, Fusion, Modern, Industrial - to
        deliver a home you can be proud of.`,
    image: (
      <Image
        src={"/design.png"}
        alt=""
        width={200}
        height={200}
        className={`${imageStyle}`}
      />
    ),
  },
  {
    title: "execution",
    para: `We build and execute home interiors to perfection. From fabulous false ceilings, glamorous kitchens, stunning wardrobes to luxurious sofas. Our team of craftsmen and supervisors transform dreams into reality.`,
    image: (
      <Image
        src={"/execution.png"}
        alt=""
        width={200}
        height={200}
        className={`${imageStyle}`}
      />
    ),
  },
  {
    title: "visualisation",
    para: `Imagine you home before you even step in! We create stunning interior concepts in 3D, using advanced technologies to give you a realist feel of what your completed home would look like.`,
    image: (
      <Image
        src={"/visualisation.png"}
        alt=""
        width={200}
        height={200}
        className={`${imageStyle}`}
      />
    ),
  },
  {
    title: "onsite supervision",
    para: `Our talented team of Civil Engineer and Site Supervisors ensure that your Home Interiors are a hassle free and pleasant experience.`,
    image: (
      <Image
        src={"/supervision.png"}
        alt=""
        width={200}
        height={200}
        className={`${imageStyle}`}
      />
    ),
  },
  {
    title: "quality",
    para: `We take quality seriously, so seriously that we only use the finest materials and finishes in all our interior projects. The name “SPARKLE WORLD STUDIO” stands for Quality & Perfection.`,
    image: (
      <Image
        src={"/quality.png"}
        alt=""
        width={200}
        height={200}
        className={`${imageStyle}`}
      />
    ),
  },
];

let count = 0;
export default function Process() {
  return (
    <div className="flex flex-col gap-[20px]">
      {/* top image container */}
      <div
        className=" fixed top-0 w-screen h-[50vh] bg-cover bg-no-repeat bg-center bg-[rgba(0,0,0,0.3)] bg-blend-multiply "
        style={{
          backgroundImage:
            "url('https://sparkle-world-studio-production.s3.ap-south-1.amazonaws.com/process2.jpg')",
        }}
      ></div>
      {/* title */}
      <div className="mt-[40vh] z-[2] ml-[30px]">
        <h1 className="capitalize text-white text-[30px] font-[700] mobile:text-[50px]">
          process
        </h1>
      </div>

      <div className=" w-screen flex  flex-col-reverse tab:grid grid-cols-12   justify-items-center mt-[5vh] bg-white z-[5] pt-[30px]">
        {/* process div */}
        <div className=" col-span-12  tab:col-span-7 w-[100%] h-[100%] flex flex-col  items-center gap-[30px] p-5 ">
          <h1 className="text-center text-[30px] font-[600]">STEPS INVOLVES</h1>
          <p className="text-[18px]">
            Home is the place where our heart actually lies. No matter where we
            are, we all wish to come back to a beautiful house where we can
            relax. Our home reflects our personality and our innermost desires.
            If you want to get your house designed in the best possible way,
            then you must look for a reputed interior designer. Being one of the
            Best Interior Designers, we offer excellent design plans to our
            customers. Our plans reflect creativity and innovation. We are also
            known for our advanced usage of technology to deliver fabulous homes
            for our clients.
          </p>
          <div className="flex flex-col items-center  gap-[40px]">
            {processObj.map((obj) => {
              return (
                <div
                  key={count++}
                  className="flex flex-col items-center gap-[10px]"
                >
                  <div className="">{obj.image}</div>
                  <div className="text-[30px] font-[600]">{obj.title}</div>
                  <div className="text-center text-[18px]">{obj.para}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div className=" col-span-12 tab:col-span-5 flex justify-center items-start">
          <Image
            src={
              "https://sparkle-world-studio-production.s3.ap-south-1.amazonaws.com/processimg.png"
            }
            alt=""
            width={500}
            height={500}
            className="w-[600px] h-[700px] sticky top-[150px] "
          />
        </div>
      </div>
    </div>
  );
}
