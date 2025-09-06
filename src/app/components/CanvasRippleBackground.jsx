"use client";

import { useEffect, useRef } from "react";

export default function CanvasRippleEffect() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const move = (e) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", move);

    const animate = () => {
      mouse.current.x += (target.current.x - mouse.current.x) * 0.1;
      mouse.current.y += (target.current.y - mouse.current.y) * 0.1;

      ctx.clearRect(0, 0, width, height);

      const gradient = ctx.createRadialGradient(
        mouse.current.x,
        mouse.current.y,
        0,
        mouse.current.x,
        mouse.current.y,
        150
      );
      gradient.addColorStop(0, "rgba(0, 150, 255, 0.1)");
      gradient.addColorStop(1, "transparent");

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(mouse.current.x, mouse.current.y, 150, 0, Math.PI * 2);
      ctx.fill();

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <canvas
  ref={canvasRef}
  className="fixed top-0 left-0 w-full h-full z-[21] pointer-events-none mix-blend-screen"
/>
  );
}
