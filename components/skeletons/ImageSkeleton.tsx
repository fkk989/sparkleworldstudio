import React from "react";
import ContentLoader from "react-content-loader";

export const ImageSkeleton = ({
  height,
  width,
}: {
  height: string;
  width: string;
}) => (
  <ContentLoader
    height={height}
    width={width}
    backgroundColor="#cdcdcd"
    foregroundColor="#878787"
  >
    <rect width={width} height={height} />
  </ContentLoader>
);
