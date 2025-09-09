"use client";

import React, { useRef } from "react";
import { ArrowDown } from "lucide-react";
import Image from "next/image";
import HeroCursor from "./components/HeroCursor";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import About from "./components/About";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSpring } from "framer-motion";
import Footer from "../Footer";
import Skills from "./components/Skill";
import projects from "@/project";
import ProjectShow from "./components/ProjectShow";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Landing = () => {
  const container = useRef();
  const scrollDownRef = useRef();
  const aboutSectionRef = useRef();

  // Desktop image refs
  const imageWrapperRef = useRef(null);
  const imageParallaxRef = useRef(null);

  // Mobile image refs
  const imageWrapperRef2 = useRef(null);
  const imageParallaxRef2 = useRef(null);

  // ======================
  // IMAGE ANIMATIONS (ENTRY + PARALLAX)
  // ======================
  useGSAP(() => {
    // Desktop entry + parallax
    if (imageWrapperRef.current && imageParallaxRef.current) {
      // entry animation
      gsap.fromTo(
        imageParallaxRef.current,
        { opacity: 0, scale: 1.1 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          delay: 1.3,
        }
      );

      // parallax effect
      gsap.fromTo(
        imageParallaxRef.current,
        { y: "-20%" },
        {
          y: "20%",
          ease: "none",
          scrollTrigger: {
            trigger: imageWrapperRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }

    // Mobile entry + parallax
    if (imageWrapperRef2.current && imageParallaxRef2.current) {
      // entry animation
      gsap.fromTo(
        imageParallaxRef2.current,
        { opacity: 0, scale: 1.1 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          delay: 1.3,
        }
      );

      // parallax effect
      gsap.fromTo(
        imageParallaxRef2.current,
        { y: "-20%" },
        {
          y: "20%",
          ease: "none",
          scrollTrigger: {
            trigger: imageWrapperRef2.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }
  }, []);

  // ======================
  // HERO TEXT ANIMATION
  // ======================
  useGSAP(
    () => {
      const heroText = new SplitType("#hero-text", { types: "words, chars" });
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

  // ======================
  // SIDE TEXT ANIMATION
  // ======================
  useGSAP(
    () => {
      const sideText = new SplitType("#side-text", {
        types: "lines",
        tagName: "div",
        lineClass: "line",
      });

      sideText.lines.forEach((line) => {
        const content = line.innerHTML;
        line.innerHTML = `<span>${content}</span>`;
      });

      gsap.set("#side-text .line span", {
        y: 200,
        opacity: 0,
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
      });

      gsap.to("#side-text .line span", {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
        delay: 1.6,
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      });
    },
    { scope: container }
  );

  // ======================
  // SCROLL DOWN ANIMATION
  // ======================
  useGSAP(() => {
    gsap.to(scrollDownRef.current, {
      y: 210,
      duration: 1.5,
      ease: "power1.out",
      scrollTrigger: {
        trigger: aboutSectionRef.current,
        start: "top bottom-=0",
        end: "top bottom-=200",
        scrub: true,
      },
    });
  }, []);

  // ======================
  // SPRING FOR CURSOR
  // ======================
  const spring = {
    stiffness: 150,
    damping: 15,
    mass: 0.1,
  };

  const mousePosition = {
    x: useSpring(0, spring),
    y: useSpring(0, spring),
  };

  const mouseMove = (e) => {
    const { clientX, clientY } = e;
    const vw = typeof window !== "undefined" ? window.innerWidth : 0;
    const vignetteWidth = vw * 0.2;
    const vignetteHeight = vw * 0.25;
    const targetX = clientX - vignetteWidth / 2;
    const targetY = clientY - vignetteHeight / 2;
    mousePosition.x.set(targetX);
    mousePosition.y.set(targetY);
  };

  return (
    <>
      <div className="w-full">
        <HeroCursor />

        {/* Main Section */}
        <div
          id="main-section"
          className="min-h-screen w-full px-4 md:px-0 text-[#1E1E1E] flex justify-center items-center flex-col relative overflow-hidden"
          ref={container}
        >
          {/* MOBILE IMAGE */}
          <div
            ref={imageWrapperRef2}
            className="flex md:hidden h-96 w-80 p-4 mb-48 bg-cover bg-center relative overflow-hidden"
          >
            <div
              ref={imageParallaxRef2}
              className="absolute inset-0 will-change-transform"
            >
              <Image
                src="/img/main.jpg"
                alt="Hero Image"
                fill
                className="rounded-none grayscale object-cover"
              />
            </div>
          </div>

          {/* HERO TEXT */}
          <div className="text-[4rem] sm:text-[6rem] md:text-[10rem] lg:text-[13rem] font-primary absolute bottom-56 sm:top-52 md:top-20  leading-none m-0 p-0 tracking-wider text-center px-2">
            <h1
              style={{
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
              }}
              id="hero-text"
            >
              SUJOY<span className="space">&nbsp;&nbsp;</span>MAJI
            </h1>
          </div>

          {/* SIDE TEXT + DESKTOP IMAGE */}
          <div className="flex flex-col gap-6 md:flex-row w-full max-w-full h-auto md:h-60 justify-between font-second absolute bottom-32 md:bottom-28">
            {/* Side text */}
            <p
              className=" bottom-20 text-sm sm:text-base md:text-xl leading-tight md:leading-none text-center md:text-left w-full max-w-full sm:w-full sm:max-w-full md:w-1/2 md:max-w-[50%] ml-0 p-4 sm:p-0 md:ml-20 break-words "
              id="side-text"
              style={{ overflowWrap: "anywhere" }}
            >
              Hey there! I`m the kind of human who codes by day and games by
              night. Occasionally, I do both at once (don`t ask how). If you`re
              curious or dangerously bored, grab my{" "}
              <a
                href="/assets/SujoyResume.pdf"
                download
                className="cursor-pointer hover:opacity-80 transition-opacity duration-300 underline"
              >
                resume,
              </a>{" "}
              it`s less boring, promise.
            </p>

            {/* DESKTOP IMAGE */}
            <div
              ref={imageWrapperRef}
              className="hidden md:flex h-80 w-1/3  p-4 mr-20 bg-cover bg-center relative overflow-hidden"
            >
              <div
                ref={imageParallaxRef}
                className="absolute inset-0 will-change-transform"
              >
                <Image
                  src="/img/main.jpg"
                  alt="Hero Image"
                  fill
                  className="rounded-none object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div ref={aboutSectionRef} className="rounded-lg">
          <About />
        </div>

        {/* Skill section */}
        <div id="skills-section">
          <Skills />
        </div>

        {/* Project Showcase */}
        <div>
          <ProjectShow />
        </div>

        {/* Footer */}
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Landing;
