import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const Hire = () => {
  const hireContainer = useRef();

  useGSAP(() => {
    const project = hireContainer.current.querySelector("#hire1");
    const split = new SplitType(project, { types: "words, chars" });

    gsap.set(split.chars, { y: 150, opacity: 0 });

    gsap.to(split.chars, {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.05,
      ease: "power4.out",
      scrollTrigger: {
        trigger: hireContainer.current,
        start: "top 50%",
        toggleActions: "play none none none",
        // Remove clipPath from here
      },
    });

    const project2 = hireContainer.current.querySelector("#hire2");
    const split2 = new SplitType(project2, { types: "words, chars" });

    gsap.set(split2.chars, { y: 150, opacity: 0 });

    gsap.to(split2.chars, {
      y: 0,
      opacity: 1,
      duration: 1.5,
      stagger: 0.05,
      delay: 0.5,
      ease: "power4.out",
      scrollTrigger: {
        trigger: hireContainer.current,
        start: "top 70%",
        toggleActions: "play none none none",
        // Remove clipPath from here
      },
    });
  }, []);
  return (
    <>
      <div
        ref={hireContainer}
        className="w-screen h-[400px] flex justify-around items-center relative"
      >
        <div className=" w-full font-primary leading-none ml-28 mr-32">
        <h1 id="hire1" className="text-[10rem] text-start">ANYTHING</h1>
        <h1 id="hire2" className="text-[10rem] text-right">IN MIND?</h1>
        </div>
      </div>
    </>
  );
};

export default Hire;
