"use client";
import { RefObject, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { baseUrl, closeNavbar, isAdmin } from "@/store";
import { useGetAdmin } from "@/hooks";
import { useSetRecoilState } from "recoil";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";

// link style
const listStyle = "hover:underline mt-[2px]";

export const DashboardDropDown: React.FC<{
  navbar: RefObject<HTMLElement>;
}> = ({ navbar }) => {
  const navigate = useRouter();
  const setAdmin = useSetRecoilState(isAdmin);
  // navbar refrence from parent
  const navRef = navbar;

  // refrences
  const dropdownContainer = useRef<HTMLDivElement>(null);
  const socialLinks = useRef<HTMLLIElement[]>([]);

  const arrowUp = useRef<HTMLDivElement>(null);
  const arrowDown = useRef<HTMLDivElement>(null);

  // pushing refrences into link.current array
  function puhsTosSocialLInks(element: HTMLLIElement) {
    socialLinks.current.push(element);
  }

  useEffect(() => {
    socialLinks.current.map((elem) => {
      elem.addEventListener("click", () => {
        dropdownContainer.current?.classList.toggle("scale-y-0");
        if (window.innerWidth < 500) {
          closeNavbar(navRef.current!);
        }
      });
    });
  }, []);

  return (
    <div
      onMouseEnter={() => {
        dropdownContainer.current?.classList.remove("scale-y-0");
        arrowUp.current?.classList.add("hidden");
        arrowDown.current?.classList.remove("hidden");
      }}
      onMouseLeave={() => {
        dropdownContainer.current?.classList.add("scale-y-0");
        arrowUp.current?.classList.remove("hidden");
        arrowDown.current?.classList.add("hidden");
      }}
    >
      <div className="flex justify-center items-center gap-[5px]">
        <span>Dashboard</span>

        <div ref={arrowUp}>
          <ChevronUpIcon className="w-[20px] h-[20px]" />
        </div>

        <div ref={arrowDown} className="hidden">
          <ChevronDownIcon className="w-[20px] h-[20px] " />
        </div>
      </div>

      {/* modal  */}
      <div
        ref={dropdownContainer}
        className={`max-mobile:translate-x-[-50%] absolute w-[200px]    bg-[#424347]  rounded-xl capitalize overflow-scroll transition-all duration-300 ease-out  scale-y-0 origin-top `}
      >
        <ul className="capitalize w-[100%] h-[100%] flex flex-col justify-evenly items-start pl-[10px] pt-[10px] text-white gap-[10px]">
          <li
            ref={puhsTosSocialLInks}
            onClick={() => {
              navigate.push("/dashboard/addadmin");
            }}
            className={listStyle}
          >
            Add Admin
          </li>
          <li
            ref={puhsTosSocialLInks}
            onClick={() => {
              navigate.push("/dashboard/addproject");
            }}
            className={listStyle}
          >
            Add Projects
          </li>
          <li
            ref={puhsTosSocialLInks}
            onClick={() => {
              navigate.push("/dashboard/addservice");
            }}
            className={listStyle}
          >
            Add services
          </li>
          <li
            ref={puhsTosSocialLInks}
            onClick={() => {
              navigate.push("/dashboard/queries");
            }}
            className={listStyle}
          >
            Queries
          </li>
          <li
            ref={puhsTosSocialLInks}
            onClick={() => {
              navigate.push("/dashboard/adddecormenu");
            }}
            className={listStyle}
          >
            Add Decor
          </li>
          <li
            ref={puhsTosSocialLInks}
            onClick={() => {
              navigate.push("/dashboard/addidea");
            }}
            className={listStyle}
          >
            add Idea
          </li>
        </ul>
      </div>
    </div>
  );
};
