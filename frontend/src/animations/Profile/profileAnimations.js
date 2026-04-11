import gsap from "gsap";

export const animationsForProfile = () => {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  tl.fromTo(
    ".profile-card",
    { opacity: 0, y: 50, scale: 0.95 },
    { opacity: 1, y: 0, scale: 1, duration: 1 },
  )
    .fromTo(
      ".profile-avatar",
      { scale: 0, rotation: -45, opacity: 0 },
      {
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
      },
      "-=0.5", // Commence 0.5s avant la fin de l'anim précédente
    )
    .fromTo(
      ".profile-header h2, .profile-role",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.2 },
      "-=0.4",
    )
    .fromTo(
      ".profile-item",
      { x: -30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, stagger: 0.15 },
      "-=0.3",
    );
};
