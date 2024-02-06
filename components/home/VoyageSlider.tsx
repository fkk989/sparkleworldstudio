"use client";
import { useEffect } from "react";
import { ItemCard } from "./ItemCard";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useGetDecor } from "@/hooks";

export const VoyageSlider = () => {
  const { decorData } = useGetDecor();
  useEffect(() => {
    let next = document.querySelector(".next");
    let prev = document.querySelector(".prev");

    next?.addEventListener("click", function () {
      let items = document.querySelectorAll(".item");
      document.querySelector(".slide")!.appendChild(items[0]);
    });

    prev?.addEventListener("click", function () {
      let items = document.querySelectorAll(".item");
      document.querySelector(".slide")!.prepend(items[items.length - 1]); // here the length of items = 6
    });
  }, []);
  return (
    <div className="slide-container">
      <div className="slide">
        {decorData?.map((item) => {
          return (
            <ItemCard
              key={item.id}
              imageUrl={item.imageUrl}
              title={item.title}
              info={item.info}
              type={item.type}
            />
          );
        })}
      </div>

      <div className="button">
        <button className="prev">
          <ChevronLeftIcon width={30} height={30} color="white" />
        </button>
        <button className="next">
          <ChevronRightIcon width={30} height={30} color="white" />
        </button>
      </div>
    </div>
  );
};
