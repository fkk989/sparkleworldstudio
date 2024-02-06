"use client";
import { useGetServiceById } from "@/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Projects({ params }: { params: { id: string } }) {
  const navigate = useRouter();
  const { serviceData } = useGetServiceById(params.id);
  return (
    <div className=" w-screen h-screen grid grid-cols-12 ">
      {/* image div */}
      <div className=" col-span-12 tab:col-span-8   flex justify-center items-center mt-[80px] tab:mt-[50px]">
        <div className="w-[90%] h-[85%] bg-[#F4F3F4] flex justify-center items-center">
          {serviceData &&
            serviceData?.service &&
            serviceData?.service.imageUrl && (
              <Image
                src={serviceData.service.imageUrl}
                alt=""
                width={500}
                height={600}
                className="w-[100%] h-[100%]"
              />
            )}
        </div>
      </div>
      {/* info div */}
      <div className="col-span-12 tab:col-span-4 flex flex-col justify-center    tab:mt-[90px]  p-5">
        {/* title */}
        <h1 className="text-[20px]  mobile:text-[40px] font-[999]">
          {serviceData?.service?.title}
        </h1>
        {/* inof */}
        <p className="pr-[10px]">{serviceData?.service?.info}</p>

        {/* horizontal line */}
        <div className="w-[100%] h-[1px] bg-[#23252d] mt-[10px]"></div>
        <button
          onClick={() => {
            navigate.push("/services");
          }}
          className=" bg-[#23252d] hover:bg-[#3a3c46] w-[200px] h-[50px] rounded-lg text-white font-bold mt-[50px]"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
