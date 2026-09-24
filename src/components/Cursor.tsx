"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === "pointer" ||
          target.tagName.toLowerCase() === "a" ||
          target.tagName.toLowerCase() === "button"
      );
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null; // Hide on touch devices
  }

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[100] mix-blend-difference hidden md:block"
      animate={{
        x: position.x - (isPointer ? 24 : 8),
        y: position.y - (isPointer ? 24 : 8),
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.5,
      }}
    >
      <motion.div
        className="rounded-full bg-accent-amber"
        animate={{
          width: isPointer ? 48 : 16,
          height: isPointer ? 48 : 16,
          scale: isPointer ? 1.5 : 1,
          opacity: isPointer ? 0.5 : 1,
        }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
}
