"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Preloader from "./components/Preloader";
import Landing from "./components/Landing/Main";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const navigationEntries = performance.getEntriesByType("navigation");
    const isReload =
      navigationEntries.length > 0 &&
      navigationEntries[0].type === "reload";

    if (isReload) {
      // Show preloader on reload
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 2500); // adjust to your animation length
      return () => clearTimeout(timer);
    } else {
      // First-time load → also show preloader
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="bg-[#DEDDD9] w-full min-h-screen">
      {loading ? (
        <Preloader />
      ) : (
        <motion.div
          initial={{ opacity: 0, x: -150 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <Landing />
        </motion.div>
      )}
    </div>
  );
}
