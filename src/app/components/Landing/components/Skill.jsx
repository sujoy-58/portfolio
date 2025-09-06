"use client";

import { useEffect, useRef } from "react";
import Matter from "matter-js";
import Two from "two.js";

const copy = [
  "Next Js", "React Js", "Django", "JavaScript", "Node Js",
  "Docker", "MongoDB", "Django", "Git", "Framer",
  "Design", "Python", "WebSocket", "REST APIs", "Github",
  "Kubernetes", "Java",
];

export default function Skill() {
  const containerRef = useRef(null);
  const hasAnimated = useRef(false);
  const entities = useRef([]);
  const solver = useRef(Matter.Engine.create());
  const vector = useRef(null);
  const two = useRef(null);
  const bounds = useRef({
    length: 5000,
    thickness: 50,
    properties: { isStatic: true },
  });

  useEffect(() => {
    const elem = containerRef.current;
    if (!elem) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          startAnimation(elem);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(elem);

    return () => {
      observer.disconnect();
      if (two.current) two.current.pause();
    };
  }, []);

  const startAnimation = (elem) => {
    const resizeObserver = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (width === 0 || height === 0 || two.current) return;

      two.current = new Two({
        type: Two.Types.canvas,
        width,
        height,
        autostart: true,
      }).appendTo(elem);

      two.current.renderer.domElement.style.background = "#deddd9";
      vector.current = new Two.Vector();

      const createBoundary = (w, h) => {
        const rect = two.current.makeRectangle(0, 0, w, h);
        rect.visible = false;
        rect.entity = Matter.Bodies.rectangle(0, 0, w, h, bounds.current.properties);
        rect.entity.position = rect.position;
        return rect;
      };

      bounds.current.left = createBoundary(bounds.current.thickness, bounds.current.length);
      bounds.current.right = createBoundary(bounds.current.thickness, bounds.current.length);
      bounds.current.bottom = createBoundary(bounds.current.length, bounds.current.thickness);

      Matter.World.add(solver.current.world, [
        bounds.current.left.entity,
        bounds.current.right.entity,
        bounds.current.bottom.entity,
      ]);

      solver.current.world.gravity.y = 0.5;
      Matter.Engine.run(solver.current);

      const mouse = Matter.Mouse.create(elem);
      const constraint = Matter.MouseConstraint.create(solver.current, {
        mouse,
        constraint: { stiffness: 0.2 },
      });
      Matter.World.add(solver.current.world, constraint);

      // Adjust size based on width
      const isMobile = window.innerWidth <= 768;
      const fixedSize = isMobile ? 80 : 140;
      const fontSize = isMobile ? 12 : 21;

      const defaultStyles = {
        size: 14,
        fill: "#1e1e1e",
        family: "second",
        alignment: "center",
        baseline: "middle",
      };

      let x = 20;
      let y = 20;

      for (let word of copy) {
        const group = new Two.Group();
        const circle = new Two.Circle(0, 0, fixedSize / 2);

        circle.stroke = "#1e1e1e";
        circle.linewidth = 1;
        circle.noFill();

        const text = new Two.Text(word, 0, 0, defaultStyles);
        text.size = fontSize;

        const ox = x + fixedSize / 2;
        const oy = y + fixedSize / 2;

        const entity = Matter.Bodies.circle(ox, oy, fixedSize / 2);
        entity.object = group;
        group.translation.set(ox, oy);
        group.add(circle, text);
        group.entity = entity;
        entities.current.push(entity);
        two.current.add(group);

        x += fixedSize + 20;
        if (x + fixedSize >= width) {
          x = 20;
          y += fixedSize + 20;
        }
      }

      Matter.World.add(solver.current.world, entities.current);

      const resize = () => {
        const width = elem.clientWidth;
        const height = elem.clientHeight;

        two.current.width = width;
        two.current.height = height;

        vector.current.x = -bounds.current.thickness / 2;
        vector.current.y = height / 2;
        Matter.Body.setPosition(bounds.current.left.entity, vector.current);

        vector.current.x = width + bounds.current.thickness / 2;
        Matter.Body.setPosition(bounds.current.right.entity, vector.current);

        vector.current.x = width / 2;
        vector.current.y = height + bounds.current.thickness / 2;
        Matter.Body.setPosition(bounds.current.bottom.entity, vector.current);
      };

      resize();
      window.addEventListener("resize", resize);

      two.current.bind("update", () => {
        Matter.Engine.update(solver.current);
        for (let entity of entities.current) {
          entity.object.position.copy(entity.position);
          entity.object.rotation = entity.angle;
        }
      });

      resizeObserver.disconnect();
    });

    resizeObserver.observe(elem);
  };

  return (
    <section className="w-screen h-screen bg-[#deddd9] flex items-center justify-center relative">
      <div
        ref={containerRef}
        className="w-[92%] h-[86%] relative overflow-hidden rounded-xl bg-transparent"
        style={{ border: "2px solid #1e1e1e" }}
      />
      <div
        className="absolute text-[#1e1e1e] font-bold text-center px-4 font-primary"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          textShadow: "0 0 8px rgba(255,255,255,0.5)",
          fontSize: "clamp(1.5rem, 5vw, 4rem)",
          lineHeight: "1.2",
        }}
      >
        What's&nbsp; I'm&nbsp; Capable&nbsp; Of
      </div>
    </section>
  );
}
