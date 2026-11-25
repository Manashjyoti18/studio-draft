"use client";

import { useEffect, type ReactNode } from "react";

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    let isMounted = true;
    let cleanup: (() => void) | undefined;

    // Respect reduced motion preference and only run on desktop (> 768px) with fine pointer
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isDesktopFinePointer =
      window.innerWidth >= 768 && window.matchMedia("(pointer: fine)").matches;

    if (prefersReducedMotion || !isDesktopFinePointer) {
      // Mobile uses native touch scrolling only
      return;
    }

    // Lazy load Lenis and GSAP after first paint on desktop
    const timer = setTimeout(async () => {
      try {
        const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
          import("lenis"),
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);

        if (!isMounted) return;

        gsap.registerPlugin(ScrollTrigger);

        const lenis = new Lenis({
          duration: 1.15,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: "vertical",
          gestureOrientation: "vertical",
          smoothWheel: true,
          wheelMultiplier: 0.95,
        });

        lenis.on("scroll", ScrollTrigger.update);

        const updateTicker = (time: number) => {
          if (isMounted) {
            lenis.raf(time * 1000);
          }
        };

        gsap.ticker.add(updateTicker);
        gsap.ticker.lagSmoothing(0);

        (window as unknown as { lenis: typeof lenis }).lenis = lenis;

        const onRefresh = () => {
          ScrollTrigger.refresh();
        };
        window.addEventListener("studio-loader-complete", onRefresh);
        window.addEventListener("resize", onRefresh);

        cleanup = () => {
          window.removeEventListener("studio-loader-complete", onRefresh);
          window.removeEventListener("resize", onRefresh);
          gsap.ticker.remove(updateTicker);
          lenis.destroy();
        };
      } catch {
        // Fallback to native scroll if dynamic import fails
      }
    }, 100);

    return () => {
      isMounted = false;
      clearTimeout(timer);
      cleanup?.();
    };
  }, []);

  return <>{children}</>;
}
