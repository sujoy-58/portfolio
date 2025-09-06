import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const WhyMe = () => {
  const whymeContainer = useRef();

  useGSAP(() => {
    const heading = whymeContainer.current.querySelector("#why-me");
    const split = new SplitType(heading, { types: "words, chars" });

    gsap.set(split.chars, { y: 150, opacity: 0 });

    gsap.to(split.chars, {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.05,
      ease: "power4.out",
      scrollTrigger: {
        trigger: whymeContainer.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  }, []);

  useGSAP(() => {
    const sideText = new SplitType("#whyMe-side-text", {
      types: "lines",
      tagName: "div",
      lineClass: "line",
    });

    sideText.lines.forEach((line) => {
      const content = line.innerHTML;
      line.innerHTML = `<span>${content}</span>`;
    });

    gsap.set("#whyMe-side-text .line span", {
      y: 200,
      opacity: 0,
    });

    gsap.to("#whyMe-side-text .line span", {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.05,
      ease: "power4.out",
      delay: 0.5,
      scrollTrigger: {
        trigger: whymeContainer.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  }, []);

  useGSAP(() => {
    const sideText2 = new SplitType("#whyMe-side-text2", {
      types: "lines",
      tagName: "div",
      lineClass: "line",
    });

    sideText2.lines.forEach((line) => {
      const content = line.innerHTML;
      line.innerHTML = `<span>${content}</span>`;
    });

    gsap.set("#whyMe-side-text2 .line span", {
      y: 200,
      opacity: 0,
    });

    gsap.to("#whyMe-side-text2 .line span", {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.05,
      ease: "power4.out",
      delay: 0.8,
      scrollTrigger: {
        trigger: whymeContainer.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  }, []);

  return (
    <div
      ref={whymeContainer}
      className="w-screen min-h-[400px] flex flex-col md:flex-row justify-around items-center p-2 sm:p-4"
    >
      <div className="font-second mb-6 md:mb-0 text-center md:text-left">
        <h3
          id="why-me"
          className="text-4xl md:text-5xl"
          style={{
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          }}
        >
          WHY ME?
        </h3>
      </div>
      <div className="font-second text-sm sm:text-base md:text-xl text-center md:text-left w-full md:max-w-[50%]">
        <p id="whyMe-side-text">
          I craft engaging digital experiences with clean, functional code for
          people who appreciate thoughtful design. As a developer, programmer
          from India, I pour my curiosity and passion into every line of code I
          write. I`m always learning, leveling up my skills, and building things
          that not only work, but feel great to use
        </p>

        <p id="whyMe-side-text2" className="mt-6">
          When I`m not working on exciting projects, you`ll find me enjoying
          weightlifting, top fragging in Valorant, and planning spontaneous
          trips, which, obviously, never get completed
        </p>
      </div>
    </div>
  );
};

export default WhyMe;
