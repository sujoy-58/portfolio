"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import ImageAbout from "./components/ImageAbout";
import WhyMe from "./components/WhyMe";
import Footer from "../components/Footer";
import Craving from "./components/Craving";
import Philosophy from "./components/Philosophy";
import Hire from "./components/Hire";
import HeroCursor from "../components/Landing/components/HeroCursor";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Aboutpage = () => {
  const container = useRef();

  useGSAP(
    () => {
      // Hero Text Animation
      const heroText = new SplitType("#hero-about-text", {
        types: "words, chars",
      });
      gsap.set(heroText.chars, { y: 200 });

      gsap.to(heroText.chars, {
        y: 0,
        duration: 1,
        stagger: 0.08,
        ease: "power4.out",
        delay: 1.2,
      });
    },
    { scope: container }
  );

  useGSAP(
    () => {
      // Side Text Animation
      const sideText = new SplitType("#about-side-text", {
        types: "lines",
        tagName: "div",
        lineClass: "line",
      });

      sideText.lines.forEach((line) => {
        const content = line.innerHTML;
        line.innerHTML = `<span>${content}</span>`;
      });

      gsap.set("#about-side-text .line span", {
        y: 200,
        opacity: 0,
        // clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
      });

      gsap.to("#about-side-text .line span", {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
        delay: 1.6,
        // clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      });
    },
    { scope: container }
  );

  return (
    <>

    <HeroCursor/>
      <div
        ref={container}
        id="route-about"
        className="main-container w-screen h-[500px] relative bg-[#deddd9]"
      >
        <div className="text-[4rem] sm:text-[6rem] md:text-[10rem] lg:text-[12rem] font-primary absolute top-72 sm:top-24 md:top-24 leading-none m-0 p-0 whitespace-nowrap tracking-wider left-4 sm:left-0 md:left-0">
          <h1
            style={{
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            }}
            id="hero-about-text"
          >
            ABOUT<span className="space">&nbsp;&nbsp;</span>ME?
          </h1>
        </div>

        <div
        style={{ overflowWrap: "anywhere" }}
        className="text-[#1e1e1e] text-sm sm:text-base md:text-2xl w-full max-w-full sm:w-full sm:max-w-full md:w-[65%] md:max-w-[65%] font-second absolute bottom-16 md:right-8 m-0 p-1 md:p-0 leading-tight sm:leading-normal md:leading-none text-center sm:text-center md:text-right">
          <p id="about-side-text">
            A developer from India who codes, debugs, and sometimes even
            Googles the obvious. I game like it`s a job, travel like I`m
            rich (I`m not), and somehow still pretend to be a responsible programmer
          </p>
        </div>
      </div>
      <div className="w-screen flex justify-center">
        <hr className="bg-black border border-black w-[90%]"></hr>
      </div>
      <div
      id="route-about-imgabt"
      className="h-screen w-screen flex flex-col items-center  justify-center relative">
        <ImageAbout />
        <div className="absolute bottom-8 sm:left-10 font-second  leading-none text-sm sm:text-sm md:text-2xl w-full max-w-full sm:w-full sm:max-w-full md:w-1/2 md:max-w-[50%]  md:right-8 m-0 p-1 md:p-0  sm:leading-normal md:leading-none text-center sm:text-left md:text-left
        ">
          <p>
            A good developer writes code that humans can understand
            <br /> not just machines can execute
          </p>
        </div>
      </div>
      <div className="w-screen flex justify-center">
        <hr className="bg-black border border-black w-[90%]"></hr>
      </div>
      <div id="route-about-whyme">
        <WhyMe />
      </div>


      <div>
        <Craving />
      </div>

      <div id="route-about-phyl">
        <Philosophy />
      </div>
      {/* <div className="w-screen flex justify-center">
        <hr className="bg-black border border-black w-[90%]"></hr>
      </div> */}
      {/* <div>
        <Hire />
      </div> */}
      {/* <div className="w-screen flex justify-center">
        <hr className="bg-black border border-black w-[90%]"></hr>
      </div> */}
      <div>
        <Footer />
      </div>
    </>
  );
};

export default Aboutpage;
