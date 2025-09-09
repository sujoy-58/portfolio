"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import imagesLoaded from "imagesloaded";

export default function ProjectClient({ project, nextProject, prevProject }) {
  const projectNavRef = useRef(null);
  const progressBarRef = useRef(null);
  const ProjectDescriptionRef = useRef(null);
  const footerRef = useRef(null);
  const nextProjectProgressBarRef = useRef(null);
  const projectHeroText = useRef(null);
  const heroPageProjectRef = useRef(null);
  const mainContentRef = useRef(null);

  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [shouldUpdateProgress, setShouldUpdateProgress] = useState(true);
  const [windowHeight, setWindowHeight] = useState(0);

  // 🔹 Force reset scroll to top on every mount
  useEffect(() => {
    window.scrollTo(0, 0);
    setWindowHeight(window.innerHeight);
    
    // Update window height on resize
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

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

    const navScrollTrigger = ScrollTrigger.create({
      trigger: mainContentRef.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        if (progressBarRef.current) {
          gsap.set(progressBarRef.current, { scaleX: self.progress });
        }
      },
    });

    // Create a more responsive footer trigger for mobile
    const createFooterTrigger = () => {
      // Use a smaller end value for mobile devices
      const isMobile = window.innerWidth < 768;
      const endValue = isMobile ? windowHeight * 1.8 : windowHeight * 2.5;
      
      return ScrollTrigger.create({
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
            gsap.set(nextProjectProgressBarRef.current, { scaleX: self.progress });
          }

          // Use a slightly lower threshold for mobile to ensure it triggers
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
              router.push(`/work/${nextProject.slug}`);
            });
          }
        },
      });
    };

    const footerScrollTrigger = createFooterTrigger();

    // Refresh ScrollTrigger on window resize
    const handleResizeRefresh = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResizeRefresh);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      window.removeEventListener('resize', handleResizeRefresh);
    };
  }, [nextProject.slug, isTransitioning, shouldUpdateProgress, router, windowHeight]);

  // Helper function to handle navigation
  const handleNavigation = (slug) => {
    setIsTransitioning(true);
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    router.push(`/work/${slug}`);
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
            ></div>
          </div>
        </div>

        {/* Hero Section */}
        <div
          ref={heroPageProjectRef}
          className="project-hero relative w-screen h-[100svh] flex justify-center items-center px-4 sm:px-10"
        >
          {/* Previous Button */}
          <div
            className="absolute left-4 sm:left-10 font-second font-semibold text-xs sm:text-sm flex justify-center items-center gap-1 cursor-pointer"
            onClick={() => handleNavigation(prevProject.slug)}
          >
            <ArrowLeft size={14} /> Previous
          </div>

          {/* Project Title */}
          <h1
            id="project-hero-txt"
            ref={projectHeroText}
            className="text-[2.5rem] sm:text-[4rem] md:text-[6rem] font-primary text-center px-2 leading-tight"
          >
            {project.title}
          </h1>

          {/* Next Button */}
          <div
            className="absolute right-4 sm:right-10 font-second font-semibold text-xs sm:text-sm flex justify-center items-center gap-1 cursor-pointer"
            onClick={() => handleNavigation(nextProject.slug)}
          >
            Next <ArrowRight size={14} />
          </div>

          {/* Description */}
          <p
            ref={ProjectDescriptionRef}
            id="project-description"
            className="absolute bottom-[15%] sm:bottom-[10%] left-1/2 transform -translate-x-1/2 text-center font-second text-sm sm:text-lg w-[90%] sm:w-auto"
          >
            {project.description}
          </p>
        </div>

        {/* Project Images */}
        <div className="project-images">
          {/* First full-page image */}
          {project.images[0] && (
            <div className="w-full h-[80vh] sm:h-screen">
              <img
                src={project.images[0]}
                alt="projectImage"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Two images in a row → stack on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {project.images[1] && (
              <div className="w-full h-[60vh] sm:h-[80vh]">
                <img
                  src={project.images[1]}
                  alt="projectImage"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            {project.images[2] && (
              <div className="w-full h-[60vh] sm:h-[80vh]">
                <img
                  src={project.images[2]}
                  alt="projectImage"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Fourth image full page */}
          {project.images[3] && (
            <div className="w-full h-[80vh] sm:h-screen">
              <img
                src={project.images[3]}
                alt="projectImage"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Fifth image with description → stack on mobile */}
          {project.images[4] && (
            <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-6 p-4 sm:p-10">
              <div className="w-full h-[60vh] sm:h-[70vh]">
                <img
                  src={project.images[4]}
                  alt="projectImage"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center px-2 sm:px-0">
                <h2 className="font-primary text-2xl sm:text-3xl mb-4">
                  Project Detail
                </h2>
                <p className="font-second text-sm sm:text-lg leading-relaxed">
                  {project.extraDescription ||
                    "This is an additional description for the last image."}
                </p>
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
        <h1 className="text-[2.5rem] sm:text-[6rem] font-primary text-center">
          {nextProject.title}
        </h1>
        <div className="project-footer-copy absolute top-[35%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-second text-sm sm:text-lg text-center">
          <p>Next Project</p>
        </div>
        <div className="next-project-progress absolute bottom-[25%] w-3/4 sm:w-1/2 h-[1px] bg-transparent">
          <div
            ref={nextProjectProgressBarRef}
            className="next-project-progress-bar absolute rounded-full top-0 left-0 w-full h-full bg-[#0b0b0b] scale-x-0 will-change-transform"
          ></div>
        </div>
      </div>
    </div>
  );
}