
"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTransitionRouter } from "next-view-transitions";

const DURATION = 0.25;
const STAGGER = 0.025;

const Fliplink = ({ children, href }) => {
  const router = useTransitionRouter();

  function slideInOut() {
    document.documentElement.animate(
      [
        { opacity: 1, transform: "translateY(0)" },
        { opacity: 0.2, transform: "translateY(-35%)" },
      ],
      {
        duration: 1500,
        easing: "cubic-bezier(0.87, 0, 0.13, 1)",
        fill: "forwards",
        pseudoElement: "::view-transition-old(root)",
      }
    );

    document.documentElement.animate(
      [
        { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
        { clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)" },
      ],
      {
        duration: 1500,
        easing: "cubic-bezier(0.87, 0, 0.13, 1)",
        fill: "forwards",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  }

  return (
    <motion.button
      initial="initial"
      whileHover="hovered"
      onClick={(e) => {
        e.preventDefault();
        router.push(href, { onTransitionReady: slideInOut });
      }}
      className="relative block overflow-hidden whitespace-nowrap "
      
    >
      <div>
        {(typeof children === "string" ? children : "").split("").map((l, i) => (
          <motion.span
            key={i}
            variants={{
              initial: { y: 0 },
              hovered: { y: "-105%" },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
          >
            {l}
          </motion.span>
        ))}
      </div>
      <div className="absolute inset-0">
        {(typeof children === "string" ? children : "").split("").map((l, i) => (
          <motion.span
            key={i}
            variants={{
              initial: { y: "105%" },
              hovered: { y: 0 },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
          >
            {l}
          </motion.span>
        ))}
      </div>
    </motion.button>
  );
};

export default Fliplink;
