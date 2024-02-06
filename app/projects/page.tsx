"use client";

import { ProjectCard } from "@/components/projects/ProjectCard";
import { CardSkeleton } from "@/components/skeletons/CardSkeleton";
import { useGetProjects } from "@/hooks/project";
import { ProjectCardProps } from "@/store";
import { useRouter } from "next/navigation";

// ://sparkleworldstudio.vercel.app
export default function Projects() {
  const navigate = useRouter();

  const { projectData } = useGetProjects();

  return (
    <div className="flex flex-col">
      {/* top image container */}

      <div
        className=" fixed top-0 w-screen h-[50vh] bg-cover bg-no-repeat bg-center bg-[rgba(0,0,0,0.5)] bg-blend-multiply "
        style={{
          backgroundImage:
            "url('https://sparkle-world-studio-production.s3.ap-south-1.amazonaws.com/pexels-binyamin-mellish-1396132.jpg')",
        }}
      ></div>
      {/* title */}
      <div className="mt-[40vh] z-[2] ml-[30px]">
        <h1 className="capitalize text-white text-[30px] font-[700] mobile:text-[50px]">
          our projects
        </h1>
      </div>
      {/* projects card container */}
      <div className=" w-screen grid grid-cols-12 gap-[20px]  justify-items-center mt-[5vh] bg-white z-[5] pt-[30px] pb-[50px]">
        {projectData?.projects?.length === 0 && (
          <div className="col-span-12 h-screen flex justify-center items-start">
            <div className="text-[40px] uppercase font-bold">
              No projects right now
            </div>
          </div>
        )}
        {/* project card */}
        {projectData?.projects ? (
          projectData.projects.map((projectData: ProjectCardProps) => {
            return (
              <div
                key={projectData.id}
                className=" col-span-12 mobile:col-span-6 tab:col-span-4 pc:col-span-3 "
              >
                <ProjectCard
                  id={projectData.id}
                  imageUrl={`${projectData.imageUrl}`}
                  title={`${projectData.title}`}
                  info={`${projectData.info}`}
                  onClick={() => {
                    navigate.push(`/projects/${projectData.id}`);
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
