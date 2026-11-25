"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function WorksLoadingScreen({
  onLoadingComplete,
}: {
  onLoadingComplete?: () => void;
}) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("sd_works_loaded");
    if (hasLoaded) {
      setIsDone(true);
      onLoadingComplete?.();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDone(true);
            sessionStorage.setItem("sd_works_loaded", "true");
            onLoadingComplete?.();
          }, 300);
          return 100;
        }
        return prev + 12;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[10000] flex flex-col justify-between bg-[#111111] p-6 md:p-12 text-[#FFFFFF] select-none font-mono"
        >
          {/* Top telemetry */}
          <div className="flex items-center justify-between text-xs tracking-wider">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#FF6B35]" />
              <span className="font-bold text-[#FFFFFF]">STUDIO DRAFT</span>
            </div>
            <div className="text-[#B7E4C7] font-semibold">
              INDEX 01 &bull; SELECTED WORKS
            </div>
          </div>

          {/* Center typography reveal */}
          <div className="relative my-auto flex flex-col items-center justify-center text-center">
            <div className="inline-block px-3 py-1 bg-[#FFFFFF] text-[#111111] font-mono text-[10px] uppercase font-bold tracking-widest mb-4">
              EDITORIAL ARCHIVE
            </div>
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#FFFFFF] uppercase">
              STUDIO<span className="text-[#FF6B35]">/</span>DRAFT
            </h1>
            <div className="mt-3 text-xs font-mono tracking-widest uppercase text-[#B7E4C7]">
              Websites Built For Growing Businesses
            </div>
          </div>

          {/* Bottom progress bar */}
          <div className="space-y-3">
            <div className="flex justify-between items-baseline text-xs font-mono">
              <span className="text-[#FFFFFF]/70">CALIBRATING EDITORIAL BOARDS</span>
              <span className="text-[#FF6B35] font-bold tabular-nums text-sm">
                {String(progress).padStart(3, "0")}%
              </span>
            </div>

            <div className="w-full h-1 bg-[#FFFFFF]/20 overflow-hidden">
              <motion.div
                className="h-full bg-[#FF6B35]"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut", duration: 0.08 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
