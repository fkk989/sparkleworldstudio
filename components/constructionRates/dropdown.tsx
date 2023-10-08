"use client";
import { RefObject, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { closeNavbar } from "@/store";

// link style
const listStyle = "hover:underline mt-[10px]";

export const DropDown: React.FC<{ navbar: RefObject<HTMLElement> }> = ({
  navbar,
}) => {
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
        Construction Rate
      </div>

      {/* modal  */}
      <div
        ref={dropdownContainer}
        className={`max-mobile:translate-x-[-50%] absolute w-[300px] mobile:w-[400px] h-[300px] mobile:h-[500px] bg-[#424347]  rounded-xl capitalize overflow-scroll transition-all duration-300 ease-out  scale-y-0 origin-top `}
      >
        <ul className="capitalize w-[100%] h-[100%] flex flex-col justify-between items-start pl-[10px] pt-[10px] text-white">
          <li
            ref={puhsTosSocialLInks}
            onClick={() => {
              navigate.push("/rates/bcr");
            }}
            className={listStyle}
          >
            building contractor rates
          </li>
          <li
            ref={puhsTosSocialLInks}
            onClick={() => {
              navigate.push("/rates/bcvslc");
            }}
            className={listStyle}
          >
            building contractor vs labour contractor
          </li>
          <li
            ref={puhsTosSocialLInks}
            onClick={() => {
              navigate.push("/rates/irfc");
            }}
            className={listStyle}
          >
            items rates for construction
          </li>
          <li
            ref={puhsTosSocialLInks}
            onClick={() => {
              navigate.push("/rates/lcr");
            }}
            className={listStyle}
          >
            labour contractor rates
          </li>
          <li
            ref={puhsTosSocialLInks}
            onClick={() => {
              navigate.push("/rates/coir");
            }}
            className={listStyle}
          >
            construction on item rates
          </li>
          <li
            ref={puhsTosSocialLInks}
            onClick={() => {
              navigate.push("/rates/boq");
            }}
            className={`uppercase ${listStyle}`}
          >
            boq <span className="capitalize">(bill of quantities)</span>
          </li>
          <li
            ref={puhsTosSocialLInks}
            onClick={() => {
              navigate.push("/rates/gandmlc");
            }}
            className={listStyle}
          >
            granite and marble laying cost
          </li>
          <li
            ref={puhsTosSocialLInks}
            onClick={() => {
              navigate.push("/rates/elr");
            }}
            className={listStyle}
          >
            Electrical labout rates
          </li>
          <li
            ref={puhsTosSocialLInks}
            onClick={() => {
              navigate.push("/rates/pr");
            }}
            className={listStyle}
          >
            Plumbing rates
          </li>
          <li
            ref={puhsTosSocialLInks}
            onClick={() => {
              navigate.push("/rates/af");
            }}
            className={listStyle}
          >
            aluminum fabrication
          </li>
          <li
            ref={puhsTosSocialLInks}
            onClick={() => {
              navigate.push("/rates/hcc");
            }}
            className={listStyle}
          >
            house construction cost
          </li>
        </ul>
      </div>
    </div>
  );
};
