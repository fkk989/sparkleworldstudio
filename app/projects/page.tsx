"use client";
export const dynamic = "force-dynamic";
import { ProjectCard } from "@/components";
import { useGetProjects } from "@/hooks/project";
import { ProjectCardProps } from "@/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// ://sparkleworldstudio.vercel.app
export default function Projects() {
  const navigate = useRouter();

  const { projectData, isSuccess } = useGetProjects();
  useEffect(() => {
    if (isSuccess) {
      console.log(projectData.projects);
    }
  }, [isSuccess]);
  return (
    <div className="flex flex-col">
      {/* top image container */}
      <div
        className=" fixed top-0 w-screen h-[50vh] bg-cover bg-no-repeat bg-center bg-[rgba(0,0,0,0.7)] bg-blend-multiply "
        style={{
          backgroundImage:
            "url('https://easynirman.com/assets/images/banner/ourprojectbanner.jpg')",
        }}
      ></div>
      {/* title */}
      <div className="mt-[40vh] z-[2] ml-[30px]">
        <h1 className="capitalize text-white text-[30px] font-[700] mobile:text-[50px]">
          our projects
        </h1>
      </div>
      {/* projects card container */}
      <div className=" grid grid-cols-12 gap-[20px] justify-items-center  mt-[5vh] bg-white z-[5] pt-[30px]">
        {/* project card */}
        {projectData &&
          projectData.projects.map((projectData: ProjectCardProps) => {
            return (
              <div
                key={projectData.id}
                className=" col-span-12 mobile:col-span-3"
                onClick={() => {
                  navigate.push(`/projects/${projectData.id}`);
                }}
              >
                <ProjectCard
                  imageUrl={`${projectData.imageUrl}`}
                  title={`${projectData.title}`}
                  info={`${projectData.info}`}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}
/*

    */
