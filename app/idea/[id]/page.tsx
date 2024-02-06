"use client";
import { CardSkeleton, DecorMenuCard } from "@/components";
import { useGetIdea } from "@/hooks";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export default function Ideas({ params }: { params: { id: string } }) {
  const navigate = useRouter();
  const { designIdeas } = useGetIdea(params.id);

  return (
    <div className="flex flex-col">
      {/* top image container */}
      <div
        className=" fixed top-0 w-screen h-[50vh] bg-cover bg-no-repeat bg-center bg-[rgba(0,0,0,0.7)] bg-blend-multiply "
        style={{
          backgroundImage: `url("${
            designIdeas && designIdeas[0] && designIdeas[0].imageUrl
          }")`,
        }}
      ></div>
      {/* title */}
      <div className="mt-[40vh] z-[2] ml-[30px]">
        <h1 className="capitalize text-white text-[30px] font-[700] mobile:text-[50px]">
          {params.id.split("_")[0]} {params.id.split("_")[1]}
        </h1>
      </div>
      {/* projects card container */}
      <div className=" grid grid-cols-12 gap-[20px] justify-items-center  mt-[5vh] bg-white z-[5] pt-[30px] pb-[50px]">
        {designIdeas?.length === 0 && (
          <div className="col-span-12 h-screen flex justify-center items-start">
            <div className="text-[40px] uppercase font-bold">
              No designs right now
            </div>
          </div>
        )}
        {/* project card */}
        {designIdeas ? (
          designIdeas?.map((designIdeas) => {
            return (
              <div
                key={designIdeas.id}
                className=" col-span-12 mobile:col-span-6 tab:col-span-4 pc:col-span-3  "
              >
                <DecorMenuCard
                  type="idea"
                  id={designIdeas.id}
                  imageUrl={`${designIdeas.imageUrl}`}
                  title={`${designIdeas.title}`}
                  info={designIdeas.info}
                  onClick={() => {
                    navigate.push(`/idea/${params.id}/${designIdeas.id}`);
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
