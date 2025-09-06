"use client";

import React from "react";
import Fliplink from "../common/Fliplink";
import Magnet from "../common/Magnet";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const MainNav = ({ setIsOpen }) => {
  return (
    <nav className="h-screen w-screen bg-[#0b0b0b] z-40">
      {/* Close Button */}
      <div
        className="fixed top-6 right-6 z-50 space-y-2 cursor-pointer"
        onClick={() => setIsOpen(false)}
      >
        <motion.div
          className="w-[50px] h-[1.8px] bg-[#DEDDD9] origin-left"
          initial={{ rotate: 0 }}
          animate={{ rotate: 20 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
        <motion.div
          className="w-[50px] h-[1.8px] bg-[#DEDDD9]"
          initial={{ rotate: 0 }}
          animate={{ rotate: -20 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      </div>

      {/* Main Content */}
      <div
        className="
          main
          h-full w-full
          font-primary
          flex flex-col md:flex-row
          justify-center md:justify-evenly
          items-center
          text-[#DEDDD9]
          font-thin
          px-4
          space-y-12 md:space-y-0
        "
      >
        {/* Navigation Links */}
        <div
          className="
            main-links
            text-5xl md:text-8xl
            flex flex-col gap-2
            items-center md:items-start
            text-center md:text-left
            mt-16 md:mt-20
          "
        >
          <Fliplink href="/">HOME</Fliplink>
          <Fliplink href="/about">ABOUT</Fliplink>
          <Fliplink href="/work">WORK</Fliplink>
          <Fliplink href="/contact">CONTACT</Fliplink>
        </div>

        {/* Social Links and Button */}
        <div
          className="
            social
            font-third
            flex flex-col items-center md:items-start
            text-center md:text-left
          "
        >
          <div className="socials-links flex flex-col gap-2 items-center md:items-start text-xl md:text-2xl">
            <div className="flex justify-center items-center gap-1">
              <Fliplink href="#">EMAIL</Fliplink>
              <ArrowUpRight />
            </div>
            <div className="flex justify-center items-center gap-1">
              <Fliplink href="#">LINKEDIN</Fliplink>
              <ArrowUpRight />
            </div>
            <div className="flex justify-center items-center gap-1">
              <Fliplink href="#">GITHUB</Fliplink>
              <ArrowUpRight />
            </div>
            <div className="flex justify-center items-center gap-1">
              <Fliplink href="#">INSTAGRAM</Fliplink>
              <ArrowUpRight />
            </div>
          </div>

          <Magnet>
            <button className="hire h-9 w-40 border border-[#DEDDD9] text-[#DEDDD9] rounded-full mt-6">
              HIRE ME
            </button>
          </Magnet>
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
