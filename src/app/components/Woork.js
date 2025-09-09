import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import Magnet from "@/app/common/Magnet";
import Fliplink from "@/app/common/Fliplink";
import projects from "@/project";

export default function Woork({ handle }) {
  const router = useRouter();
  const containerRef = useRef(null);

  // Scroll-based parallax setup
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yTransform = useTransform(scrollYProgress, [0, 1], ["-40%", "40%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["60%", "-60%"]);

  const handleClick = () => {
    const project = projects.find((p) => p.slug === handle);
    if (project) {
      // window.location.replace(`/work/${project.slug}`);
      router.push(`/work/${project.slug}`);
    } else {
      console.error("Project not found for handle:", handle);
    }
  };

  return (
    <div
      ref={containerRef}
      className="h-[120vh] [clip-path:polygon(0_0,0_100%,100%_100%,100%_0)] flex items-center justify-center"
      onClick={handleClick}
    >
      {/* Image with parallax */}
      <motion.div
        className="w-full h-full relative brightness-90 will-change-transform"
        style={{ y: yTransform }}
      >
        <Image
          src={`/${handle}/background.jpg`}
          alt="image"
          fill
          className="!w-full !h-full object-cover blur-[2px]"
        />
      </motion.div>

      {/* Title with motion */}
      <motion.div
        className="fixed left-6 sm:left-16 top-1/2 -translate-y-1/2 z-20 will-change-transform text-[#deddd9] 
        text-[2.5rem] sm:text-[4rem] lg:text-[6rem] font-semibold font-primary flex items-center justify-center gap-2 hover:cursor-pointer"
        style={{ y: yText }}
      >
        <Fliplink>{handle.toUpperCase()}</Fliplink>
        <ArrowUpRight
          size={40}
          className="sm:hidden" // smaller arrow for mobile
        />
        <ArrowUpRight
          size={65}
          className="hidden sm:block lg:hidden"
        />
        <ArrowUpRight
          size={85}
          className="hidden lg:block"
        />
      </motion.div>

      {/* Vignette in center */}
      <motion.div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
        h-[40vw] w-[70vw] sm:h-[30vw] sm:w-[50vw] lg:h-[25vw] lg:w-[40vw] 
        rounded-2xl overflow-hidden bg-black flex items-center text-white justify-center z-10"
      >
        <video
          src={`/${handle}/vignette.mp4`}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
      </motion.div>
    </div>
  );
}
