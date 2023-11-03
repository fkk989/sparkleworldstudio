"use client";
import React from "react";
import ContentLoader from "react-content-loader";

export const CardSkeleton = () => {
  const id = React.useId();
  return (
    <ContentLoader
      uniqueKey={id}
      suppressHydrationWarning
      height="480"
      width="400"
      backgroundColor="#cdcdcd"
      foregroundColor="#878787"
      speed={0.6}
    >
      <rect width="400" height="480" />
    </ContentLoader>
  );
};
