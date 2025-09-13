"use client";
import { useEffect, useRef, useState } from "react";
import { useTransitionRouter } from "next-view-transitions"; // ✅ instead of next/navigation
import Lenis from "@studio-freight/lenis";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Modal from "@/app/components/Landing/components/modal";
import Project from "@/app/components/Landing/components/Project";

gsap.registerPlugin(ScrollTrigger);

const HeroProjects = [
  { title: "Sunchase", slug: "sunchase", src: "1.jpg", color: "#000000" },
  { title: "Quick.Do", slug: "quick-do", src: "2.jpg", color: "#8C8C8C" },
  { title: "Tik Tak Toe", slug: "tic-tac-toe", src: "3.jpg", color: "#EFE8D3" },
  { title: "Animation Web", slug: "animation-web", src: "4.jpg", color: "#706D63" },
];

export default function ProjectShow() {
  const workContainer = useRef(null);
  const [modal, setModal] = useState({ active: false, index: 0 });
  const router = useTransitionRouter(); // ✅ use this instead of useRouter

  // Smooth scroll
  useEffect(() => {
    const lenis = new Lenis();
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, []);

  // GSAP animation for "WORKS"
  useGSAP(() => {
    const workText = new SplitType("#work-text", { types: "words, chars" });
    gsap.set(workText.chars, { y: 200, opacity: 0 });
    gsap.to(workText.chars, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.08,
      ease: "power4.out",
      scrollTrigger: {
        trigger: workContainer.current,
        start: "top 50%",
        toggleActions: "play none none none",
      },
    });
  }, []);

  // GSAP animation for side-text
  useGSAP(() => {
    const sideText = new SplitType("#work-side-text", {
      types: "lines",
      tagName: "div",
      lineClass: "line",
    });

    sideText.lines.forEach((line) => {
      const content = line.innerHTML;
      line.innerHTML = `<span>${content}</span>`;
    });

    gsap.set("#work-side-text .line span", { y: 200, opacity: 0 });
    gsap.to("#work-side-text .line span", {
      y: 0,
      opacity: 1,
      duration: 1.5,
      stagger: 0.2,
      ease: "power4.out",
      delay: 0.5,
      scrollTrigger: {
        trigger: workContainer.current,
        start: "top 60%",
        toggleActions: "play none none none",
      },
    });
  }, []);

  // ✅ Same transition logic from Fliplink
  function slideInOut() {
    document.documentElement.animate(
      [
        { opacity: 1, transform: "translateY(0)" },
        { opacity: 0.2, transform: "translateY(-35%)" },
      ],
      {
        duration: 1500,
        easing: "cubic-bezier(0.87, 0, 0.13, 1)",
        fill: "forwards",
        pseudoElement: "::view-transition-old(root)",
      }
    );

    document.documentElement.animate(
      [
        { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
        { clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)" },
      ],
      {
        duration: 1500,
        easing: "cubic-bezier(0.87, 0, 0.13, 1)",
        fill: "forwards",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  }

  const handleClick = (slug) => {
    router.push(`/work/${slug}`, { onTransitionReady: slideInOut }); // ✅ triggers transition
  };

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <main>
      <div ref={workContainer}>
        <div className="relative w-full md:w-screen h-[200px] md:h-[400px] font-primary leading-none tracking-wider bg-[#deddd9] flex flex-col items-center px-2 sm:px-10">
          <h1
            id="work-text"
            className="text-[#1e1e1e] text-[4rem] sm:text-[6rem] md:text-[10rem] lg:text-[13rem] mb-2 md:mb-8 md:text-left text-center w-full"
            style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
          >
            WORKS
          </h1>
          <p
            id="work-side-text"
            className="text-[#1e1e1e] text-sm sm:text-base md:text-xl leading-snug sm:leading-normal md:leading-none font-second relative md:absolute md:bottom-10 md:right-10 w-full md:w-[60%] mt-4 md:mt-0 text-center md:text-right"
          >
            Every project is a playground where I blend ideas, design, and code
            to build something unique. I love experimenting with visuals,
            interactions, and storytelling, turning concepts into digital
            experiences that feel fresh, engaging, and full of character.
          </p>
        </div>
      </div>

      {/* Projects list */}
      <div className="flex h-auto md:h-[80vh] items-center justify-center bg-[#deddd9] z-40">
        <div className="w-screen flex flex-col items-center justify-center font-second">
          {HeroProjects.map((project, index) => (
            <Project
              key={index}
              index={index}
              title={project.title}
              setModal={setModal}
              onClick={() => handleClick(project.slug)} // ✅ now uses transition
            />
          ))}
        </div>

        {/* Modal only visible on desktop */}
        {!isMobile && <Modal modal={modal} projects={HeroProjects} />}
      </div>
    </main>
  );
}
