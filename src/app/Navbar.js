"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import MainNav from "./components/MainNav";
import Clock from "./components/Clock";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef(null);
  const [location, setLocation] = useState({ city: "", country: "" });

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Fetch location
  useEffect(() => {
    fetch("https://ipinfo.io/json?token=77a18626dec87a")
      .then((res) => res.json())
      .then((data) => {
        setLocation({ city: data.city, country: data.country });
      })
      .catch(console.error);
  }, []);

  // Animation for menu
  useEffect(() => {
    const tl = gsap.timeline();

    if (isOpen) {
      tl.set(menuRef.current, { display: "flex" }).fromTo(
        menuRef.current,
        { height: "0%", y: "100%", opacity: 0 },
        {
          height: "100%",
          y: "0%",
          opacity: 1,
          duration: 1.2,
          ease: "cubic-bezier(0.76, 0, 0.24, 1)",
        }
      );
    } else {
      tl.fromTo(
        menuRef.current,
        { height: "100%", y: "0%", opacity: 1 },
        {
          height: "0%",
          y: "100%",
          opacity: 0,
          duration: 1.2,
          ease: "cubic-bezier(0.76, 0, 0.24, 1)",
          onComplete: () => {
            gsap.set(menuRef.current, {
              display: "none",
              height: "0%",
              y: "100%",
              opacity: 0,
            });
          },
        }
      );
    }
  }, [isOpen]);

  const Burger = {
    opened: (deg) => ({ rotate: deg, backgroundColor: "#DEDDD9" }),
    closed: { rotate: 0 },
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 2.5 }}
        className="w-full fixed top-0 left-0 text-black bg-transparent font-second font-semibold text-sm z-30 py-3"
      >
        {/* Mobile layout - only Who Am I and Burger */}
        <div className="md:hidden flex flex-row justify-between items-center px-4 w-full">
          <div className="text-left">
            <p className="opacity-85">Who Am I:</p>
            <p>Programmer, Gamer</p>
          </div>
          
          <div
            className="cursor-pointer z-50"
            onClick={() => setIsOpen(!isOpen)}
          >
            <motion.div
              className="w-10 h-[1.8px] bg-[#1e1e1e] origin-left"
              variants={Burger}
              animate={isOpen ? "opened" : "closed"}
              custom={"20deg"}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            ></motion.div>
            <motion.div
              className="w-10 h-[1.8px] bg-[#1e1e1e] mt-2 origin-left"
              variants={Burger}
              animate={isOpen ? "opened" : "closed"}
              custom={"-20deg"}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            ></motion.div>
          </div>
        </div>

        {/* Tablet/Desktop layout - original with all elements */}
        <motion.div
          className="
            hidden md:flex
            flex-col md:flex-row
            justify-center md:justify-between
            items-center
            px-4 md:ml-8 md:mr-8
            mt-5
            space-y-3 md:space-y-0
            text-[#1e1e1e]
          "
        >
          <div className="nav-inr-name leading-4 text-center md:text-left">
            <p className="opacity-85">Who Am I:</p>
            <p className="">Programmer, Gamer</p>
          </div>
          <div className="nav-inr-location leading-4 text-center md:text-left">
            <p className="opacity-85">Location:</p>
            <p>
              Hyderabad, India
            </p>
          </div>
          <div className="nav-inr-theme leading-4 text-center md:text-left">
            <p className="opacity-85">Right Now:</p>
            <Clock />
          </div>

          <div
            className="nav-inr-toggle space-y-2 cursor-pointer z-50"
            onClick={() => setIsOpen(!isOpen)}
          >
            <motion.div
              className="w-[50px] h-[1.8px] bg-[#1e1e1e] border-none origin-left"
              variants={Burger}
              animate={isOpen ? "opened" : "closed"}
              custom={"20deg"}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            ></motion.div>
            <motion.div
              className="w-[50px] h-[1.8px] bg-[#1e1e1e] border-none"
              variants={Burger}
              animate={isOpen ? "opened" : "closed"}
              custom={"-20deg"}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            ></motion.div>
          </div>
        </motion.div>
      </motion.nav>

      {/* Menu overlay */}
      <div
        className={`fixed inset-0 transition-opacity duration-500 overflow-y-auto ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Fullscreen menu */}
      <div
        ref={menuRef}
        className="fixed inset-0 bg-[#1E1E1E] z-40 overflow-hidden hidden"
      >
        <MainNav setIsOpen={setIsOpen} />
      </div>
    </>
  );
};

export default Navbar;