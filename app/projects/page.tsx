"use client";
import { ProjectCard } from "@/components";
import { ProjectCardProps, handleDropdwon } from "@/store";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Projects() {
  const [data, setData] = useState<ProjectCardProps[]>([]);
  const navigate = useRouter();
  const handleFetchProjects = async () => {
    try {
      const res = await axios.get(
        "https://sparkleworldstudio.vercel.app/api/projects/getprojects"
      );

      const resData = res.data.projects;
      console.log(resData);
      setData(resData);
      setTimeout(() => {
        console.log(data);
      }, 2000);
    } catch (e: any) {
      return toast.error(e.message);
    }
  };

  useEffect(() => {
    handleFetchProjects();
    console.log(data);
  }, []);
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
        {data.map((projectData) => {
          return (
            <div
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
