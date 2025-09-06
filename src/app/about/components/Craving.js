"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { Watch } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Craving = () => {
  const gridRef = useRef(null);

  // UseGSAP for text animation
  useGSAP(() => {
    const cravingTitle = new SplitType("#craving-text", {
      types: "words, chars",
    });
    gsap.set(cravingTitle.chars, { y: 200, opacity: 0 });

    gsap.to(cravingTitle.chars, {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.03,
      ease: "power4.out",
      scrollTrigger: {
        trigger: gridRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
        lazy: true,
        invalidateOnRefresh: true,
      },
    });
  }, []);

  // Border + container animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".grid-container",
          start: "top 80%",
          toggleActions: "play none none none",
          lazy: true,
        },
      });

      tl.fromTo(
        ".grid-container",
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power2.out" }
      );

      tl.fromTo(
        [
          ".border-animate-a",
          ".border-animate-b",
          ".border-animate-c",
          ".border-animate-d",
          ".border-animate-e",
        ],
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          transformOrigin: "left",
          ease: "power3.out",
          stagger: { amount: 0.4, from: "edges" },
        }
      );
    }, gridRef);

    return () => ctx.revert();
  }, []);

  // Helper grid cell component
  const GridBox = ({ img, extraClass = "", children }) => (
    <div className={`relative overflow-hidden ${extraClass}`}>
      <div
        className="absolute inset-0 bg-cover bg-center opacity-0 hover:opacity-100 scale-100 hover:scale-105 transition-all duration-700 z-0 hover:brightness-75"
        style={{
          backgroundImage: `url(${img})`,
          willChange: "transform, opacity",
        }}
      />
      <div className="z-20 h-full w-full flex justify-center items-center p-4">
        {children}
      </div>
    </div>
  );

  return (
    <div
      ref={gridRef}
      className="h-[200vh] w-screen flex justify-center items-center flex-col bg-[#1e1e1e] gap-8 relative"
    >
      <div className="text-[2.5rem] sm:text-[6rem] font-second text-[#deddd9] text-center">
        <h2
          id="craving-text"
          style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
        >
          WHAT I`M CRAVING FOR
        </h2>
      </div>

      <div className="grid-container h-3/4 w-[90vw] border border-[#deddd9] rounded-2xl flex flex-col opacity-0 overflow-hidden">
        {/* Upper Section */}
        <div className="flex flex-1 border-b border-[#deddd9] border-animate-a flex-col sm:flex-row">
          <GridBox
            img="/images/travel.jpg"
            extraClass="flex-1 border-b sm:border-b-0 sm:border-r border-[#deddd9] border-animate-b relative"
          >
            <div className="flex flex-col items-center text-white gap-2 ">
              <div className="flex items-center gap-2 absolute top-4 left-4 text-xs font-second">
                <Watch size={12} />
                <span>Since 2003</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-second">TRAVELLING</h2>
            </div>
          </GridBox>
          <GridBox img="/images/gaming.jpg" extraClass="basis-2/3">
            <div className="flex flex-col items-center text-white gap-2 ">
              <div className="flex items-center gap-2 absolute top-4 left-4 text-xs font-second">
                <Watch size={12} />
                <span>Since 2003</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-second">GAMING</h2>
            </div>
          </GridBox>
        </div>

        {/* Lower Section */}
        <div className="flex flex-1 flex-col sm:flex-row">
          <GridBox
            img="/images/guiter.jpg"
            extraClass="flex-1 border-b sm:border-b-0 sm:border-r border-[#deddd9] border-animate-c"
          >
            <div className="flex flex-col items-center text-white gap-2 ">
              <div className="flex items-center gap-2 absolute top-4 left-4 text-xs font-second">
                <Watch size={12} />
                <span>Since 2003</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-second">GUITER</h2>
            </div>
          </GridBox>
          <GridBox
            img="/images/photography.jpg"
            extraClass="flex-1 border-b sm:border-b-0 sm:border-r border-[#deddd9] border-animate-d"
          >
            <div className="flex flex-col items-center text-white gap-2 ">
              <div className="flex items-center gap-2 absolute top-4 left-4 text-xs font-second">
                <Watch size={12} />
                <span>Since 2020</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-second">PHOTOGRAPHY</h2>
            </div>
          </GridBox>
          <GridBox img="/images/ladakh.jpg" extraClass="flex-1 border-animate-e">
            <div className="flex flex-col items-center text-white gap-2 ">
              <div className="flex items-center gap-2 absolute top-4 left-4 text-xs font-second">
                <Watch size={12} />
                <span>Since 2020</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-second">LADAKH</h2>
            </div>
          </GridBox>
        </div>

        {/* 3rd Section */}
        <div className="flex flex-1 border-t border-[#deddd9] border-animate-a flex-col sm:flex-row">
          <GridBox
            img="/images/development.jpg"
            extraClass="basis-2/3 border-b sm:border-b-0 sm:border-r border-[#deddd9] border-animate-b relative"
          >
            <div className="flex flex-col items-center text-white gap-2 ">
              <div className="flex items-center gap-2 absolute top-4 left-4 text-xs font-second">
                <Watch size={12} />
                <span>Since 2020</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-second">DEVELOPMENT</h2>
            </div>
          </GridBox>
          <GridBox img="/images/gym.jpg" extraClass="flex-1">
            <div className="flex flex-col items-center text-white gap-2 ">
              <div className="flex items-center gap-2 absolute top-4 left-4 text-xs font-second">
                <Watch size={12} />
                <span>Since 2003</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-second">GYM</h2>
            </div>
          </GridBox>
        </div>
      </div>
    </div>
  );
};

export default Craving;
