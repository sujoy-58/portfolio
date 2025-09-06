'use client'

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = ["Hello", "Bonjour", "Ciao", "Olà", "やあ", "Hallå", "Guten tag"];

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [startExit, setStartExit] = useState(false);
  const [showWhiteLayer, setShowWhiteLayer] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setStartExit(true);

          setTimeout(() => {
            setShowWhiteLayer(true);
          }, 150); // Just after scale-down starts

          setTimeout(() => {
            onComplete();
          }, 2000);

          return 100;
        }
        return prev + 3;
      });

      if (progress % 8 === 0 && progress < 100) {
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [progress, onComplete]);

  return (
    <AnimatePresence>
      {/* Black preloader container */}
      <motion.div
        initial={{ scale: 1, opacity: 1 }}
        animate={startExit ? { scale: 0.92, opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
        className="fixed top-0 left-0 w-full h-screen bg-[#0A0A0A] text-[#B3B2AE] flex flex-col items-center justify-center z-[60] overflow-hidden"
      >
        {/* Greeting Text */}
        <motion.div
          className="text-5xl font-bold font-primary z-20"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          {words[wordIndex]}
        </motion.div>

        {/* Progress Counter */}
        <motion.div
          className="absolute bottom-8 right-8 font-second text-4xl font-bold text-[#B3B2AE] z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
        >
          {progress}
        </motion.div>
      </motion.div>

      {/* White overlay on top (OUTSIDE preloader container) */}
      {showWhiteLayer && (
        <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: "0%" }}
          transition={{
            duration: 1.2,
            ease: [0.77, 0, 0.175, 1],
          }}
          className="fixed top-0 left-0 w-full h-screen bg-[#DEDDD9] z-[70]" // now over everything
        />
      )}
    </AnimatePresence>
  );
}
