"use client";
import Image from "next/image";
import { useDeleteDecor, useDeleteIdea, useGetAdmin } from "@/hooks";
import { DecorMenu } from "@prisma/client";
import { DeletePage } from "../DeletePage";
import { EditPage } from "../EditPage";
import { AddDecorCard } from "./AddDecorCard";
import { useAddDecor } from "@/hooks";

interface DecoreMenuCard extends DecorMenu {
  onClick: () => void;
  type: "decor" | "idea";
}

export const DecorMenuCard: React.FC<Partial<DecoreMenuCard>> = ({
  id,
  imageUrl,
  title,
  onClick,
  info,
  type,
}) => {
  const { admin } = useGetAdmin();
  const { mutation } = useAddDecor();
  const { decorDelMutation } = useDeleteDecor();
  const { ideaDelMutation } = useDeleteIdea();
  return (
    <div className="cursor-pointer ">
      <div className=" max-mobile:w-[350px] w-[380px] overflow-hidden rounded-lg cardShadow hover:scale-[1.1] transition-all ease-out duration-500 ">
        <div
          onClick={onClick}
          className="max-mobile:w-[350px] w-[380px] h-[380px] relative"
        >
          <Image
            src={imageUrl!}
            alt=""
            width={10}
            height={10}
            className="max-mobile:w-[350px] w-[380px] h-[380px] absolute top-0 left-0 "
          />

          <Image
            loading="lazy"
            src={imageUrl!}
            alt=""
            width={380}
            height={380}
            className="max-mobile:w-[350px] w-[380px] h-[380px] absolute top-0 left-0"
          />
        </div>
        <div className=" flex flex-col justify-between  p-[20px]  bg-[#eef1f2] ">
          <div onClick={onClick}>
            <h4 className="text-[16px] font-[700]">{title}</h4>
            {info && <p> {info}</p>}
          </div>
        </div>
      </div>
      {admin && (
        <div className="flex justify-end items-center gap-[20px]  ">
          <DeletePage
            confirmation={() => {
              if (type === "decor") {
                return decorDelMutation.mutate(id!);
              }
              ideaDelMutation.mutate(id!);
            }}
          />
          <EditPage
            id={id!}
            children={
              <AddDecorCard
                id={id}
                title={"update Decor "}
                submit={(body) => {
                  mutation.mutate(body);
                }}
              />
            }
          />
        </div>
      )}
    </div>
  );
};
