import { gsap } from "gsap";
export const openNavbar = (navbar: HTMLElement) => {
  gsap.fromTo(
    navbar,
    {
      transform: "translateX(100%)",
      duration: 0.5,
    },
    {
      transform: "translateX(0)",
      duration: 0.5,
    }
  );
};

export const closeNavbar = (navbar: HTMLElement) => {
  gsap.fromTo(
    navbar,
    {
      transform: "translateX(0)",
      duration: 0.5,
    },
    {
      transform: "translateX(100%)",
      duration: 0.5,
    }
  );
};

export const handleDropdwon = (dropdownContainer: HTMLDivElement) => {
  const currentScale = getComputedStyle(dropdownContainer).scale;

  if (currentScale === "1") {
    gsap.to(dropdownContainer, {
      scale: 0,
      duration: 0.5,
    });
  } else {
    gsap.to(dropdownContainer, {
      scale: 1,
      duration: 0.5,
    });
  }
};
