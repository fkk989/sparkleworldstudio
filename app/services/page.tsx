"use client";

import { ServiceCard } from "@/components";
import { useGetServices } from "@/hooks";
import { Services } from "@/store";
import { useRouter } from "next/navigation";

export default function Services() {
  const navigate = useRouter();
  const { data } = useGetServices();

  return (
    <div className="w-screen flex flex-col items-center">
      <div className="w-screen flex justify-center items-end h-[20vh] uppercase text-[60px] font-[999]">
        our services
      </div>

      {/* projects card container */}
      <div className=" grid grid-cols-12 gap-[20px] justify-items-center  mt-[5vh] bg-white z-[5] pt-[30px]">
        {/* project card */}

        {data &&
          data.services.map((serviceData: Services) => {
            return (
              <div
                key={serviceData.id}
                className=" col-span-12 mobile:col-span-3"
                onClick={() => {
                  navigate.push(`/services/${serviceData.id}`);
                }}
              >
                <ServiceCard
                  imageUrl={`${serviceData.imageUrl}`}
                  title={`${serviceData.title}`}
                  info={`${serviceData.info}`}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}
