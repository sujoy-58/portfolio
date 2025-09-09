"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Footer = () => {
  const [hovering, setHovering] = useState(false);
  const [hoveredOnText, setHoveredOnText] = useState(false);
  const [copied, setCopied] = useState(false);
  const [cursorSize, setCursorSize] = useState(10);

  const container = useRef();
  const cursorRef = useRef();

  const currentYear = new Date().getFullYear();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e) => {
    const size = hoveredOnText ? 130 : 10;
    setCursorSize(size);
    
    x.set(e.clientX - size / 2);
    y.set(e.clientY - size / 2);
  };

  useEffect(() => {
    const updatePosition = (e) => {
      x.set(e.clientX - cursorSize / 2);
      y.set(e.clientY - cursorSize / 2);
    };
    
    if (window.matchMedia("(hover: none)").matches) return;
    
    window.addEventListener("mousemove", updatePosition);
    return () => window.removeEventListener("mousemove", updatePosition);
  }, [cursorSize, x, y]);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    const footerText = new SplitType("#footer-txt", { types: "words, chars" });
    gsap.set(footerText.chars, { y: 50, opacity: 0 });

    gsap.to(footerText.chars, {
      y: 0,
      opacity: 1,
      duration: 2,
      stagger: 0.1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: container.current,
        start: "top 50%",
        toggleActions: "play none none none",
      },
    });
  }, []);

  const handleTextClick = () => {
    navigator.clipboard.writeText("sujoymaji16@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      ref={container}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => {
        setHovering(false);
        setHoveredOnText(false);
        setCopied(false);
      }}
      className="main h-[80vh] w-screen flex flex-col justify-center items-center relative z-0 bg-[#deddd9] text-[#1e1e1e] px-4 sm:px-8"
    >
      {/* Side text */}
      <p className="text-[#1e1e1e] font-second absolute p-4 sm:p-0 bottom-56 sm:top-36 sm:right-20 text-sm sm:text-base md:text-xl leading-tight sm:leading-normal md:leading-none max-w-full sm:max-w-[60%] text-center sm:text-right ">
        Let`s connect and build ideas that matter. I enjoy creating impactful
        digital solutions with passion and precision, blending design with code
        to craft meaningful experiences for people everywhere.
      </p>

      {/* Custom Cursor with Bouncy Animations */}
      <AnimatePresence>
        {hovering && window.matchMedia("(hover: hover)").matches && (
          <motion.div
            ref={cursorRef}
            className="cursor fixed top-0 left-0 rounded-full pointer-events-none flex justify-center items-center uppercase text-base tracking-wide font-medium"
            style={{
              x: springX,
              y: springY,
              mixBlendMode: "difference",
              backgroundColor: "white",
              color: "black",
              zIndex: 50,
            }}
            initial={{ 
              scale: 0,
              opacity: 0,
              width: cursorSize,
              height: cursorSize
            }}
            animate={{ 
              scale: 1,
              opacity: 1,
              width: cursorSize,
              height: cursorSize,
              transition: {
                type: "spring",
                damping: 10,
                stiffness: 200,
                mass: 0.5
              }
            }}
            exit={{ 
              scale: 0,
              opacity: 0,
              transition: {
                type: "spring",
                damping: 15,
                stiffness: 300
              }
            }}
            transition={{ 
              type: "spring",
              damping: 10,
              stiffness: 150,
              mass: 0.5
            }}
          >
            {hoveredOnText && (copied ? "Copied!" : "Copy Email")}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Footer Text */}
      <div className="text h-full w-full flex justify-center items-end sm:items-end  mb-10 font-primary text-[#1e1e1e] relative whitespace-nowrap tracking-wider">
        <h1
          className="cursor-pointer text-[4rem] sm:text-[6rem] md:text-[10rem] lg:text-[13rem] leading-none"
          id="footer-txt"
          onMouseEnter={() => {
            setHoveredOnText(true);
            setCursorSize(130);
          }}
          onMouseLeave={() => {
            setHoveredOnText(false);
            setCursorSize(10);
          }}
          onClick={handleTextClick}
        >
          SUJOY<span className="space">&nbsp;&nbsp;</span>MAJI
        </h1>
      </div>

      {/* Bottom Navigation */}
      <div
        className="
          bottom-nav 
          grid grid-cols-2 gap-y-3 gap-x-32
          sm:flex sm:flex-row sm:gap-0 
          h-auto sm:h-16 
          w-full sm:w-[95%] 
          justify-items-stretch sm:justify-between 
          items-start sm:items-center 
          bottom-10 left-0 right-0 
          mb-10 sm:mb-0
          text-[#1e1e1e] 
          bg-transparent 
          font-second font-semibold text-xs sm:text-sm 
          sm:ml-4
        "
      >
        <div className="nav-inr-name leading-4">
          <p className="opacity-85">Copyright:</p>
          <p>All rights reserved, {currentYear}</p>
        </div>
        <div className="nav-inr-location leading-4">
          <p className="opacity-85">Relocate:</p>
          <a
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="hover:opacity-80 transition-opacity duration-300 cursor-pointer"
          >
            Go Back to top
          </a>
        </div>
        <div className="nav-inr-theme leading-4">
          <p className="opacity-85">Wanna Talk?:</p>
          <div className="flex flex-wrap gap-1">
            <a
              href="mailto:sujoymaji16@gmail.com"
              className="hover:opacity-80 transition-opacity duration-300"
            >
              Mail,
            </a>
            <a
              href="tel:+916304697737"
              className="hover:opacity-80 transition-opacity duration-300"
            >
              Number
            </a>
          </div>
        </div>
        <div className="nav-inr-location leading-4">
          <p className="opacity-85">Other links:</p>
          <div className="flex flex-wrap gap-1">
            <a href="https://www.linkedin.com/in/sujoymaji58/">Li,</a>
            <a href="https://github.com/sujoy-58">Github,</a>
            <a href="https://www.facebook.com/share/1Aoc8a2iqX/">Fb,</a>
            <a href="https://www.instagram.com/su__xd_?igsh=Njl4a3BtcjhxeGF4">In</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;