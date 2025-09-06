"use client";
import Link from "next/link";
import Image from "next/image";
import Magnet from "./common/Magnet";
import Fliplink from "./common/Fliplink";
import Footer from "./components/Footer";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Preloader from "./components/Preloader";
import Landing from "./components/Landing/Main";
import Navbar from "./Navbar";
import MainNav from "./components/MainNav";
import Skill from "./components/Landing/components/Skill";
import Slider from "./components/Landing/components/Slider";
// import ImageSlider from "./components/Landing/components/ImageSlider";

export default function Home() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if the navigation type is a reload
    const navigationEntries = performance.getEntriesByType("navigation");
    const isReload = navigationEntries.length > 0 && navigationEntries[0].type === "reload";

    if (isReload) {
      setLoading(true);
    }
  }, []);

  return (
    <>
    <div className="bg-[#DEDDD9] w-full min-h-screen">
      {loading ? (
        <Preloader onComplete={() => setLoading(false)} />
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
    
    
    {/* <Landing /> */}
    {/* <Footer/> */}

    </>
  );
}