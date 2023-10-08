"use client";
import { RefObject, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { closeNavbar } from "@/store";

// link style
const listStyle = "hover:underline mt-[2px]";

export const DashboardDropDown: React.FC<{
  navbar: RefObject<HTMLElement>;
}> = ({ navbar }) => {
  const navigate = useRouter();

  // navbar refrence from parent
  const navRef = navbar;

  // refrences
  const dropdownContainer = useRef<HTMLDivElement>(null);
  const socialLinks = useRef<HTMLLIElement[]>([]);

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
    <div>
      <div
        onClick={() => {
          dropdownContainer.current?.classList.toggle("scale-y-0");
        }}
      >
        Dashboard
      </div>

      {/* modal  */}
      <div
        ref={dropdownContainer}
        className={`max-mobile:translate-x-[-50%] absolute w-[200px]  h-[200px]  bg-[#424347]  rounded-xl capitalize overflow-scroll transition-all duration-300 ease-out  scale-y-0 origin-top `}
      >
        <ul className="capitalize w-[100%] h-[100%] flex flex-col justify-evenly items-start pl-[10px] pt-[10px] text-white">
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
        </ul>
      </div>
    </div>
  );
};
