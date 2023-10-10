import { Services } from "@/store";
import Image from "next/image";

export const ServiceCard: React.FC<Services> = ({ imageUrl, title, info }) => {
  return (
    <div className="  cursor-pointer">
      <Image
        src={imageUrl}
        alt=""
        width={380}
        height={380}
        className="w-[380px] h-[380px]"
      />
      <div className="p-[20px]  bg-[#eef1f2]">
        <h4 className="text-[16px] font-[700]">{title}</h4>
        <p className="mt-[20px ]">{info}</p>
      </div>
    </div>
  );
};
