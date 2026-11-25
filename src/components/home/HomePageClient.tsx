"use client";

import React from "react";
import dynamic from "next/dynamic";
import LoadingScreen from "@/components/motion/LoadingScreen";
import FathomlessHeader from "@/components/fathomless/FathomlessHeader";
import DescentContainer from "@/components/fathomless/DescentContainer";

// Lazy load sections below the first screen so code is split by section and first paint is instant
const DepthProfileSection = dynamic(
  () => import("@/components/fathomless/DepthProfileSection"),
  { ssr: false }
);
const FieldNotesSection = dynamic(
  () => import("@/components/fathomless/FieldNotesSection"),
  { ssr: false }
);
const PostDescentWorkSection = dynamic(
  () => import("@/components/fathomless/PostDescentWorkSection"),
  { ssr: false }
);
const FathomlessFooter = dynamic(
  () => import("@/components/fathomless/FathomlessFooter"),
  { ssr: false }
);

export default function HomePageClient() {
  return (
    <main className="relative min-h-screen bg-[#FAF5EB] text-[#0A1F44] overflow-x-clip selection:bg-[#FF6B4A] selection:text-white">
      {/* 0. LOADER (Navy full screen, STUDIO DRAFT logo drawing, no number) */}
      <LoadingScreen />

      {/* 1. FIXED HEADER & HUD */}
      <FathomlessHeader />

      {/* 2. THE DESCENT */}
      <DescentContainer />

      {/* 3. DEPTH PROFILE (Process section, Fraunces headline, Archivo copy, zone table) */}
      <DepthProfileSection />

      {/* 4. FIELD NOTES */}
      <FieldNotesSection />

      {/* 5. POST-DESCENT WORK & STUDIO (Work showcase, Services, Process, Compare, Team, FAQ, Contact) */}
      <PostDescentWorkSection />

      {/* 6. FOOTER */}
      <FathomlessFooter />
    </main>
  );
}
