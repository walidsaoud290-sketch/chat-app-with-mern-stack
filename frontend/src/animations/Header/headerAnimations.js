import gsap from "gsap";

export const headerAnimations = ()=>{
    const t1 = gsap.timeline({defaults:{
        ease:"power3.out"
    }})

    gsap.from(".header", {
      y: -100,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });

    // Logo animation
    gsap.from(".logo", {
      x: -50,
      opacity: 0,
      duration: 0.6,
      delay: 0.3,
      ease: "back.out(1.2)",
    });

    // Menu items staggered animation
    gsap.from(".menu li", {
      y: -30,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      delay: 0.4,
      ease: "power2.out",
    });

    // Right side buttons animation
    gsap.from(".nav-right .dropdown", {
      scale: 0,
      opacity: 0,
      duration: 0.5,
      stagger: 0.15,
      delay: 0.6,
      ease: "back.out(1.5)",
    });

    // Avatar button animation
    gsap.from(".avatar-btn", {
      rotate: -180,
      scale: 0,
      opacity: 0,
      duration: 0.6,
      delay: 0.7,
      ease: "back.out(1.5)",
    });
}