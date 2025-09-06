"use client";

import React, { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import projects from "@/project";
import Fliplink from "../common/Fliplink";
import Woork from "../components/Woork";
import Footer from "../components/Footer";
import HeroCursor from "../components/Landing/components/HeroCursor";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Work = () => {
  const projectsContainer = useRef();

  useGSAP(
    () => {
      // Hero Text Animation
      const heroText2 = new SplitType("#hero-work-text", {
        types: "words, chars",
      });
      gsap.set(heroText2.chars, { y: 200 });

      gsap.to(heroText2.chars, {
        y: 0,
        duration: 1,
        stagger: 0.08,
        ease: "power4.out",
        delay: 1.2,
      });
    },
    { scope: projectsContainer }
  );

  useGSAP(
    () => {
      // Side Text Animation
      const sideText2 = new SplitType("#work-side-text", {
        types: "lines",
        tagName: "div",
        lineClass: "line",
      });

      sideText2.lines.forEach((line) => {
        const content = line.innerHTML;
        line.innerHTML = `<span>${content}</span>`;
      });

      gsap.set("#work-side-text .line span", {
        y: 200,
        opacity: 0,
        // clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
      });

      gsap.to("#work-side-text .line span", {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
        delay: 1.6,
        // clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      });
    },
    { scope: projectsContainer }
  );

  const workHandles = projects.map((p) => p.slug);

  return (
    <>
      <HeroCursor />
      <div
        ref={projectsContainer}
        id="route-work"
        className="main-container w-screen h-[570px] relative bg-[#deddd9]"
      >
        <div className="text-[4rem] sm:text-[6rem] md:text-[10rem] lg:text-[12rem] font-primary absolute top-72 sm:top-24 md:top-24 leading-none m-0 p-0 whitespace-nowrap tracking-wider left-4 sm:left-0 md:left-0">
          <h1
            style={{
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            }}
            id="hero-work-text"
          >
            MY<span className="space">&nbsp;&nbsp;</span>WORKS?
          </h1>
        </div>

        <div className="text-[#1e1e1e] text-sm sm:text-base md:text-2xl w-full max-w-full sm:w-full sm:max-w-full md:w-1/2 md:max-w-[50%] font-second absolute bottom-16 md:right-8 m-0 p-1 md:p-0 leading-tight sm:leading-normal md:leading-none text-center sm:text-center md:text-right">
          <p id="work-side-text">
            I mostly hover near code — sometimes I write it, sometimes I break
            it. Projects appear when the stars align, and debugging usually
            involves snacks. I show up, get things done in my own rhythm, and
            occasionally. I ship something weirdly decent. Still counts as work,
            right?
          </p>
        </div>
      </div>

      <div>
        {workHandles.map((handle) => (
          <Woork key={handle} handle={handle} />
        ))}
      </div>

      <div>
        <Footer />
      </div>
    </>
  );
};

export default Work;
