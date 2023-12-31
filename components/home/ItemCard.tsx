"use client";
import { DecorMenu } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";

export const ItemCard: React.FC<Partial<DecorMenu>> = (props) => {
  const navigate = useRouter();
  return (
    <div
      className="item"
      style={{
        cursor: "pointer",
        backgroundImage: `url("${props.imageUrl}")`,
      }}
    >
      <div className="content ">
        <div className="name bg-white bg-opacity-[0.2] ">{props.title}</div>
        <div className="des bg-white bg-opacity-[0.2]">{props.info}</div>
        <button
          onClick={() => {
            navigate.push(`/idea/${props.type}`);
          }}
          className="text-white"
        >
          See More
        </button>
      </div>
    </div>
  );
};
