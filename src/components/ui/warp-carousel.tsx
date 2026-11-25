"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";

// ============================================================================
// CONSTANTS (Strictly Preserved)
// ============================================================================
export const CW = 280; // Standard card width
export const CH = 400; // Standard card height
export const FOCAL = 720; // Camera focal depth
export const G = 1.32; // Geometric cylinder radius factor
export const TK = 0.08; // Spring tension stiffness
export const TB = 0.82; // Spring damping factor
export const DRIFT = 0.0015; // Natural drift
export const REST_PHASE = 0; // Default phase angle alignment

// ============================================================================
// TYPES & INTERFACES (Strictly Preserved)
// ============================================================================
export type WarpCardDetail = "slider" | "ring" | "wave" | "cross" | string;

export interface WarpCard {
  id?: string | number;
  title: string;
  value: string;
  footer?: string;
  detail?: WarpCardDetail;
  labels?: string[];
  numeral?: [string, string];
  accent?: string;
  glow?: string;
  mesh?: string[];
  unit?: string;
}

export interface WarpCarouselProps {
  cards?: WarpCard[];
  index?: number;
  activeIndex?: number;
  onIndexChange?: (index: number) => void;
  onActiveChange?: (index: number) => void;
  background?: string;
  glow?: string;
  font?: string;
  autoplay?: boolean;
  interval?: number;
  step?: number;
  warp?: number;
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}

// ============================================================================
// 6x7 BRAND MESH GENERATOR (Navy #0A1F44, Dark Navy #071633, Cream #FAF5EB,
// Light Cream #F1E8D8, Coral #FF6B4A, Soft Coral #FF8A6B, Slate #1B2F4D)
// ============================================================================
export function makeBrandMesh(variant: number): string[] {
  const cols = 6;
  const rows = 7;
  const mesh: string[] = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let color = "#0A1F44";
      if (variant === 0) {
        if (r <= 2 && c <= 2) color = (r + c) % 2 === 0 ? "#FF6B4A" : "#FF8A6B";
        else if (r >= 4) color = "#071633";
        else color = (r + c) % 2 === 0 ? "#0A1F44" : "#1B2F4D";
      } else if (variant === 1) {
        if (r <= 1 && c >= 3) color = (r + c) % 2 === 0 ? "#FAF5EB" : "#F1E8D8";
        else if (r >= 2 && r <= 3 && c <= 2) color = "#FF6B4A";
        else if (r >= 4) color = "#071633";
        else color = (r + c) % 2 === 0 ? "#1B2F4D" : "#0A1F44";
      } else if (variant === 2) {
        if (r >= 2 && r <= 3 && c >= 3) color = "#FF6B4A";
        else if (r <= 1) color = (r + c) % 2 === 0 ? "#1B2F4D" : "#0A1F44";
        else if (r >= 5) color = "#071633";
        else color = "#0A1F44";
      } else {
        if (r <= 1 && c <= 2) color = "#FAF5EB";
        else if (r >= 4 && c >= 3) color = "#FF6B4A";
        else if (r >= 5) color = "#071633";
        else color = (r + c) % 2 === 0 ? "#0A1F44" : "#1B2F4D";
      }
      mesh.push(color);
    }
  }
  return mesh;
}

