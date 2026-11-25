"use client";

import React from "react";

export const PIXEL_ICON_STRINGS: Record<string, string[]> = {
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
  shell: [
    "...kkk...",
    "..kbwbk..",
    ".kbwbwbk.",
    "kbwbwbwbk",
    "kwbwbwbwk",
    ".kbwbwbk.",
    "..kbbbk..",
    "...kkk...",
    ".........",
  ],
  boat: [
    "....k....",
    "....kb...",
    "....kbb..",
    "...wkbbb.",
    "..wwkbbb.",
    "....k....",
    "kkkkkkkkk",
    ".kpppppk.",
    "..kkkkk..",
  ],
  lighthouse: [
    "...kkk...",
    "..kbbbk..",
    "...kwk...",
    "...kbk...",
    "...kwk...",
    "...kbk...",
    "..kwwwk..",
    "..kbbbk..",
    ".kkkkkkk.",
  ],
  fish: [
    ".........",
    "...kkk..k",
    "..kbbbkkk",
    ".kbwbbbbk",
    "kbbbbbkkk",
    ".kbbbbk.k",
    "..kkkk...",
    ".........",
    ".........",
  ],
  wave: [
    ".........",
    "...kkk...",
    "..kbbbk..",
    ".kbwwbbk.",
    "kbw..kbbk",
    "kb....kbk",
    "bbbbbbbbb",
    "kkkkkkkkk",
    ".........",
  ],
  sun: [
    "....p....",
    ".p..k..p.",
    "...kpk...",
    "..kpppk..",
    "pkpppppkp",
    "..kpppk..",
    "...kpk...",
    ".p..k..p.",
    "....p....",
  ],
};

const COLOR_MAP: Record<string, string> = {
  k: "#0A1F44", // Navy
  b: "#7DA3BB", // Harbour blue
  w: "#FFFFFF", // White
  p: "#FF6B4A", // Coral
};

export const PIXEL_ICON_KEYS = [
  "plane",
  "shell",
  "boat",
  "lighthouse",
  "fish",
  "wave",
  "sun",
] as const;

export type PixelIconKey = (typeof PIXEL_ICON_KEYS)[number];

export function TidewellPixelIcon({
  name,
  className = "",
  style,
}: {
  name: PixelIconKey;
  className?: string;
  style?: React.CSSProperties;
}) {
  const rows = PIXEL_ICON_STRINGS[name] || PIXEL_ICON_STRINGS.plane;

  return (
    <svg
      viewBox="0 0 9 9"
      shapeRendering="crispEdges"
      className={className}
      style={{
        display: "inline-block",
        verticalAlign: "middle",
        ...style,
      }}
    >
      {rows.map((row, y) =>
        row.split("").map((ch, x) => {
          const fill = COLOR_MAP[ch];
          if (!fill) return null;
          return (
            <rect
              key={`${x}-${y}`}
              x={x}
              y={y}
              width="1.02"
              height="1.02"
              fill={fill}
            />
          );
        })
      )}
    </svg>
  );
}
