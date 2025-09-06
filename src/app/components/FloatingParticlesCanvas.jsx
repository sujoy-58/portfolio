"use client";
import { useEffect, useRef } from "react";

export default function FloatingParticlesCanvas() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const particles = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const colors = [
      "rgba(0, 150, 255, 0.15)",
      "rgba(255, 100, 200, 0.15)",
      "rgba(100, 255, 200, 0.15)",
      "rgba(255, 255, 150, 0.15)",
    ];

    const createParticles = () => {
      const arr = [];
      for (let i = 0; i < 40; i++) {
        arr.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: 40 + Math.random() * 40,
          dx: (Math.random() - 0.5) * 0.5,
          dy: (Math.random() - 0.5) * 0.5,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
      particles.current = arr;
    };

    createParticles();

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let p of particles.current) {
        // Move particles
        p.x += p.dx;
        p.y += p.dy;

        // Bounce off edges
        if (p.x < -p.radius || p.x > width + p.radius) p.dx *= -1;
        if (p.y < -p.radius || p.y > height + p.radius) p.dy *= -1;

        // Mouse interaction
        const dist = Math.hypot(p.x - mouse.current.x, p.y - mouse.current.y);
        if (dist < 150) {
          const angle = Math.atan2(mouse.current.y - p.y, mouse.current.x - p.x);
          p.x -= Math.cos(angle) * 0.3;
          p.y -= Math.sin(angle) * 0.3;
        }

        // Draw
        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(draw);
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      createParticles();
    };

    const handleMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
    />
  );
}
