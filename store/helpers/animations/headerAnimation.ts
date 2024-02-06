import { gsap } from "gsap";
import { Dispatch, SetStateAction } from "react";

export function headerAnimation(
  header: HTMLDivElement,
  links: HTMLElement[],
  logoDiv: HTMLDivElement,
  dropDown: HTMLLIElement,
  adminLink: HTMLLIElement
) {
  if (window.innerWidth > 500) {
    const timeline = gsap.timeline({
      defaults: {
        duration: 0.5,
      },
    });
    timeline
      .from(header, {
        delay: 1,
        duration: 1,
        y: "-100%",
        ease: "bounce",
      })
      .from(links, {
        opacity: 0,
      })
      .from(
        dropDown,
        {
          opacity: 0,
        },
        2
      )
      .from(
        logoDiv,
        {
          opacity: 0,
        },
        2
      )
      .from(
        adminLink,
        {
          opacity: 0,
        },
        2
      );
  }
}
// cahnge bg color
export function changeNavbarColor(
  setChangeBgColor: Dispatch<SetStateAction<boolean>>
) {
  if (window.scrollY >= 80) {
    setChangeBgColor(true);
  } else {
    setChangeBgColor(false);
  }
}
