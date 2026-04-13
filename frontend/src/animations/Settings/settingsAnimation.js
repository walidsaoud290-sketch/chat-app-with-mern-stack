import { gsap } from "gsap";

export const settingsAnimations = () => {
  gsap.fromTo(
    ".settings-title",
    {
      opacity: 0,
      translateX: -100,
    },
    {
      opacity: 1,
      translateX: 0,
      duration: 1,
    },
  );

  gsap.fromTo(
    ".username",
    {
      opacity: 0,
      translateX: -50,
    },
    {
      opacity: 1,
      translateX: 0,
      duration: 1,
    },
  );
  gsap.fromTo(
    ".role",
    {
      opacity: 0,
      translateX: 50,
    },
    {
      opacity: 1,
      translateX: 0,
      duration: 1,
    },
  );
  gsap.fromTo(
    ".image-user",
    { scale: 0, rotation: -45, opacity: 0 },
    {
      scale: 1,
      rotation: 0,
      opacity: 1,
      duration: 0.8,
      ease: "back.out(1.7)",
    },
  );
  gsap.fromTo(
    ".settings-btn",
    {
      opacity: 0,
    },
    {
      opacity: 1,
      duration: 3,
      ease: "elastic",
    },
  );
};
