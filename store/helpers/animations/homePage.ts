import { gsap } from "gsap";
import { SlidesElementsProps } from "../../interfaces";

export function slidesAnimation(slidesElements: SlidesElementsProps) {
  const {
    mainDiv,
    sketchSlide,
    imageSlide,
    sketchContent,
    imageContent,
    resizerDiv,
  } = slidesElements;

  const timeline = gsap.timeline({
    defaults: {
      duration: 0.5,
    },
  });

  timeline
    .from(sketchSlide, {
      delay: 1,
      opacity: 0,
    })
    .from(sketchContent, {
      opacity: 0,
    })
    .fromTo(
      imageSlide,
      {
        width: 0,
      },
      {
        width: "50%",
      }
    )
    .from(imageContent, {
      delay: 0.5,
      opacity: 0,
    })
    .from(
      resizerDiv,
      {
        opacity: 0,
      },
      1
    )
    .from(
      resizerDiv,
      {
        left: "100%",
      },
      2
    );
}

export function resizeImageOnClick(
  imageSlide: HTMLDivElement,
  resizerDiv: HTMLDivElement,
  fromTop: number,
  fromLeft: number
) {
  const imageSlideWidth = window.innerWidth - fromLeft;

  gsap.to(resizerDiv, {
    left: `${fromLeft}px`,
    top: `${fromTop}px`,
    transition: "all ease-out 300ms",
  });
  gsap.to(imageSlide, {
    width: imageSlideWidth,
    transition: "all ease-out 300ms",
  });
}
