"use client";
import React from "react";
import ContentLoader from "react-content-loader";

export const CardSkeleton = () => {
  const id = React.useId();
  return (
    <ContentLoader
      uniqueKey={id}
      suppressHydrationWarning
      backgroundColor="#cdcdcd"
      foregroundColor="#878787"
      speed={0.6}
      className=" w-[350px] mobile:w-[380px] h-[400px] flex"
    >
      <rect className=" w-[350px] mobile:w-[380px] h-[400px]" />
    </ContentLoader>
  );
};
