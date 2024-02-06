"use client";
import Image from "next/image";
import { Icon } from "@iconify/react";
import Link from "next/link";

// socila link style
const linkStyle = `w-[30px] h-[30px] rounded-full bg-white hover:bg-slate-500 flex justify-center items-center cursor-pointer`;

export const Footer = () => {
  return (
    <footer>
      <div className="w-screen h-[70vh] mobile:h-[30vh] bg-[#23252d] flex flex-col mobile:flex-row justify-start mobile:justify-center  item-start  mobile:items-center  gap-[30px] mobile:gap-[200px] z-[5] max-mobile:pl-[20px]">
        {/* socila links */}
        <div>
          <Image
            className="rounded-full "
            src={
              "https://sparkel-world-studio.s3.ap-south-1.amazonaws.com/sws.png"
            }
            alt="logo"
            height={150}
            width={150}
          />
          <h3 className="text-white text-[18px]  font-[600]">Social links</h3>
          <div className="flex justify-start items-center gap-[10px] pt-[10px]">
            <Link href={"https://linkedin.com"}>
              <span className={linkStyle}>
                <Icon icon="ri:linkedin-fill" className="hover:text-white" />
              </span>
            </Link>
            <Link href={"https://facebook.com"}>
              <span className={linkStyle}>
                <Icon icon="bxl:facebook" className="hover:text-white" />
              </span>
            </Link>
            <Link href={"https://x.com"}>
              <span className={linkStyle}>
                <Icon icon="simple-icons:x" className="hover:text-white" />
              </span>
            </Link>
            <Link href={"https://instagram.com"}>
              <span className={linkStyle}>
                <Icon icon="uil:instagram" className="hover:text-white" />
              </span>
            </Link>
          </div>
        </div>

        {/*contact Info*/}
        <div className="text-white gap-[10px] flex flex-col ]">
          <h3 className="text-[18px] font-[600]">Contact us</h3>
          <p className="max-mobile:w-[50vw]">
            318, 3rd Floor, City Center Mall, Pandri, Raipur C.G.
          </p>
          <p>sparkleworldstudio@gmail.com</p>
          <p>(+91) 7000827363</p>
        </div>
      </div>
    </footer>
  );
};
