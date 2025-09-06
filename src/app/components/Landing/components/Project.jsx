"use client";
import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";

export default function Index({ index, title, setModal, onClick }) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <div
      onMouseEnter={() => {
        if (!isMobile) setModal({ active: true, index });
      }}
      onMouseLeave={() => {
        if (!isMobile) setModal({ active: false, index });
      }}
      onClick={onClick}
      className="flex w-full justify-between items-center py-[30px] px-[40px] sm:px-[80px] md:px-[100px] border-t border-[#c9c9c9] cursor-pointer transition-all duration-200 last:border-b hover:opacity-50 group"
    >
      <h2 className="text-[2rem] sm:text-[3rem] md:text-[60px] m-0 font-normal transition-all duration-400 group-hover:-translate-x-[10px]">
        {title}
      </h2>

      {/* arrow only shifts on hover in desktop */}
      <motion.div
        variants={{
          initial: { x: "25%", opacity: 0 },
          whileHover: { x: "0%", opacity: 1 },
        }}
        transition={{ type: "spring" }}
        className="relative z-10 p-2 sm:p-3 md:p-4 transition-all duration-400 group-hover:translate-x-[10px]"
      >
        <FiArrowRight className="text-3xl sm:text-4xl md:text-6xl -rotate-45 text-[#1e1e1e]" />
      </motion.div>
    </div>
  );
}
