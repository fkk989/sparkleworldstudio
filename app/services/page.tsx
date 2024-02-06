"use client";

import { CardSkeleton, ServiceCard } from "@/components";
import { useGetServices } from "@/hooks";
import { Services } from "@/store";
import { useRouter } from "next/navigation";

export default function Services() {
  const navigate = useRouter();
  const { data } = useGetServices();
  return (
    <div className="flex flex-col">
      {/* top image container */}
      <div
        className=" fixed top-0 w-screen h-[50vh] bg-cover bg-no-repeat bg-center bg-[rgba(0,0,0,0.3)] bg-blend-multiply "
        style={{
          backgroundImage:
            "url('https://sparkle-world-studio-production.s3.ap-south-1.amazonaws.com/services.jpg')",
        }}
      ></div>
      {/* title */}
      <div className="mt-[40vh] z-[2] ml-[30px]">
        <h1 className="capitalize text-white text-[30px] font-[700] mobile:text-[50px]">
          our services
        </h1>
      </div>

      {/* Service card container */}
      <div className=" w-screen grid grid-cols-12 gap-[20px]  justify-items-center mt-[5vh] bg-white z-[5] pt-[30px] pb-[50px]">
        {data?.services.length === 0 && (
          <div className="col-span-12 h-screen flex justify-center items-start">
            <div className="text-[40px] uppercase font-bold">
              No services right now
            </div>
          </div>
        )}
        {data ? (
          data.services.map((serviceData: Services) => {
            return (
              <div
                key={serviceData.id}
                className=" col-span-12 mobile:col-span-6 tab:col-span-4 pc:col-span-3 "
              >
                <ServiceCard
                  id={serviceData.id!}
                  imageUrl={`${serviceData.imageUrl}`}
                  title={`${serviceData.title}`}
                  info={`${serviceData.info}`}
                  onClick={() => {
                    navigate.push(`/services/${serviceData.id}`);
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
