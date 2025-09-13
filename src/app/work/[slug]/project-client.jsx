"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Magnet from "@/app/common/Magnet";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectClient({ project, nextProject, prevProject }) {
  const projectNavRef = useRef(null);
  const progressBarRef = useRef(null);
  const ProjectDescriptionRef = useRef(null);
  const footerRef = useRef(null);
  const nextProjectProgressBarRef = useRef(null);
  const mainContentRef = useRef(null);

  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);

  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [shouldUpdateProgress, setShouldUpdateProgress] = useState(true);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    setWindowHeight(window.innerHeight);
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    gsap.set(projectNavRef.current, { opacity: 0, y: -100 });
    gsap.to(projectNavRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.25,
      ease: "power4.out",
    });

    gsap.set(ProjectDescriptionRef.current, { opacity: 0, y: 50 });
    gsap.to(ProjectDescriptionRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.5,
      ease: "power4.out",
    });

    gsap.fromTo(
      prevBtnRef.current,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        delay: 0.6,
        ease: "power4.out",
      }
    );

    gsap.fromTo(
      nextBtnRef.current,
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        delay: 0.6,
        ease: "power4.out",
      }
    );

    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: mainContentRef.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        if (progressBarRef.current && shouldUpdateProgress) {
          gsap.set(progressBarRef.current, { scaleX: self.progress });
        }
      },
    });

    const isMobile = window.innerWidth < 768;
    const endValue = isMobile ? windowHeight * 1.8 : windowHeight * 2.5;

    const footerScrollTrigger = ScrollTrigger.create({
      trigger: footerRef.current,
      start: "top top",
      end: `+=${endValue}px`,
      pin: true,
      pinSpacing: true,
      onEnter: () => {
        if (projectNavRef.current && !isTransitioning) {
          gsap.to(projectNavRef.current, {
            y: -100,
            duration: 0.5,
            ease: "power2.inOut",
          });
        }
      },
      onLeaveBack: () => {
        if (projectNavRef.current && !isTransitioning) {
          gsap.to(projectNavRef.current, {
            y: 0,
            duration: 0.5,
            ease: "power2.inOut",
          });
        }
      },
      onUpdate: (self) => {
        if (nextProjectProgressBarRef.current && shouldUpdateProgress) {
          gsap.set(nextProjectProgressBarRef.current, {
            scaleX: self.progress,
          });
        }
        const progressThreshold = isMobile ? 0.85 : 1;
        if (self.progress >= progressThreshold && !isTransitioning) {
          setShouldUpdateProgress(false);
          setIsTransitioning(true);
          const tl = gsap.timeline();
          tl.set(nextProjectProgressBarRef.current, { scaleX: 1 });
          tl.to(
            [
              footerRef.current?.querySelector(".project-footer-copy"),
              footerRef.current?.querySelector(".next-project-progress"),
            ],
            { opacity: 0, duration: 0.3, ease: "power3.inOut" }
          );
          tl.call(() => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
            window.location.href = `/work/${nextProject.slug}`;
          });
        }
      },
    });

    return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }, [nextProject.slug, isTransitioning, shouldUpdateProgress, windowHeight]);

  const handleNavigation = (slug) => {
    setIsTransitioning(true);
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    router.push(`/work/${slug}`);
  };

  // Parallax + entry animation for each image
  const ParallaxImage = ({ src }) => {
    const imageRef = useRef(null);

    useEffect(() => {
      if (!imageRef.current) return;

      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 1.1 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: imageRef.current, start: "top 80%" },
        }
      );

      gsap.fromTo(
        imageRef.current,
        { y: "-20%" },
        {
          y: "15%",
          ease: "none",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, []);

    return (
      <div className="relative w-full h-full overflow-hidden">
        <img
          ref={imageRef}
          src={src}
          alt="projectImage"
          className="w-full h-full object-cover"
        />
      </div>
    );
  };

  return (
    <div className="project-page overflow-x-hidden">
      <div ref={mainContentRef}>
        {/* Navbar */}
        <div
          ref={projectNavRef}
          className="project-nav fixed top-0 left-0 w-screen flex justify-between z-20"
        >
          <div className="project-page-scroll-progress relative flex-[2] h-[3px] flex justify-center items-center overflow-hidden bg-[#deddd9] backdrop-blur-[20px]">
            <div
              ref={progressBarRef}
              className="project-page-scroll-progress-bar absolute top-0 left-0 w-full h-full bg-[#1e1e1e] scale-x-0 origin-left rounded-md will-change-transform -z-10"
            />
          </div>
        </div>

        {/* Hero */}
        <div className="project-hero relative w-screen h-[100svh] flex justify-center items-center px-4 sm:px-10">
          <div className="absolute left-4 sm:left-10 top-1/2 -translate-y-1/2">
            <Magnet>
              <div
                ref={prevBtnRef}
                className="font-second font-semibold text-xs sm:text-sm hidden sm:flex items-center gap-1 cursor-pointer"
                onClick={() => handleNavigation(prevProject.slug)}
              >
                <ArrowLeft size={14} /> Prev
              </div>
            </Magnet>
          </div>

          <h1 className="text-[3rem] sm:text-[6rem] text-center leading-snug sm:leading-tight">
            {project.title}
          </h1>

          <div className="absolute right-4 sm:right-10 top-1/2 -translate-y-1/2">
            <Magnet>
              <div
                ref={nextBtnRef}
                className="font-second font-semibold text-xs sm:text-sm hidden sm:flex items-center gap-1 cursor-pointer"
                onClick={() => handleNavigation(nextProject.slug)}
              >Next
                <ArrowRight size={14} /> 
              </div>
            </Magnet>
          </div>

          <p
            ref={ProjectDescriptionRef}
            className="absolute bottom-[15%] sm:bottom-[10%] left-1/2 transform -translate-x-1/2 font-second text-center text-sm sm:text-lg w-[90%] sm:w-auto"
          >
            {project.description}
          </p>
        </div>

        {/* Project Images */}
        <div className="project-images">
          {/* 1st image full width */}
          {project.images[0] && (
            <div className="w-full h-[80vh] sm:h-screen">
              <ParallaxImage src={project.images[0]} />
            </div>
          )}

          {/* 2nd & 3rd images half width */}
          {(project.images[1] || project.images[2]) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.images[1] && (
                <div className="w-full h-[60vh] sm:h-[80vh]">
                  <ParallaxImage src={project.images[1]} />
                </div>
              )}
              {project.images[2] && (
                <div className="w-full h-[60vh] sm:h-[80vh]">
                  <ParallaxImage src={project.images[2]} />
                </div>
              )}
            </div>
          )}

          {/* 4th image full width */}
          {project.images[3] && (
            <div className="w-full h-[80vh] sm:h-screen">
              <ParallaxImage src={project.images[3]} />
            </div>
          )}

          {/* 5th image with description */}
          {project.images[4] && (
            <div className="w-full p-4 sm:p-10">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="w-full sm:w-1/2 h-[60vh] sm:h-[70vh]">
                  <ParallaxImage src={project.images[4]} />
                </div>
                <div className="flex flex-col justify-center w-full sm:w-1/2 px-2 sm:px-0">
                  <h2 className="font-second text-2xl sm:text-3xl mb-4">
                    {project.details}
                  </h2>
                  <p className="font-second text-sm sm:text-lg leading-relaxed">
                    {project.extraDescription ||
                      "This is an additional description for the last image."}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div
        ref={footerRef}
        className="project-footer relative w-screen h-[100svh] flex justify-center items-center px-4 sm:px-0"
      >
        <h1 className="text-[3rem] sm:text-[6rem] text-center">
          {nextProject.title}
        </h1>
        <div className="project-footer-copy absolute top-[35%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-second text-sm sm:text-lg text-center">
          <p>Next Project</p>
        </div>
        <div className="next-project-progress absolute bottom-[25%] w-3/4 sm:w-1/2 h-[1px] bg-transparent">
          <div
            ref={nextProjectProgressBarRef}
            className="next-project-progress-bar absolute rounded-full top-0 left-0 w-full h-full bg-[#0b0b0b] scale-x-0 will-change-transform"
          />
        </div>
      </div>
    </div>
  );
}