// ============================================================================
// EXACT 4 STUDIO DRAFT FEATURED WORKS (NO DEMO CARDS)
// ============================================================================
export const STUDIO_DRAFT_WORK_CARDS: WarpCard[] = [
  {
    id: "toolkb",
    title: "Developer\nUtilities",
    value: "01",
    footer: "LIVE TOOL, WEB UTILITY",
    detail: "slider",
    labels: ["Free", "Fast"],
    numeral: ["#FAF5EB", "#FF6B4A"],
    accent: "#FF6B4A",
    glow: "#0A1F44",
    mesh: makeBrandMesh(0),
  },
  {
    id: "brandcey",
    title: "Creative\nMarketplace",
    value: "02",
    footer: "COMMERCE, DIRECTORY",
    detail: "ring",
    numeral: ["#FAF5EB", "#FF6B4A"],
    accent: "#FF6B4A",
    glow: "#0A1F44",
    mesh: makeBrandMesh(1),
  },
  {
    id: "arogya-relief",
    title: "Emergency\nHealthcare",
    value: "03",
    footer: "HEALTHCARE, TELEMETRY",
    detail: "wave",
    numeral: ["#FAF5EB", "#FF6B4A"],
    accent: "#FF6B4A",
    glow: "#0A1F44",
    mesh: makeBrandMesh(2),
  },
  {
    id: "retro-cafe",
    title: "Cafe\nWebsite",
    value: "04",
    footer: "CAFE, MON, NAGALAND",
    detail: "cross",
    labels: ["Visit", "Menu", "Book"],
    numeral: ["#FAF5EB", "#FF6B4A"],
    accent: "#FF6B4A",
    glow: "#0A1F44",
    mesh: makeBrandMesh(3),
  },
];

export const WARP_CAROUSEL_CARDS: WarpCard[] = STUDIO_DRAFT_WORK_CARDS;

// ============================================================================
// POSE & MATH ENGINE
// ============================================================================
export interface CardPose {
  index: number;
  delta: number;
  x: number;
  y: number;
  z: number;
  scale: number;
  rotY: number;
  width: number;
  height: number;
  isVisible: boolean;
  isCenter: boolean;
}

export function computeCardPose(
  index: number,
  currentAngle: number,
  totalCards: number,
  viewW: number,
  viewH: number,
  warp: number = 1
): CardPose {
  const thetaStep = (2 * Math.PI) / totalCards;
  const baseTheta = index * thetaStep;
  let delta = (baseTheta - currentAngle) % (2 * Math.PI);
  if (delta > Math.PI) delta -= 2 * Math.PI;
  if (delta < -Math.PI) delta += 2 * Math.PI;

  const R = CW * G * (viewW < 640 ? 0.95 : 1.15) * warp;
  const X = R * Math.sin(delta);
  const Z = R * Math.cos(delta) - R;

  const proj = FOCAL / (FOCAL - Z);
  const screenX = viewW * 0.5 + X * proj;
  const screenY = viewH * 0.5;

  const rotY = -delta * 0.68;
  const isCenter = Math.abs(delta) < thetaStep * 0.45;
  const isVisible = Z > -R * 1.5 && Math.abs(delta) < Math.PI * 0.65;

  const cardW = viewW < 640 ? CW * 0.88 : CW;
  const cardH = viewW < 640 ? CH * 0.88 : CH;

  return {
    index,
    delta,
    x: screenX,
    y: screenY,
    z: Z,
    scale: proj,
    rotY,
    width: cardW * proj,
    height: cardH * proj,
    isVisible,
    isCenter,
  };
}

