"use client";

import React, { useState, useRef } from "react";
import useMousePosition from "@/app/utils/useMousePosition";
import { motion } from "framer-motion";


const About = () => {
  const [isHovered, setIsHovered] = useState(false);
  // const Aboutcontainer = useRef();

  const { x, y } = useMousePosition();
  const size = isHovered ? 200 : 0;


  return (
    <div
      // ref={Aboutcontainer}
      id="about-section"
      className="relative w-full min-h-screen bg-[#1E1E1E]"
    >
      <motion.div
        id="about1"
        animate={{
          WebkitMaskPosition: `${x - size / 2}px ${y - size / 2}px`,
          WebkitMaskSize: `${size}px`,
        }}
        transition={{ type: "tween", ease: "backOut" }}
        className="max-w-full overflow-hidden flex flex-col justify-center items-center font-primary text-4xl text-center absolute"
      >
        <div className="upper-text h-screen  w-3/4 text-[#1E1E1E] flex flex-col justify-center items-center">
          <p
            onMouseEnter={() => {
              setIsHovered(true);
            }}
            onMouseLeave={() => {
              setIsHovered(false);
            }}
          >
            Though I`m Coder, I mostly code by copying from ChatGPT—don`t judge!
            I love music, but my singing talents are best kept a secret. I`m
            also a travel enthusiast who spends hours researching new
            destinations… but never actually makes it there. Dreaming of
            adventures is easier than the actual travel, right?
          </p>
        </div>
      </motion.div>
      {/* </motion.div> */}
      <div className="max-w-full overflow-hidden flex flex-col justify-center items-center font-primary text-4xl text-center text-[#DEDDD9]">
        <div className="lower-text  h-screen  w-3/4 flex flex-col justify-center items-center">
          <motion.p
            id="about-main-text"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay:0.5 }}
            viewport={{ once: true }}
          >
            A web developer with a strong focus on creating seamless, scalable
            web solutions using Next Js. While my primary passion lies in web
            development, I also have a keen interest in Data Structures and
            Algorithms, constantly enhancing my problem-solving skills to build
            efficient, impactful applications.
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default About;
