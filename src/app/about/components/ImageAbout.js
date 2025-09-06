import Image from "next/image";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const ImageAbout = () => {
  const aboutImageContainer = useRef();
  const aboutImageParallax = useRef();

  // ======================
  // TEXT ANIMATION
  // ======================
  useGSAP(() => {
    const aboutName = new SplitType("#inner-text", { types: "words, chars" });
    gsap.set(aboutName.chars, { y: 200, opacity: 0 });

    gsap.to(aboutName.chars, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.08,
      ease: "power4.out",
      scrollTrigger: {
        trigger: aboutImageContainer.current,
        start: "top 50%",
        toggleActions: "play none none none",
      },
    });
  }, []);

  // ======================
  // ENTRY ANIMATION (fade + zoom)
  // ======================
  useGSAP(() => {
    if (aboutImageParallax.current) {
      gsap.fromTo(
        aboutImageParallax.current,
        { opacity: 0, scale: 1.1 }, // starts invisible & slightly zoomed
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          delay: 1.2,
        }
      );
    }
  }, []);

  // ======================
  // PARALLAX BACKGROUND EFFECT
  // ======================
  useGSAP(() => {
    if (aboutImageParallax.current) {
      gsap.fromTo(
        aboutImageParallax.current,
        { y: "-20%" }, // start slightly shifted
        {
          y: "20%", // scroll moves image
          ease: "none",
          scrollTrigger: {
            trigger: aboutImageContainer.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }
  }, []);

  return (
    <div
      ref={aboutImageContainer}
      className="w-[80vw] h-[75vh] relative rounded-2xl overflow-hidden will-change-transform"
    >
      {/* Parallax Image Layer */}
      <div ref={aboutImageParallax} className="absolute inset-0">
        <Image
          src={`/img/main.jpg`}
          alt="image"
          fill
          priority
          className="!w-full !h-full object-cover object-center rounded-2xl"
        />
      </div>

      {/* Overlay Text */}
      <div className="absolute font-primary bottom-10 sm:bottom-0 right-8 z-10">
        <h1
          id="inner-text"
          className="text-[#deddd9] text-[5rem] sm:text-[7rem] md:text-[10rem] lg:text-[10rem] m-0 p-0 leading-none whitespace-nowrap tracking-wider"
        >
          SUJOY.
        </h1>
      </div>
    </div>
  );
};

export default ImageAbout;
