"use client";
import { RefObject, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { closeNavbar } from "@/store";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import { useGetDecor } from "@/hooks";

// link style
const listStyle = "hover:underline mt-[2px] text-start";

export const DesignIdeaDropDown: React.FC<{
  navbar: RefObject<HTMLElement>;
}> = ({ navbar }) => {
  const navigate = useRouter();
  const { decorData } = useGetDecor();

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
      <div className="flex justify-center items-center">
        <span
          onClick={() => {
            navigate.push("/idea");
          }}
        >
          {" "}
          Design Idea
        </span>

        <div ref={arrowUp}>
          <ChevronUpIcon className="w-[30px] h-[30px]" />
        </div>

        <div ref={arrowDown} className="hidden">
          <ChevronDownIcon className="w-[30px] h-[30px] " />
        </div>
      </div>

      {/* modal  */}
      <div
        ref={dropdownContainer}
        className={`max-mobile:translate-x-[-50%] absolute  w-[200px] mobile:w-[700px] h-[300px]  bg-[#424347]  rounded-xl capitalize overflow-scroll transition-all duration-300 ease-out  scale-y-0 origin-top `}
      >
        {/* <ul className="capitalize w-[100%] h-[100%] gap-[5px] flex flex-col justify-start items-center  place-items-center text-white mobile:grid mobile:grid-cols-2"> */}
        <ul className="capitalize w-[100%] h-[100%] gap-[15px] flex flex-col mobile:flex-wrap justify-start items-start text-white pl-[10px]">
          {decorData?.map((data) => {
            return (
              <li
                key={data.id}
                ref={puhsTosSocialLInks}
                onClick={() => {
                  navigate.push(`/idea/${data.type}`);
                }}
                className={listStyle}
              >
                {data.title}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
