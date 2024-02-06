"use client";
import { projectAtom } from "@/store";
import { useEffect } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useGetProjectById, useUploadToAws } from "@/hooks";
import Image from "next/image";
import { useRecoilState, useResetRecoilState } from "recoil";
import { Project } from "@prisma/client";

// imput style
const inputStyle = `w-[100%] h-[50px] outline-none bg-transparent border-b border-[#23252d] placeholder:text-[#23252d] mobile:w-[90%]`;

interface AddProjectCard {
  cardTitle: string;
  submit: (projectbody: object) => void;
  id?: string;
}

export const AddProjectCard: React.FC<AddProjectCard> = ({
  cardTitle,
  submit,
  id,
}) => {
  const [project, setProject] = useRecoilState(projectAtom);
  const resetProject = useResetRecoilState(projectAtom);

  if (id) {
    const { projectData, refetch, isSuccess } = useGetProjectById({ id });

    useEffect(() => {
      refetch();
      if (projectData && projectData.project) {
        setProject({
          title: projectData.project.title,
          clientName: projectData.project.clientName,
          info: projectData.project.info,
          landArea: projectData.project.landArea,
          budget: projectData.project.budget,
          architect: projectData.project.architect,
          imageUrl: projectData.project.imageUrl,
        });
      }
      if (isSuccess) {
        resetProject();
      }
    }, [projectData, isSuccess]);
  }

  const { mutate, data, isSuccess } = useUploadToAws();

  useEffect(() => {
    if (isSuccess) {
      const url = new URL(data.url);
      const imagePath = `${url.origin}${url.pathname}`;
      setProject({ ...project, imageUrl: imagePath });
    }
  }, [isSuccess]);

  const handleImgInput = async () => {
    const imgInput = document.createElement("input");
    imgInput.setAttribute("type", "file"),
      imgInput.setAttribute("accept", "image/*");
    imgInput.addEventListener("change", () => {
      mutate(imgInput);
    });
    imgInput.click();
  };

  return (
    <div className="w-screen h-[150vh] mobile:h-screen flex justify-center items-center">
      {/*  Form started*/}
      <div className="w-screen h-[100vh] mobile:h-[80vh]  bg-[rgb(238,241,242)] flex flex-col justify-start items-center p-[5px] mobile:p-[30px] mobile:w-[700px] mobile:items-start mobile:gap-[50px] overflow-scroll  z-[10]">
        <h1 className="capitalize text-black text-[25px] font-[999] bg-white w-[250px] h-[50px] flex justify-center items-center digonals-lines mobile:text-[42px] mobile:w-[350px] mobile:h-[100px]  ">
          {cardTitle}
        </h1>
        <div
          typeof="project"
          className=" w-[340px] gap-[30px] flex flex-col items-start max-mobile:mt-[10px] mobile:w-[100%]"
        >
          <div>
            {project.imageUrl.length !== 0 && (
              <Image src={project.imageUrl} alt="" width={200} height={200} />
            )}
          </div>
          {/* title */}
          <input
            onChange={(e) => {
              setProject({ ...project, title: e.target.value });
            }}
            type="text"
            placeholder="title"
            className={`${inputStyle}`}
            value={project.title}
          />
          {/* clientName */}
          <input
            onChange={(e) => {
              setProject({ ...project, clientName: e.target.value });
            }}
            type="text"
            placeholder="Client Name"
            className={`${inputStyle}`}
            value={project.clientName}
          />
          {/* info */}
          <input
            onChange={(e) => {
              setProject({ ...project, info: e.target.value });
            }}
            type="text"
            placeholder="info"
            className={`${inputStyle}`}
            value={project.info}
          />
          {/* landArea */}
          <input
            onChange={(e) => {
              setProject({ ...project, landArea: e.target.value });
            }}
            type="text"
            placeholder="Land Area"
            className={`${inputStyle}`}
            value={project.landArea}
          />
          {/* budget */}
          <input
            onChange={(e) => {
              setProject({ ...project, budget: e.target.value });
            }}
            type="text"
            placeholder="Budget"
            className={`${inputStyle}`}
            value={project.budget}
          />
          {/* architect */}
          <input
            onChange={(e) => {
              setProject({ ...project, architect: e.target.value });
            }}
            type="text"
            placeholder="Architect"
            className={`${inputStyle}`}
            value={project.architect}
          />
          {/* image input */}
          <button
            onClick={() => {
              handleImgInput();
            }}
          >
            <PhotoIcon className="w-[30px] h-[30px] text-slate-400 hover:text-slate-800" />
          </button>

          {/* submit button */}
          <div
            onClick={() => {
              submit(project);
              id === undefined && resetProject();
              console.log(`id:${id}`);
            }}
            className="w-[100%] flex justify-end items-center mobile:w-[90%]"
          >
            <button className="w-[80px] h-[40px] bg-[#d7b39a] text-[11px] font-[600] tracking-[3px] uppercase">
              Submit
            </button>
          </div>
        </div>
      </div>
      {/* form end */}
    </div>
  );
};
