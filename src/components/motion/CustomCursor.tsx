"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isWorkCard, setIsWorkCard] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only run on desktop fine-pointer devices
    if (typeof window === "undefined" || !window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    setMounted(true);

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const handleHoverEvents = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const workCard = target.closest('[data-cursor="view"]') as HTMLElement | null;
      if (workCard) {
        setIsWorkCard(true);
        setIsHovered(true);
        return;
      }
      setIsWorkCard(false);

      const interactive = target.closest(
        "a, button, [data-cursor], input, textarea, select, .cursor-pointer"
      ) as HTMLElement | null;

      if (interactive) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", handleHoverEvents);
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", handleHoverEvents);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!mounted || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden">
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            width: isWorkCard ? 64 : isHovered ? 26 : 8,
            height: isWorkCard ? 64 : isHovered ? 26 : 8,
            borderColor: "#FF6B4A",
            backgroundColor: isWorkCard
              ? "rgba(255, 107, 74, 0.14)"
              : isHovered
              ? "rgba(255, 107, 74, 0.2)"
              : "#FF6B4A",
          }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="rounded-full border border-solid flex items-center justify-center"
        >
          {isWorkCard && (
            <motion.span
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-[10px] font-mono tracking-wider font-bold uppercase text-[#FF6B4A] select-none"
            >
              View
            </motion.span>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
