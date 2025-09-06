import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Philosophy = () => {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphsRef = useRef([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Heading animation
    const headingSplit = new SplitType(headingRef.current, {
      types: "words, chars",
    });
    gsap.set(headingSplit.chars, { y: 200, opacity: 0 });

    gsap.to(headingSplit.chars, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.08,
      ease: "power4.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 50%",
        toggleActions: "play none none none",
      },
    });

    // Paragraph animations
    paragraphsRef.current.forEach((p) => {
      const split = new SplitType(p, { types: "lines" });

      split.lines.forEach((line) => {
        const content = line.innerHTML;
        line.innerHTML = `<span>${content}</span>`;
      });

      gsap.set(p.querySelectorAll("span"), {
        y: 200,
        opacity: 0,
      });

      gsap.to(p.querySelectorAll("span"), {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.08,
        delay: 0.8,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 50%",
          toggleActions: "play none none none",
        },
      });
    });
  }, []);

  const paragraphTexts = [
    `1. I believe in designing websites that do more than just look good — they should tell a story, reflect a brand's soul, and function intuitively. My process combines empathy, strategy, and creative execution to build digital experiences that connect.`,
    `2. Every design decision is intentional. I aim to blend aesthetics with purpose, ensuring each pixel contributes to a seamless and engaging user experience.`,
    `3. My philosophy is rooted in continuous learning and collaboration. Great design is a dialogue, not a monologue — and I strive to evolve with every project.`,
    `4. I strive for balance in my work — constantly learning, pushing boundaries in my projects, and finding creative solutions to challenges. Every day is an opportunity to improve and evolve`,
  ];

  return (
    <div
      ref={containerRef}
      className="min-h-screen w-screen flex justify-center relative font-second p-4"
    >
      <div className="h-[85%] w-full sm:w-11/12 mt-10 relative border-2 border-[#1e1e1e] rounded-2xl p-4 sm:p-8">
        <div className="flex items-center justify-center text-center">
          <h2
            ref={headingRef}
            className="text-[2.5rem] sm:text-[6rem] font-second text-[#1e1e1e] z-10 mt-6 leading-tight"
            style={{
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            }}
          >
            MY PHILOSOPHY
          </h2>
        </div>

        {paragraphTexts.map((text, i) => (
          <p
            key={i}
            ref={(el) => (paragraphsRef.current[i] = el)}
            className="text-base sm:text-xl text-[#1e1e1e] mt-6 sm:ml-16  max-w-full sm:max-w-4xl text-left leading-snug sm:leading-normal"
          >
            {text}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Philosophy;
