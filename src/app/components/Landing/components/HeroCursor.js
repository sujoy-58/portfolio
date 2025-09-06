// "use client";
// import { useState, useEffect, useRef } from "react";
// import gsap from "gsap";

// const HeroCursor = () => {
//   const cursorRef = useRef(null);
//   const [isMoving, setIsMoving] = useState(false);
//   const [isInsideSection, setIsInsideSection] = useState(false);
//   let timeoutId;

//   useEffect(() => {
//     if (!cursorRef.current) return;

//     const handleMouseMove = (e) => {
//       if (!cursorRef.current) return;
//       setIsMoving(true);

//       const imageWidth = cursorRef.current.offsetWidth;
//       const imageHeight = cursorRef.current.offsetHeight;

//       // Center the image on the cursor
//       const x = e.clientX - imageWidth / 2;
//       const y = e.clientY - imageHeight / 2;

//       // Smooth animation using GSAP (with slight delay for smooth effect)
//       gsap.to(cursorRef.current, {
//         left: x,
//         top: y,
//         duration: 1.5, // Smooth yet responsive
//         ease: "power3.out",
       
//       });

//       // Hide after 1 second of no movement
//       clearTimeout(timeoutId);
//       timeoutId = setTimeout(() => {
//         setIsMoving(false);
//       }, 800);
//     };

//     const handleMouseEnter = () => setIsInsideSection(true);
//     const handleMouseLeave = () => setIsInsideSection(false);

//     const section = document.getElementById("main-section");
//     if (section) {
//       section.addEventListener("mouseenter", handleMouseEnter);
//       section.addEventListener("mouseleave", handleMouseLeave);
//     }

//     window.addEventListener("mousemove", handleMouseMove, { passive: true });

//     return () => {
//       if (section) {
//         section.removeEventListener("mouseenter", handleMouseEnter);
//         section.removeEventListener("mouseleave", handleMouseLeave);
//       }
//       window.removeEventListener("mousemove", handleMouseMove);
//     };
//   }, []);

//   return (
//     <div
//       ref={cursorRef}
      // className="fixed pointer-events-none cursor-none h-[14rem] w-[10rem] grayscale z-[9999] rounded-md rotate-3"
      // style={{
      //   backgroundImage: "url('/images/dyal_thak/1.jpg')",
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      //   position: "fixed",
      //   left: 0,
      //   top: 0,
      //   opacity: isInsideSection && isMoving ? 1 : 0,
      //   transition: "opacity 0.6s ease-in-out",
        
      // }}
//     />
//   );
// };

// export default HeroCursor;



"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const HeroCursor = () => {
  const cursorRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!cursorRef.current) return;

      const x = e.clientX - 5;
      const y = e.clientY - 5;

      gsap.to(cursorRef.current, {
        left: x,
        top: y,
        duration: 0.2,
        ease: "power2.out",
      });
    };

    const sections = [
      document.getElementById("main-section"),
      document.getElementById("skills-section"),
      document.getElementById("route-work"),
       document.getElementById("route-about"),
       document.getElementById("route-about-imgabt"),
       document.getElementById("route-about-whyme"),
       document.getElementById("route-about-phyl"),

    ];

    const handleEnter = () => setIsVisible(true);
    const handleLeave = () => setIsVisible(false);

    sections.forEach((section) => {
      if (section) {
        section.addEventListener("mouseenter", handleEnter);
        section.addEventListener("mouseleave", handleLeave);
      }
    });

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      sections.forEach((section) => {
        if (section) {
          section.removeEventListener("mouseenter", handleEnter);
          section.removeEventListener("mouseleave", handleLeave);
        }
      });
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-[10px] h-[10px] rounded-full z-[9999] pointer-events-none transition-opacity duration-300"
      style={{
        backgroundColor: "white",
        mixBlendMode: "difference",
        opacity: isVisible ? 1 : 0,
      }}
    />
  );
};

export default HeroCursor;
