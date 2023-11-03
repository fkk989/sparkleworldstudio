"use client";
import Image from "next/image";
import { useGetAdmin } from "@/hooks";
import { url } from "inspector";
import { DecorMenu } from "@prisma/client";

interface DecoreMenuCard extends DecorMenu {
  onClick: () => void;
}

export const DecorMenuCard: React.FC<Partial<DecoreMenuCard>> = ({
  id,
  imageUrl,
  title,
  onClick,
}) => {
  const { admin } = useGetAdmin();
  return (
    <div className="cursor-pointer ">
      <div className="w-[380px] overflow-hidden rounded-lg cardShadow hover:scale-[1.1] transition-all ease-out duration-500 ">
        <div onClick={onClick} className="w-[380px] h-[380px] relative">
          <Image
            src={imageUrl!}
            alt=""
            width={10}
            height={10}
            className="w-[380px] h-[380px] absolute top-0 left-0 "
          />

          <Image
            loading="lazy"
            src={imageUrl!}
            alt=""
            width={380}
            height={380}
            className="w-[380px] h-[380px] absolute top-0 left-0"
          />
        </div>
        <div className=" flex flex-col justify-between  p-[20px]  bg-[#eef1f2] ">
          <div onClick={onClick}>
            <h4 className="text-[16px] font-[700]">{title}</h4>
          </div>
        </div>
      </div>
      {admin && (
        <div className="flex justify-end items-center gap-[20px]"></div>
      )}
    </div>
  );
};
