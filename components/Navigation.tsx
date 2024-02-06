"use client";
import { XMarkIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { useRouter, usePathname, useParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { closeNavbar, headerAnimation, openNavbar } from "@/store";
import { DropDown } from "./constructionRates";
import { DesignIdeaDropDown } from "./designIdea";
import { isAdmin } from "@/store";
import { useRecoilValue } from "recoil";
import { DashboardDropDown } from "./dashboard";
import { useGetAdmin } from "@/hooks";

// list style
const className =
  "text-[18px] capitalize font-[700] cursor-pointer hover:text-gray-400";

export const Navigation = () => {
  const navigation = useRouter();
  const pathName = usePathname();
  const params = useParams();

  //refrences
  const header = useRef<HTMLDivElement>(null);
  const burger = useRef<HTMLDivElement>(null);
  const navbar = useRef<HTMLElement>(null);
  const navCloser = useRef<HTMLDivElement>(null);
  const links = useRef<HTMLElement[]>([]);
  const logoDov = useRef<HTMLDivElement>(null);
  const dropDownd = useRef<HTMLLIElement>(null);
  const adminLink = useRef<HTMLLIElement>(null);
  // pushing refrences into link.current array
  function puhsToLinksRef(element: HTMLLIElement) {
    links.current.push(element);
  }

  const isadmin = useRecoilValue(isAdmin);
  // fetching  admin
  const { admin } = useGetAdmin();

  useEffect(() => {
    links.current!.map((elem) => {
      elem.addEventListener("click", () => {
        if (window.innerWidth < 500) {
          closeNavbar(navbar.current!);
        }
      });
    });

    //using burget in mobile to open  navbar
    burger.current!.addEventListener("click", () => {
      let ctx = gsap.context(() => {
        openNavbar(navbar.current!);
      });
      return () => ctx.revert(); // <-- CLEANUP!
    });

    //using X-mark in mobile to close navbar
    navCloser.current!.addEventListener("click", () => {
      let ctx = gsap.context(() => {
        closeNavbar(navbar.current!);
      });
      return () => ctx.revert(); // <-- CLEANUP!
    });

    document.addEventListener("scroll", (e) => {
      if (window.scrollY < 100) {
        header.current!.style.backgroundColor = "rgba(0,0,0,0.65)";
      } else {
        header.current!.style.backgroundColor = "#23252d";
      }
    });

    // header animation
    let ctx = gsap.context(() => {
      headerAnimation(
        header.current!,
        links.current!,
        logoDov.current!,
        dropDownd.current!,
        adminLink.current!
      );
    });

    return () => ctx.revert(); // <-- CLEANUP!
  }, []);

  return (
    <div
      ref={header}
      className="fixed top-0 w-screen h-[80px] bg-[rgba(0,0,0,0.65)] flex items-center justify-center z-[20] "
    >
      {/* burger */}
      <div
        ref={burger}
        className=" mobile:hidden fixed right-[10px] flex flex-col justify-center items-center w-[40px] h-[30px] gap-[4px] cursor-pointer"
      >
        <span className="w-[30px] h-[3px] bg-white z-[5] "></span>
        <span className="w-[30px] h-[3px] bg-white z-[5] "></span>
        <span className="w-[30px] h-[3px] bg-white z-[5] "></span>
      </div>
      {/* logo */}
      <div
        ref={logoDov}
        className=" fixed  left-0 cursor-pointer h-[100px] w-[100px] mobile:h-[150px] mobile:w-[150px]"
        onClick={() => {
          navigation.push("/");
        }}
      >
        <Image
          className="rounded-full "
          src={
            "https://sparkel-world-studio.s3.ap-south-1.amazonaws.com/sws.png"
          }
          alt="logo"
          height={150}
          width={150}
        />
      </div>
      <nav
        ref={navbar}
        className="max-mobile:fixed  flex flex-col mobile:flex-row  gap-[50px] mobile:gap-[100px]   mobile:justify-between items-center  top-0 right-0 w-[50vw] mobile:w-[100vw]  h-[100vh] mobile:h-[80px]  bg-[#23252d] mobile:bg-transparent translate-x-[100%] mobile:translate-x-0"
      >
        <ul className="flex flex-col mobile:flex-row mobile:justify-center items-start mobile:items-center mobile:h-[80px] text-white gap-[20px] mobile:gap-[40px] max-mobile:pt-[100px] max-mobile:pl-[10px] mobile:w-[100vw]">
          {/* modal closer */}
          <div
            ref={navCloser}
            className="absolute top-[2px] left-[2px] mobile:hidden"
          >
            <XMarkIcon className="w-[35px] h-[35px] text-white" />
          </div>
          <li
            ref={puhsToLinksRef}
            className={`${className} ${
              pathName === "/" ? "text-gray-400" : "text-white"
            }`}
            onClick={() => {
              navigation.push("/");
            }}
          >
            home
          </li>
          <li
            ref={dropDownd}
            className={`z-[20] ${className} ${
              pathName === "/idea" || pathName === `/idea/${params.id}`
                ? "text-gray-400"
                : "text-white"
            }`}
            // onClick={() => {
            //   navigation.push("/idea");
            // }}
          >
            <DesignIdeaDropDown navbar={navbar} />
          </li>
          <li
            ref={puhsToLinksRef}
            className={`${className} ${
              pathName === "/process" ? "text-gray-400" : "text-white"
            }`}
            onClick={() => {
              navigation.push("/process");
            }}
          >
            process
          </li>
          <li
            ref={puhsToLinksRef}
            className={`${className} ${
              pathName === `/projects` || pathName === `/projects/${params.id}`
                ? "text-gray-400"
                : "text-white"
            } `}
            onClick={() => {
              navigation.push("/projects");
            }}
          >
            projects
          </li>
          {/* comment will add if needed in the future */}
          {/* <li
            ref={constructionLink}
            className={`${className} ${
              pathName === `/rates` || pathName === `/rates/${params.id}`
                ? "text-gray-400"
                : "text-white"
            }`}
          >
            <DropDown navbar={navbar} />
          </li> */}
          <li
            ref={puhsToLinksRef}
            className={`${className} ${
              pathName === "/services" ? "text-gray-400" : "text-white"
            }`}
            onClick={() => {
              navigation.push("/services");
            }}
          >
            services
          </li>
          {/* comment will add if needed in the future */}
          {/* <li
            ref={puhsToLinksRef}
            className={`${className} ${
              pathName === "/blog" ? "text-gray-400" : "text-white"
            }`}
            onClick={() => {
              navigation.push("/blog");
            }}
          >
            blog
          </li> */}
          <li
            ref={puhsToLinksRef}
            className={`${className} ${
              pathName === "/contact" ? "text-gray-400" : "text-white"
            }`}
            onClick={(e) => {
              navigation.push("/contact");
            }}
          >
            contact us
          </li>
          {admin || isadmin.isAdmin ? (
            <li
              ref={adminLink}
              className={`z-[5] ${className} ${
                pathName === `/dashboard` ||
                pathName === `/dashboard/${params.id}`
                  ? "text-gray-400"
                  : "text-white"
              }`}
            >
              <DashboardDropDown navbar={navbar} />
            </li>
          ) : (
            <li
              ref={adminLink}
              className={`${className} ${
                pathName === `/admin` ? "text-gray-400" : "text-white"
              }`}
              onClick={(e) => {
                navigation.push("/admin");
                if (window.innerWidth < 500) {
                  closeNavbar(navbar.current!);
                }
              }}
            >
              admin
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};
