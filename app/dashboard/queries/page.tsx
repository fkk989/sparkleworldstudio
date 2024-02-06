"use client";
import { QueryCard } from "@/components";
import { useGetQuries } from "@/hooks";
import { Query } from "@prisma/client";

export default function Queries() {
  const { queryData } = useGetQuries();

  return (
    <div className="w-screen h-screen grid grid-cols-12 gap-[20px] justify-items-center  mt-[5vh] bg-white z-[5] pt-[100px]">
      {queryData &&
        queryData.queries.map((query: Query) => {
          return (
            <div
              key={query.id}
              className=" col-span-12 mobile:col-span-6 tab:col-span-4 pc:col-span-3 rounded-md  "
            >
              <QueryCard
                id={query.id}
                name={query.name}
                email={query.email}
                phone={query.phone}
                message={query.message}
              />
            </div>
          );
        })}
    </div>
  );
}
