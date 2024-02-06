"use client";

import { CardSkeleton, DecorMenuCard } from "@/components";
import { useGetDecor } from "@/hooks";
import { useGetProjects } from "@/hooks/project";
import { ProjectCardProps } from "@/store";
import { DecorMenu } from "@prisma/client";
import { useRouter } from "next/navigation";

// ://sparkleworldstudio.vercel.app
export default function DesignIdea() {
  const navigate = useRouter();

  const { decorData } = useGetDecor();

  return (
    <div className="flex flex-col">
      {/* top image container */}
      <div
        className=" fixed top-0 w-screen h-[50vh] bg-cover bg-no-repeat bg-center bg-[rgba(0,0,0,0.7)] bg-blend-multiply "
        style={{
          backgroundImage:
            "url('https://sparkle-world-studio-production.s3.ap-south-1.amazonaws.com/uploads/916617c6-1303-40b4-9982-b7e9995bb5b9.jpeg')",
        }}
      ></div>
      {/* title */}
      <div className="mt-[40vh] z-[2] ml-[30px]">
        <h1 className="capitalize text-white text-[30px] font-[700] mobile:text-[50px]">
          Design Ideas
        </h1>
      </div>
      {/* projects card container */}
      <div className=" grid grid-cols-12 gap-[20px] justify-items-center  mt-[5vh] bg-white z-[5] pt-[30px] pb-[50px]">
        {decorData?.length === 0 && (
          <div className="col-span-12 h-screen flex justify-center items-start">
            <div className="text-[40px] uppercase font-bold">
              No design right now
            </div>
          </div>
        )}
        {/* project card */}
        {decorData ? (
          decorData.map((decorData) => {
            return (
              <div
                key={decorData.id}
                className=" col-span-12 mobile:col-span-6 tab:col-span-4 pc:col-span-3 "
              >
                <DecorMenuCard
                  type="decor"
                  id={decorData.id}
                  imageUrl={`${decorData.imageUrl}`}
                  title={`${decorData.title}`}
                  onClick={() => {
                    navigate.push(`/idea/${decorData.type}`);
                  }}
                />
              </div>
            );
          })
        ) : (
          <>
            <div
              suppressHydrationWarning
              className=" col-span-12 mobile:col-span-6 tab:col-span-4 pc:col-span-3"
            >
              <CardSkeleton key={"1"} />
            </div>
            <div
              suppressHydrationWarning
              className=" col-span-12 mobile:col-span-6 tab:col-span-4 pc:col-span-3"
            >
              <CardSkeleton key={"2"} />
            </div>
            <div
              suppressHydrationWarning
              className=" col-span-12 mobile:col-span-6 tab:col-span-4 pc:col-span-3"
            >
              <CardSkeleton key={"3"} />
            </div>
            <div
              suppressHydrationWarning
              className=" col-span-12 mobile:col-span-6 tab:col-span-4 pc:col-span-3"
            >
              <CardSkeleton key={"3"} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
