"use client";
import { CardSkeleton } from "@/components";
import { useGetIdeaById, useGetProjectById, useGetProjects } from "@/hooks";
import { ProjectCardProps } from "@/store";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function DesignInfo({
  params,
}: {
  params: { id: string; id2: string };
}) {
  const navigate = useRouter();

  const { designIdea } = useGetIdeaById(params.id2);

  return (
    <div className=" w-screen h-screen grid grid-cols-12 ">
      {/* image div */}
      <div className=" col-span-12 tab:col-span-8   flex justify-center items-center mt-[80px] tab:mt-[50px]">
        <div className="w-[90%] h-[85%] bg-[#F4F3F4] flex justify-center items-center ideaImgShadow">
          {designIdea && (
            <Image
              src={designIdea.imageUrl}
              alt=""
              width={500}
              height={600}
              className="w-[100%] h-[100%]"
            />
          )}
        </div>
      </div>
      {/* info div */}
      <div className="col-span-12 tab:col-span-4 flex flex-col justify-center mt-[40px] tab:mt-[90px]  p-5">
        {/* title */}
        <h1 className="text-[30px]  mobile:text-[40px] font-[999]">
          {designIdea?.title}
        </h1>
        {/* inof */}
        <p className="pr-[10px]">{designIdea?.info}</p>

        {/* horizontal line */}
        <div className="w-[100%] h-[1px] bg-[#23252d] mt-[10px]"></div>
        <button
          onClick={() => {
            navigate.back();
          }}
          className=" bg-[#23252d] hover:bg-[#3a3c46] w-[200px] h-[50px] rounded-lg text-white font-bold mt-[50px]"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
