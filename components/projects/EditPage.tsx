"use client";

import { useEffect, useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import {
  useGetProjectByIdDisabled,
  useUploadToAws,
  useUpdateProject,
} from "@/hooks";
import { Project, ProjectCardProps } from "@/store";
import Image from "next/image";

interface EditPageProp {
  projectId: string;
}

// imput style
const inputStyle = `w-[100%] h-[50px] outline-none bg-transparent border-b border-[#23252d] placeholder:text-[#23252d] mobile:w-[90%]`;

export const EditPage: React.FC<EditPageProp> = ({ projectId }) => {
  const [open, setOpen] = useState(false);

  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [clientName, setClientName] = useState("");
  const [info, setInfo] = useState("");
  const [landArea, setLandArea] = useState("");
  const [budget, setBudget] = useState("");
  const [architect, setArchitect] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const { mutate, data, isSuccess } = useUploadToAws();

  const body = {
    id: projectId,
  };

  const { projectData, refetch } = useGetProjectByIdDisabled(body);
  const projectbody: ProjectCardProps = {
    id,
    title,
    clientName,
    info,
    landArea,
    budget,
    architect,
    imageUrl,
  };
  const { mutation } = useUpdateProject();

  useEffect(() => {
    if (projectData?.project) {
      setId(projectData.project.id);
      setTitle(projectData.project.title);
      setClientName(projectData.project.clientName);
      setInfo(projectData.project.info);
      setLandArea(projectData.project.landArea);
      setBudget(projectData.project.budget);
      setArchitect(projectData.project.architect);
      setImageUrl(projectData.project.imageUrl);
    }
  }, [projectData]);

  useEffect(() => {
    if (isSuccess) {
      const url = new URL(data.url);
      const imagePath = `${url.origin}${url.pathname}`;
      setImageUrl(imagePath);
      setTimeout(() => {
        console.log(imageUrl);
      }, 1000);
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
    <div>
      <div>
        <button
          onClick={() => {
            setOpen(true);
            refetch();
          }}
          className="bg-blue-500 hover:bg-blue-400 text-white text-center w-[60px] h-[30px] font-bold mt-[20px] rounded-md"
        >
          Edit
        </button>
      </div>
      {open && (
        <div className=" bg-[#0000004f]  w-screen h-screen fixed top-0 right-0 flex justify-center items-center z-10  ">
          <div
            onClick={() => {
              setOpen(false);
            }}
            className=" bg-[#0000004f]  w-screen h-screen fixed top-0 right-0 flex justify-center items-center z-0"
          ></div>
          {/* contact Form started*/}
          <div className="w-screen h-[500px] overflow-scroll mobile:h-[80vh]  bg-[rgb(238,241,242)] flex flex-col justify-start items-center p-[5px] mobile:p-[30px] mobile:w-[700px] mobile:items-start mobile:gap-[50px] z-10">
            <h1 className="capitalize text-black text-[25px] font-[999] bg-white w-[250px] h-[50px] flex justify-center items-center digonals-lines mobile:text-[42px] mobile:w-[350px] mobile:h-[100px]  ">
              Update
            </h1>
            <div
              typeof="contact"
              className=" w-[340px] gap-[30px] flex flex-col items-start max-mobile:mt-[10px] mobile:w-[100%] "
            >
              <div>
                {imageUrl && (
                  <Image src={imageUrl} alt="" width={200} height={200} />
                )}
              </div>
              {/* title */}
              <input
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                type="text"
                placeholder="title"
                className={`${inputStyle}`}
                value={title}
              />
              {/* clientName */}
              <input
                onChange={(e) => {
                  setClientName(e.target.value);
                }}
                type="text"
                placeholder="Client Name"
                className={`${inputStyle}`}
                value={clientName}
              />
              {/* info */}
              <input
                onChange={(e) => {
                  setInfo(e.target.value);
                }}
                type="text"
                placeholder="info"
                className={`${inputStyle}`}
                value={info}
              />
              {/* landArea */}
              <input
                onChange={(e) => {
                  setLandArea(e.target.value);
                }}
                type="text"
                placeholder="Land Area"
                className={`${inputStyle}`}
                value={landArea}
              />
              {/* budget */}
              <input
                onChange={(e) => {
                  setBudget(e.target.value);
                }}
                type="text"
                placeholder="Budget"
                className={`${inputStyle}`}
                value={budget}
              />
              {/* architect */}
              <input
                onChange={(e) => {
                  setArchitect(e.target.value);
                }}
                type="text"
                placeholder="Architect"
                className={`${inputStyle}`}
                value={architect}
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
                  mutation.mutate(projectbody);
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
      )}
    </div>
  );
};
