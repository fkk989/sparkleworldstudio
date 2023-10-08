import { gsap } from "gsap";
export function loadingAnimation(element: HTMLDivElement) {
  gsap.fromTo(
    element,
    {
      opacity: 1,
    },
    {
      duration: 2,
      opacity: 0,
      ease: "power1",
    }
  );
}
