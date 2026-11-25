"use client";

import React from "react";

// 7 9x9 pixel icons related to Studio Draft:
// paper plane, pencil, browser window, code brackets, rocket, coffee cup, pin
// k = outline (cream #FAF5EB for navy hero card)
// b = harbour fill #7DA3BB
// w = white fill #FFFFFF
// p = coral fill #FF6B4A
// . = transparent

export const STUDIO_PIXEL_ICONS: Record<string, string[]> = {
  plane: [
    "........k",
    "......kkb",
    "....kkwkb",
    "..kkwwkb.",
    "kkwwwkbb.",
    "..kkkbb..",
    "....kb...",
    "....k....",
    ".........",
  ],
  pencil: [
    ".......kp",
    "......kpw",
    ".....kpb.",
    "....kpb..",
    "...kpb...",
    "..kpb....",
    ".kpb.....",
    "kwb......",
    "kk.......",
  ],
  browser: [
    "kkkkkkkkk",
    "kppwbbbbk",
    "kkkkkkkkk",
    "k.......k",
    "k.ww.ww.k",
    "k.......k",
    "k.bbbbb.k",
    "k.......k",
    "kkkkkkkkk",
  ],
  brackets: [
    "..k...k..",
    ".k.k.k.k.",
    "k...k...k",
    "k.......k",
    "k...p...k",
    "k.......k",
    "k...k...k",
    ".k.k.k.k.",
    "..k...k..",
  ],
  rocket: [
    "....k....",
    "...kpk...",
    "..kwwwk..",
    "..kbpbk..",
    ".kwwkwwk.",
    "k.kwwwk.k",
    "kkk.k.kkk",
    "...kpk...",
    "....p....",
  ],
  cup: [
    ".........",
    ".k.....k.",
    ".k.k.k...",
    "kkkkkkkk.",
    "kwwwwwkkk",
    "kbbbbwk.k",
    ".kbbbwkkk",
    "..kkkk...",
    ".kkkkkkk.",
  ],
  pin: [
    "...kkk...",
    "..kpppk..",
    ".kppwppk.",
    ".kppppp0k",
    "..kpppk..",
    "...kbk...",
    "...kbk...",
    "....k....",
    ".........",
  ],
};

const COLOR_MAP: Record<string, string> = {
  k: "#FAF5EB", // Cream outline (for navy background)
  b: "#7DA3BB", // Harbour blue
  w: "#FFFFFF", // White
  p: "#FF6B4A", // Coral
  "0": "#FF6B4A",
};

export const STUDIO_PIXEL_KEYS = [
  "plane",
  "pencil",
  "browser",
  "brackets",
  "rocket",
  "cup",
  "pin",
] as const;

export type StudioPixelKey = (typeof STUDIO_PIXEL_KEYS)[number];

export function StudioDraftPixelIcon({
  name,
  className = "w-9 h-9",
}: {
  name: StudioPixelKey;
  className?: string;
}) {
  const rows = STUDIO_PIXEL_ICONS[name] || STUDIO_PIXEL_ICONS.plane;

  return (
    <svg
      viewBox="0 0 9 9"
      className={className}
      shapeRendering="crispEdges"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {rows.map((row, y) =>
        row.split("").map((ch, x) => {
          if (ch === ".") return null;
          const fill = COLOR_MAP[ch] || "#FAF5EB";
          return <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={fill} />;
        })
      )}
    </svg>
  );
}
