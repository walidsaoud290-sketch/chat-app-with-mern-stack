import React, { useEffect } from "react";
import "./Welcome.css";
import gsap from "gsap";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
const Welcome = () => {
  useEffect(() => {
    const t1 = gsap.timeline({
      defaults:{
        ease:"power3.out",
        duration:0.8
      }
    })
    gsap.fromTo(
      ".right-section",
      {
        x: 100,
        opacity: 0,
        duration: 1,
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
      },
    );
    gsap.fromTo(
      ".title",
      {
        color: "black",
        translateX: 100,
        stagger: 1,
      },
      {
        color: "black",
        duration: 1,
        translateX: 0,
        scrollBehavior: 4,
      },
    );
  }, []);
  return (
    <section className="right-section">
      <div className="content">
        <h1 className="title">
          Welcome to <span className="text-info">ChatApp!</span>
        </h1>

        <ul>
          <li>Connect with friends and colleagues</li>
          <li>Share messages and files in real-time</li>
          <li>Stay productive with seamless chat</li>
        </ul>
      </div>
    </section>
  );
};

export default Welcome;