// ============================================================================
// MAIN WARP CAROUSEL COMPONENT
// ============================================================================
export function WarpCarousel({
  cards = STUDIO_DRAFT_WORK_CARDS,
  index: controlledIndex,
  activeIndex: controlledActiveIndex,
  onIndexChange,
  onActiveChange,
  background = "#0A1F44",
  glow = "#0A1F44",
  font = '300 28px "Fraunces", Georgia, serif',
  autoplay = true,
  interval = 3.6667,
  step = 2,
  warp = 1,
  ariaLabel = "Studio Draft work",
  className = "",
  style = {},
}: WarpCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const effectiveControlled =
    controlledActiveIndex !== undefined
      ? controlledActiveIndex
      : controlledIndex !== undefined
      ? controlledIndex
      : undefined;

  const [internalIndex, setInternalIndex] = useState(0);
  const currentIdx = effectiveControlled !== undefined ? effectiveControlled : internalIndex;

  const updateIndex = useCallback(
    (newIdx: number) => {
      const count = cards.length;
      if (count === 0) return;
      const normalized = ((newIdx % count) + count) % count;
      if (effectiveControlled === undefined) {
        setInternalIndex(normalized);
      }
      onIndexChange?.(normalized);
      onActiveChange?.(normalized);
    },
    [cards.length, effectiveControlled, onIndexChange, onActiveChange]
  );

  const angleRef = useRef(0);
  const targetAngleRef = useRef(0);
  const velRef = useRef(0);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartAngleRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);
  const pointerPosRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  });

  // Track controlled index transitions
  useEffect(() => {
    if (effectiveControlled !== undefined) {
      const thetaStep = (2 * Math.PI) / cards.length;
      targetAngleRef.current = effectiveControlled * thetaStep;
    }
  }, [effectiveControlled, cards.length]);

  // Autoplay timer: spins 2 cards at a time
  useEffect(() => {
    if (!autoplay) return;
    const count = cards.length;
    if (count === 0) return;

    const timer = setInterval(() => {
      if (isDraggingRef.current) return;
      setInternalIndex((prev) => {
        const next = (prev + (step || 2)) % count;
        onIndexChange?.(next);
        onActiveChange?.(next);
        const thetaStep = (2 * Math.PI) / count;
        targetAngleRef.current = next * thetaStep;
        return next;
      });
    }, interval * 1000);

    return () => clearInterval(timer);
  }, [autoplay, interval, step, cards.length, onIndexChange, onActiveChange]);

  // Keyboard navigation: Left/Right arrows
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        updateIndex(currentIdx - 1);
      } else if (e.key === "ArrowRight") {
        updateIndex(currentIdx + 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIdx, updateIndex]);

  // Mouse / Touch Drag handling
  const onPointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartAngleRef.current = targetAngleRef.current;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      pointerPosRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    }

    if (!isDraggingRef.current) return;
    const dx = e.clientX - dragStartXRef.current;
    const viewW = canvasRef.current?.width || 800;
    const angleDelta = -(dx / viewW) * Math.PI * 1.5;
    targetAngleRef.current = dragStartAngleRef.current + angleDelta;
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);

    // Snap to nearest card
    const count = cards.length;
    const thetaStep = (2 * Math.PI) / count;
    const nearestIdx = Math.round(targetAngleRef.current / thetaStep);
    updateIndex(nearestIdx);
  };

  const onPointerLeave = () => {
    pointerPosRef.current.active = false;
  };

  // Click on side card brings it front
  const onClick = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const count = cards.length;
    for (let i = 0; i < count; i++) {
      const pose = computeCardPose(i, angleRef.current, count, canvas.width, canvas.height, warp);
      if (!pose.isVisible) continue;
      const left = pose.x - pose.width * 0.5;
      const right = pose.x + pose.width * 0.5;
      const top = pose.y - pose.height * 0.5;
      const bottom = pose.y + pose.height * 0.5;

      if (clickX >= left && clickX <= right && clickY >= top && clickY <= bottom) {
        if (!pose.isCenter) {
          updateIndex(i);
        }
        break;
      }
    }
  };

  // Main Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let isTabVisible = typeof document !== "undefined" ? document.visibilityState === "visible" : true;
    let isInView = true;

    const handleVisibilityChange = () => {
      isTabVisible = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInView = entry.isIntersecting;
      },
      { rootMargin: "100px" }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const render = (time: number) => {
      if (lastTimeRef.current === null) lastTimeRef.current = time;
      const dt = Math.min(0.05, (time - lastTimeRef.current) * 0.001);
      lastTimeRef.current = time;

      if (isTabVisible && isInView) {
        // Spring physics toward targetAngle
        const diff = targetAngleRef.current - angleRef.current;
        velRef.current += diff * TK;
        velRef.current *= TB;
        angleRef.current += velRef.current;

        const w = canvas.width;
        const h = canvas.height;

        ctx.clearRect(0, 0, w, h);

        // Background
        ctx.fillStyle = background;
        ctx.fillRect(0, 0, w, h);

        // Compute all card poses and sort back-to-front
        const count = (cards || []).length;
        const poses: { pose: CardPose; card: WarpCard; index: number }[] = [];
        for (let i = 0; i < count; i++) {
          const pose = computeCardPose(i, angleRef.current, count, w, h, warp);
          if (pose.isVisible) {
            poses.push({ pose, card: cards[i], index: i });
          }
        }
        poses.sort((a, b) => a.pose.z - b.pose.z);

        // Paint cards
        for (const item of poses) {
          paintCard(ctx, item.card, item.pose, item.index, time, pointerPosRef.current);
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    const handleResize = () => {
      const container = containerRef.current;
      if (!container || !canvas) return;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, [cards, background, warp]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full select-none cursor-grab active:cursor-grabbing ${className}`}
      style={style}
      aria-label={ariaLabel}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerLeave}
      onClick={onClick}
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}

// ============================================================================
// POINT CLOUD CARD PAINTER (Fathomless Style)
// ============================================================================
function paintCard(
  ctx: CanvasRenderingContext2D,
  card: WarpCard,
  pose: CardPose,
  cardIdx: number,
  time: number,
  pointer: { x: number; y: number; active: boolean }
) {
  const { x: screenX, y: screenY, width, height, scale, isCenter } = pose;
  const x = screenX - width * 0.5;
  const y = screenY - height * 0.5;
  const radius = Math.max(10, 16 * scale);

  ctx.save();

  // Opacity: centre card 100%, side cards dimmed to 70%
  const alpha = isCenter ? 1.0 : 0.70;
  ctx.globalAlpha = alpha;

  // Clip rounded card
  ctx.beginPath();
  ctx.roundRect(x, y, width, height, radius);
  ctx.clip();

  // 1. Navy #0A1F44 face
  ctx.fillStyle = "#0A1F44";
  ctx.fillRect(x, y, width, height);

  // 2. 1px cream border at 20% opacity
  ctx.strokeStyle = "rgba(250, 245, 235, 0.20)";
  ctx.lineWidth = Math.max(1, 1.2 * scale);
  ctx.stroke();

  // 4. POINT CLOUD SHAPES (Sharp square points 2 to 3 px)
  // Cream 80%, Coral 60%, Navy 40%
  paintCardPointCloudShape(ctx, cardIdx, x, y, width, height, scale, time, pointer);

  // 5. TOP-LEFT TITLE: Fraunces 28px, weight 600, cream 100%, on navy chip 85%, pad 8x12px, rad 8px
  const pad = 16 * scale;
  const titleLines = (card.title || "").split("\n");
  const titleFontSize = Math.max(16, Math.round(24 * scale));

  ctx.save();
  ctx.font = `600 ${titleFontSize}px "Fraunces", Georgia, serif`;
  ctx.textAlign = "left";
  ctx.textBaseline = "top";

  let maxLineW = 0;
  for (const line of titleLines) {
    const lw = ctx.measureText(line).width;
    if (lw > maxLineW) maxLineW = lw;
  }

  const chipPadX = 12 * scale;
  const chipPadY = 8 * scale;
  const chipW = maxLineW + chipPadX * 2;
  const chipH = titleLines.length * (titleFontSize * 1.15) + chipPadY * 2;

  // Solid navy chip at 85% opacity
  ctx.fillStyle = "rgba(10, 31, 68, 0.88)";
  ctx.beginPath();
  ctx.roundRect(x + pad, y + pad, chipW, chipH, 8 * scale);
  ctx.fill();
  ctx.strokeStyle = "rgba(250, 245, 235, 0.15)";
  ctx.lineWidth = 1;
  ctx.stroke();

  // Cream 100% title text
  ctx.fillStyle = "#FAF5EB";
  let curY = y + pad + chipPadY;
  for (const line of titleLines) {
    ctx.fillText(line, x + pad + chipPadX, curY);
    curY += titleFontSize * 1.15;
  }
  ctx.restore();

  // 6. LABELS: small solid pills, cream background with navy text, 11px, weight 600
  if (card.labels && card.labels.length > 0) {
    ctx.save();
    const labelFontSize = Math.max(9, Math.round(11 * scale));
    ctx.font = `600 ${labelFontSize}px "IBM Plex Mono", monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    let pillX = x + pad;
    const pillY = y + pad + chipH + 8 * scale;
    const pillH = Math.max(16, 20 * scale);

    for (const label of card.labels) {
      const textW = ctx.measureText(label).width;
      const pillW = textW + 14 * scale;

      // Solid cream background pill
      ctx.fillStyle = "#FAF5EB";
      ctx.beginPath();
      ctx.roundRect(pillX, pillY, pillW, pillH, 999);
      ctx.fill();

      // Navy text
      ctx.fillStyle = "#0A1F44";
      ctx.fillText(label, pillX + pillW * 0.5, pillY + pillH * 0.5);

      pillX += pillW + 6 * scale;
    }
    ctx.restore();
  }

  // 7. BIG NUMERAL BOTTOM RIGHT: Fraunces 64px, weight 300, cream to coral, 100% opacity
  let numW = 0;
  if (card.value) {
    ctx.save();
    const numSize = Math.max(38, Math.round(64 * scale));
    ctx.font = `300 ${numSize}px "Fraunces", Georgia, serif`;
    ctx.textAlign = "right";
    ctx.textBaseline = "bottom";

    const numX = x + width - pad;
    const numY = y + height - pad;
    numW = ctx.measureText(card.value).width;

    const numGrad = ctx.createLinearGradient(numX - numW, numY - numSize, numX, numY);
    numGrad.addColorStop(0, "#FAF5EB");
    numGrad.addColorStop(1, "#FF6B4A");

    ctx.fillStyle = numGrad;
    ctx.fillText(card.value, numX, numY);
    ctx.restore();
  }

  // 8. FOOTER BOTTOM LEFT: IBM Plex Mono 11px, weight 600, letter spacing 0.12em, cream 100% on navy chip 85%
  if (card.footer) {
    ctx.save();
    const footSize = Math.max(8, Math.round(11 * scale));
    ctx.font = `600 ${footSize}px "IBM Plex Mono", monospace`;
    ctx.textAlign = "left";
    ctx.textBaseline = "bottom";

    const footText = card.footer.toUpperCase();
    const footW = ctx.measureText(footText).width;
    const fChipPadX = 10 * scale;
    const fChipPadY = 6 * scale;
    const fChipW = footW + fChipPadX * 2;
    const fChipH = footSize * 1.4 + fChipPadY * 2;

    const fChipX = x + pad;
    const fChipY = y + height - pad - fChipH;

    ctx.fillStyle = "rgba(10, 31, 68, 0.88)";
    ctx.beginPath();
    ctx.roundRect(fChipX, fChipY, fChipW, fChipH, 8 * scale);
    ctx.fill();
    ctx.strokeStyle = "rgba(250, 245, 235, 0.15)";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = "#FAF5EB";
    ctx.fillText(footText, fChipX + fChipPadX, fChipY + fChipH - fChipPadY);
    ctx.restore();
  }

  ctx.restore();
}

// ============================================================================
// POINT CLOUD SHAPE GENERATORS PER CARD (Fathomless Point Cloud Style)
// ============================================================================
function paintCardPointCloudShape(
  ctx: CanvasRenderingContext2D,
  cardIdx: number,
  cx: number,
  cy: number,
  cw: number,
  ch: number,
  scale: number,
  time: number,
  pointer: { x: number; y: number; active: boolean }
) {
  const ptSize = Math.max(2, Math.round(2.5 * scale));
  const centerX = cx + cw * 0.5;
  const centerY = cy + ch * 0.52;

  // Hover void repulsion: 30 to 50 px void opens around pointer
  const repelRadius = 45 * scale;

  ctx.save();

  // Pseudo-random deterministic grid points
  const rows = 36;
  const cols = 28;
  const stepX = (cw * 0.75) / cols;
  const stepY = (ch * 0.60) / rows;
  const startX = centerX - (cols * stepX) * 0.5;
  const startY = centerY - (rows * stepY) * 0.5;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const u = c / (cols - 1); // 0 to 1
      const v = r / (rows - 1); // 0 to 1
      const nx = (u - 0.5) * 2; // -1 to 1
      const ny = (v - 0.5) * 2; // -1 to 1

      let inShape = false;
      let isCoralAccent = false;

      // -------------------------------------------------------------
      // Card 01 ToolKB.in: downward arrow going into a box with gauge arc
      // -------------------------------------------------------------
      if (cardIdx === 0) {
        // Box outline at bottom (ny between 0.2 and 0.8, |nx| < 0.6)
        const isBoxBottom = ny > 0.72 && ny < 0.82 && Math.abs(nx) < 0.65;
        const isBoxSides = ny > 0.25 && ny <= 0.82 && (Math.abs(nx - 0.62) < 0.08 || Math.abs(nx + 0.62) < 0.08);

        // Downward arrow in center (stem: |nx| < 0.12, ny from -0.3 to 0.45)
        const isArrowStem = Math.abs(nx) < 0.12 && ny >= -0.30 && ny <= 0.42;
        // Arrow head: ny from 0.4 to 0.68, |nx| < (0.68 - ny) * 1.5
        const isArrowHead = ny > 0.40 && ny < 0.68 && Math.abs(nx) < (0.68 - ny) * 1.35;

        // Gauge arc above: ny around -0.65 to -0.45, circle arc
        const distGauge = Math.sqrt(nx * nx + (ny + 0.45) * (ny + 0.45));
        const isGaugeArc = distGauge > 0.40 && distGauge < 0.54 && ny < -0.45;

        inShape = isBoxBottom || isBoxSides || isArrowStem || isArrowHead || isGaugeArc;
        isCoralAccent = isArrowStem || isArrowHead;
      }
      // -------------------------------------------------------------
      // Card 02 Brandcey: storefront with awning and three shop windows
      // -------------------------------------------------------------
      else if (cardIdx === 1) {
        // Awning at top (ny between -0.6 and -0.15)
        const isAwningRoof = ny > -0.65 && ny < -0.35 && Math.abs(nx) < 0.75 - (ny + 0.65) * 0.2;
        const isAwningScallop = ny >= -0.35 && ny <= -0.22 && Math.abs(nx) < 0.8;

        // Wall & 3 Shop Windows (ny from -0.15 to 0.7)
        const isWindow1 = Math.abs(nx + 0.48) < 0.16 && ny > -0.05 && ny < 0.55;
        const isWindow2 = Math.abs(nx) < 0.16 && ny > -0.05 && ny < 0.65; // door / center window
        const isWindow3 = Math.abs(nx - 0.48) < 0.16 && ny > -0.05 && ny < 0.55;

        const isWallFrame = (ny > -0.22 && ny < 0.75 && (Math.abs(nx - 0.75) < 0.07 || Math.abs(nx + 0.75) < 0.07)) || (ny > 0.72 && ny < 0.80 && Math.abs(nx) < 0.78);

        inShape = isAwningRoof || isAwningScallop || isWindow1 || isWindow2 || isWindow3 || isWallFrame;
        isCoralAccent = isAwningScallop || isWindow2;
      }
      // -------------------------------------------------------------
      // Card 03 Arogya Relief: medical cross with heartbeat pulse line
      // -------------------------------------------------------------
      else if (cardIdx === 2) {
        // Medical cross (vertical bar: |nx| < 0.22, ny between -0.65 and 0.65; horizontal bar: |nx| < 0.65, ny between -0.22 and 0.22)
        const isCrossVert = Math.abs(nx) < 0.22 && Math.abs(ny) < 0.65;
        const isCrossHoriz = Math.abs(nx) < 0.65 && Math.abs(ny) < 0.22;
        const isCross = isCrossVert || isCrossHoriz;

        // Heartbeat pulse line running through (ny animated with sine wave & spike)
        const pulseCycle = (time * 0.8) % 3.0; // 3 second cycle
        const pulseT = pulseCycle / 3.0;
        let pulseY = 0;
        if (Math.abs(nx - (pulseT * 2 - 1)) < 0.35) {
          if (Math.abs(nx) < 0.15) pulseY = -nx * 3.5;
          else if (Math.abs(nx) < 0.3) pulseY = nx * 2.0;
        }
        const isPulseLine = Math.abs(ny - pulseY) < 0.12 && Math.abs(nx) < 0.85;

        inShape = isCross || isPulseLine;
        isCoralAccent = isPulseLine;
      }
      // -------------------------------------------------------------
      // Card 04 The Retro Cafe: coffee cup with steam in three wavy lines
      // -------------------------------------------------------------
      else {
        // Cup body: ny between -0.1 and 0.65, |nx| < 0.52 - (ny * 0.15)
        const isCupBody = ny >= -0.10 && ny <= 0.60 && Math.abs(nx) < 0.50;
        // Cup handle: right side nx between 0.48 and 0.75, ny between 0.05 and 0.45
        const distHandle = Math.sqrt((nx - 0.52) * (nx - 0.52) + (ny - 0.25) * (ny - 0.25));
        const isHandle = distHandle > 0.14 && distHandle < 0.28 && nx > 0.48;
        // Saucer: ny between 0.62 and 0.74, |nx| < 0.70
        const isSaucer = ny >= 0.62 && ny <= 0.74 && Math.abs(nx) < 0.68;

        // Steam rising in three wavy lines: ny from -0.75 to -0.15
        const steam1 = Math.abs(nx + 0.25 - Math.sin(ny * 8.0 + time * 3.0) * 0.08) < 0.06 && ny < -0.15 && ny > -0.72;
        const steam2 = Math.abs(nx - Math.sin(ny * 8.0 + time * 3.0 + 1.0) * 0.08) < 0.06 && ny < -0.15 && ny > -0.80;
        const steam3 = Math.abs(nx - 0.25 - Math.sin(ny * 8.0 + time * 3.0 + 2.0) * 0.08) < 0.06 && ny < -0.15 && ny > -0.72;

        inShape = isCupBody || isHandle || isSaucer || steam1 || steam2 || steam3;
        isCoralAccent = steam1 || steam2 || steam3;
      }

      if (!inShape && Math.random() > 0.12) continue;

      let px = startX + c * stepX;
      let py = startY + r * stepY;

      // Pointer hover repulsion void: parts 30-50px
      if (pointer.active) {
        const dx = px - pointer.x;
        const dy = py - pointer.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < repelRadius && dist > 0.001) {
          const push = (1.0 - dist / repelRadius) * 22 * scale;
          px += (dx / dist) * push;
          py += (dy / dist) * push;
        }
      }

      // Color selection strictly: Cream 80%, Coral 60%, Navy 40%
      if (isCoralAccent) {
        ctx.fillStyle = "rgba(255, 107, 74, 0.75)";
      } else if (inShape) {
        ctx.fillStyle = Math.random() < 0.35 ? "rgba(255, 107, 74, 0.60)" : "rgba(250, 245, 235, 0.85)";
      } else {
        ctx.fillStyle = "rgba(27, 47, 77, 0.40)";
      }

      ctx.fillRect(px, py, ptSize, ptSize);
    }
  }

  ctx.restore();
}

export default WarpCarousel;
