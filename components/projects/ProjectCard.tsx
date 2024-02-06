"use client";
import Image from "next/image";
import { useDeleteProject, useUpdateProject } from "@/hooks";
import { useGetAdmin } from "@/hooks";
import { DeletePage } from "../DeletePage";
import { EditPage } from "../EditPage";
import { AddProjectCard } from "./AddProjectCard";

interface ProjectCardProps {
  imageUrl: string;
  title: string;
  info: string;
  onClick: () => void;
  id: string;
}
export const ProjectCard: React.FC<ProjectCardProps> = ({
  imageUrl,
  title,
  info,
  onClick,
  id,
}) => {
  const { admin } = useGetAdmin();
  const { mutate } = useDeleteProject();
  const { mutation } = useUpdateProject();
  return (
    <div className="cursor-pointer ">
      <div className="w-[380px] overflow-hidden rounded-lg cardShadow hover:scale-[1.1] transition-all ease-out duration-500 ">
        <div onClick={onClick} className="w-[380px] h-[380px] relative">
          <Image
            src={imageUrl}
            alt=""
            width={10}
            height={10}
            className="w-[380px] h-[380px] absolute top-0 left-0 "
          />

          <Image
            loading="lazy"
            src={imageUrl}
            alt=""
            width={380}
            height={380}
            className="w-[380px] h-[380px] absolute top-0 left-0"
          />
        </div>
        <div className=" flex flex-col justify-between  p-[20px]  bg-[#eef1f2] ">
          <div onClick={onClick}>
            <h4 className="text-[16px] font-[700]">{title}</h4>
            <p className="mt-[20px ]">{info}</p>
          </div>
        </div>
      </div>
      {admin && (
        <div className="flex justify-end items-center gap-[20px]  ">
          <DeletePage confirmation={() => mutate(id)} />
          <EditPage
            id={id}
            children={
              <AddProjectCard
                id={id}
                cardTitle={"update project info"}
                submit={(body) => {
                  mutation.mutate({ id, body });
                }}
              />
            }
          />
        </div>
      )}
    </div>
  );
};
