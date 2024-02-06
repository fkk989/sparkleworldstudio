"use client";
import { CardSkeleton } from "@/components";
import { useGetProjectById, useGetProjects } from "@/hooks";
import { ProjectCardProps } from "@/store";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ProjectInfo({ params }: { params: { id: string } }) {
  const navigate = useRouter();
  const body = {
    id: params.id,
  };
  const { projectData } = useGetProjectById(body);

  return (
    <div className=" w-screen h-screen grid grid-cols-12 ">
      {/* image div */}
      <div className=" col-span-12 tab:col-span-8   flex justify-center items-center mt-[80px] tab:mt-[50px]">
        <div className="w-[90%] h-[85%] bg-[#F4F3F4] flex justify-center items-center">
          {projectData && projectData.project && (
            <Image
              src={projectData.project?.imageUrl}
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
          {projectData?.project?.title}
        </h1>
        {/* inof */}
        <p className="pr-[10px]">{projectData?.project?.info}</p>
        {/* landArea */}
        <p className=" mt-[30px]">
          The Total Land Area is {projectData?.project?.landArea} Sq. Ft.
        </p>

        {/* client name  */}
        <h3 className="mt-[50px] font-[999] text-[25px]">Client</h3>
        <p>Residential Project of {projectData?.project?.clientName}</p>

        {/* horizontal line */}
        <div className="w-[100%] h-[1px] bg-[#23252d] mt-[10px]"></div>

        {/* budget */}
        <h3 className="mt-[50px] font-[999] text-[25px]">Budget</h3>
        <p>{projectData?.project?.budget}</p>

        {/* horizontal line */}
        <div className="w-[100%] h-[1px] bg-[#23252d] mt-[10px]"></div>
        <h3 className="mt-[50px] font-[999] text-[25px]">Architect</h3>
        <p>{projectData?.project?.architect}</p>

        {/* horizontal line */}
        <div className="w-[100%] h-[1px] bg-[#23252d] mt-[10px]"></div>
        <button
          onClick={() => {
            navigate.push("/projects");
          }}
          className=" bg-[#23252d] hover:bg-[#3a3c46] w-[200px] h-[50px] rounded-lg text-white font-bold mt-[50px]"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
