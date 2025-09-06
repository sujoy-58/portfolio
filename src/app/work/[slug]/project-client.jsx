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
  const hasTriggeredRef = useRef(false);
  const projectHeroText = useRef(null);
  const heroPageProjectRef = useRef(null);

  const mainContentRef = useRef(null);

  const router = useRouter();

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [shouldUpdateProgress, setShouldUpdateProgress] = useState(true);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);



    // Inside useEffect
    gsap.set(projectNavRef.current, {
      opacity: 0,
      y: -100,
    });

    gsap.to(projectNavRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.25,
      ease: "power4.out",
    });

    gsap.set(ProjectDescriptionRef.current, {
      opacity: 0,
      y: 50,
    });

    gsap.to(ProjectDescriptionRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.5,
      ease: "power4.out",
    });

    // gsap.set(projectHeroText.current, {
    //   // y: 100,
    //   opacity: 0,
    // });

    // gsap.to(projectHeroText.current, {
    //   // y: 0,
    //   opacity: 1,
    //   duration: 1.5,
    //   delay: 0.7,
    //   ease: "power4.out",
    // });

    const navScrollTrigger = ScrollTrigger.create({
      trigger: mainContentRef.current,
      start: "top top",
      end: "bottom bottom",
      markers: true,
      onUpdate: (self) => {
        if (progressBarRef.current) {
          gsap.set(progressBarRef.current, {
            scaleX: self.progress,
          });
        }
      },
    });

    const footerScrollTrigger = ScrollTrigger.create({
      trigger: footerRef.current,
      start: "top top",
      end: `+=${window.innerHeight * 3}px`,
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

        if (self.progress >= 1 && !isTransitioning) {
          setShouldUpdateProgress(false);
          setIsTransitioning(true);

          const tl = gsap.timeline();

          tl.set(nextProjectProgressBarRef.current, {
            scaleX: 1,
          });

          tl.to(
            [
              footerRef.current?.querySelector(".project-footer-copy"),
              footerRef.current?.querySelector(".next-project-progress"),
            ],
            {
              opacity: 0,
              duration: 0.3,
              ease: "power3.inOut",
            }
          );

          tl.call(() => {
            window.location.replace(`/work/${nextProject.slug}`);
            // router.push(`/work/${nextProject.slug}`);
          });
        }
      },
    });
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [nextProject.slug, isTransitioning, shouldUpdateProgress]);

  return (
    <div className="project-page overflow-x-hidden">
      <div
      ref={mainContentRef}
      >
        <div
          ref={projectNavRef}
          className="project-nav fixed top-0 left-0 w-screen flex justify-between z-20 sm:w-screen"
        >
          <div className="project-page-scroll-progress relative flex-[2] h-[3px] flex  justify-center items-center overflow-hidden bg-[#deddd9] backdrop-blur-[20px]">
            <div
              ref={progressBarRef}
              className="project-page-scroll-progress-bar absolute top-0 left-0 w-full h-full bg-[#1e1e1e] scale-x-0 origin-left rounded-md will-change-transform -z-10"
            ></div>
          </div>
        </div>

        <div
          ref={heroPageProjectRef}
          className="project-hero relative w-screen h-[100svh] flex justify-center items-center"
        >
          <div
            className=" absolute left-10 font-second font-semibold text-sm flex justify-center items-center gap-1 cursor-pointer"
            onClick={() => {
              gsap.to(".project-page", {
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                  window.location.replace(`/work/${prevProject.slug}`);
                },
              });
            }}
          >
            <ArrowLeft size={14} />
            {/* <Link href={`/work/${prevProject.slug}`}>Previous</Link> */}
            Previous
          </div>

          <h1
            id="project-hero-txt"
            ref={projectHeroText}
            className="text-[6rem] font-primary"
          >
            {project.title}
          </h1>

          <div
            className=" absolute right-10  font-second font-semibold text-sm flex justify-center items-center gap-1"
            onClick={() => {
              gsap.to(".project-page", {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                  window.location.replace(`/work/${nextProject.slug}`);
                },
              });
            }}
          >
            {/* <Link href={`/work/${nextProject.slug}`}>Next</Link> */}Next
            <ArrowRight size={14} />
          </div>

          <p
            ref={ProjectDescriptionRef}
            id="project-description"
            className="absolute bottom-[10%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center font-second text-lg"
          >
            {project.description}
          </p>
        </div>

        <div className="project-images">
          {project.images &&
            project.images.map((image, index) => (
              <div className="project-image" key={index}>
                <img src={image} alt="projectImage" />
              </div>
            ))}
        </div>
      </div>

      <div
        ref={footerRef}
        className="project-footer relative w-screen h-[100svh] flex justify-center items-center"
      >
        <h1 className="text-[6rem] font-primary">{nextProject.title}</h1>
        <div className="project-footer-copy absolute top-[35%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-second text-lg">
          <p>Next Project</p>
        </div>

        <div className="next-project-progress absolute bottom-[25%] w-1/2 h-[1px] bg-transparent">
          <div
            ref={nextProjectProgressBarRef}
            className="next-project-progress-bar absolute rounded-full top-0 left-0 w-full h-full bg-[#0b0b0b] scale-x-0 will-change-transform"
          ></div>
        </div>
      </div>
    </div>
  );
}
