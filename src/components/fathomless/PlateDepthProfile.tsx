"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { isWebGLAvailable } from "@/lib/webgl";

export default function PlateDepthProfile() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (!isWebGLAvailable()) return;

    let animationFrameId: number;
    const width = container.clientWidth || 1000;
    const height = container.clientHeight || 430;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
      -width / 2,
      width / 2,
      height / 2,
      -height / 2,
      1,
      1000
    );
    camera.position.z = 100;

    const isMobile = width < 768;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: !isMobile,
        powerPreference: "high-performance",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 1.5));
      container.appendChild(renderer.domElement);
    } catch {
      return;
    }

    // Cut canvas cost: 360 desktop, 144 mobile (40% of desktop)
    const POINT_COUNT = isMobile ? 144 : 360;
    const positions = new Float32Array(POINT_COUNT * 3);
    const originalPositions = new Float32Array(POINT_COUNT * 3);
    const colors = new Float32Array(POINT_COUNT * 3);
    const sizes = new Float32Array(POINT_COUNT);

    const colorNavy = new THREE.Color("#0A1F44");
    const colorDark = new THREE.Color("#061329");
    const colorCream = new THREE.Color("#FAF5EB");
    const colorCoral = new THREE.Color("#FF6B4A");

    const startX = -width / 2 + 80;
    const endX = width / 2 - 80;
    const startY = height / 2 - 70;
    const endY = -height / 2 + 70;

    let pIdx = 0;

    // 1. S-curve points
    const curvePointsCount = Math.floor(POINT_COUNT * 0.6);
    for (let i = 0; i < curvePointsCount; i++) {
      const t = i / (curvePointsCount - 1);
      const easeT = t * t * (3 - 2 * t);
      const cx = startX + t * (endX - startX);
      const cy = startY - easeT * (startY - endY);

      const spread = (Math.random() - 0.5) * 16;
      const x = cx + spread;
      const y = cy + (Math.random() - 0.5) * 12;

      positions[pIdx * 3] = x;
      positions[pIdx * 3 + 1] = y;
      positions[pIdx * 3 + 2] = 0;

      originalPositions[pIdx * 3] = x;
      originalPositions[pIdx * 3 + 1] = y;
      originalPositions[pIdx * 3 + 2] = 0;

      if (Math.random() < 0.25) {
        colors[pIdx * 3] = colorCoral.r;
        colors[pIdx * 3 + 1] = colorCoral.g;
        colors[pIdx * 3 + 2] = colorCoral.b;
        sizes[pIdx] = 3.5;
      } else {
        const c = colorCream.clone().lerp(colorDark, Math.random() * 0.3);
        colors[pIdx * 3] = c.r;
        colors[pIdx * 3 + 1] = c.g;
        colors[pIdx * 3 + 2] = c.b;
        sizes[pIdx] = 2.5 + Math.random() * 1.5;
      }
      pIdx++;
    }

    // 2. Three Coral Nodes on curve
    const nodeTs = [0.05, 0.38, 0.92];
    for (const nt of nodeTs) {
      const easeT = nt * nt * (3 - 2 * nt);
      const nx = startX + nt * (endX - startX);
      const ny = startY - easeT * (startY - endY);

      for (let k = 0; k < 25; k++) {
        if (pIdx >= POINT_COUNT) break;
        const rad = Math.random() * 14;
        const ang = Math.random() * Math.PI * 2;
        const x = nx + Math.cos(ang) * rad;
        const y = ny + Math.sin(ang) * rad;

        positions[pIdx * 3] = x;
        positions[pIdx * 3 + 1] = y;
        positions[pIdx * 3 + 2] = 1;

        originalPositions[pIdx * 3] = x;
        originalPositions[pIdx * 3 + 1] = y;
        originalPositions[pIdx * 3 + 2] = 1;

        colors[pIdx * 3] = colorCoral.r;
        colors[pIdx * 3 + 1] = colorCoral.g;
        colors[pIdx * 3 + 2] = colorCoral.b;
        sizes[pIdx] = 3.2 + Math.random() * 2.5;
        pIdx++;
      }
    }

    // 3. Background dense point field & faint zone lines
    while (pIdx < POINT_COUNT) {
      const isZoneLine = Math.random() < 0.35;
      let x = (Math.random() - 0.5) * (width - 40);
      let y = (Math.random() - 0.5) * (height - 40);

      if (isZoneLine) {
        const lineY = Math.random() < 0.5 ? height / 6 : -height / 6;
        y = lineY + (Math.random() - 0.5) * 3;
      }

      positions[pIdx * 3] = x;
      positions[pIdx * 3 + 1] = y;
      positions[pIdx * 3 + 2] = -1;

      originalPositions[pIdx * 3] = x;
      originalPositions[pIdx * 3 + 1] = y;
      originalPositions[pIdx * 3 + 2] = -1;

      if (isZoneLine) {
        colors[pIdx * 3] = colorNavy.r * 0.9;
        colors[pIdx * 3 + 1] = colorNavy.g * 0.9;
        colors[pIdx * 3 + 2] = colorNavy.b * 0.9;
        sizes[pIdx] = 1.5;
      } else {
        const c = colorDark.clone().lerp(colorNavy, Math.random() * 0.6);
        colors[pIdx * 3] = c.r;
        colors[pIdx * 3 + 1] = c.g;
        colors[pIdx * 3 + 2] = c.b;
        sizes[pIdx] = 1.0 + Math.random() * 1.5;
      }
      pIdx++;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const vertexShader = `
      attribute float size;
      attribute vec3 color;
      varying vec3 vColor;
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (1.0 / -mvPosition.z) * 100.0;
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const fragmentShader = `
      varying vec3 vColor;
      void main() {
        gl_FragColor = vec4(vColor, 0.9);
      }
    `;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
    });

    const pointCloud = new THREE.Points(geometry, material);
    scene.add(pointCloud);

    // Mouse repulsion
    const mouse = { x: -9999, y: -9999, active: false };

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      mouse.x = clientX - width / 2;
      mouse.y = -(clientY - height / 2);
      mouse.active = true;
    };

    const handlePointerLeave = () => {
      mouse.active = false;
    };

    container.addEventListener("mousemove", handlePointerMove);
    container.addEventListener("mouseleave", handlePointerLeave);

    const REPEL_RADIUS = 55;
    const REPEL_STRENGTH = 40;
    const RETURN_FACTOR = 0.06;

    let isTabVisible = document.visibilityState === "visible";
    let isInView = true;

    const handleVisibilityChange = () => {
      isTabVisible = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isInView = entry.isIntersecting;
      },
      { rootMargin: "100px" }
    );
    intersectionObserver.observe(container);

    let time = 0;
    const animate = () => {
      if (isTabVisible && isInView) {
        time += 0.015;
        const posAttr = geometry.attributes.position;
        const posArr = posAttr.array as Float32Array;

        for (let i = 0; i < POINT_COUNT; i++) {
          const i3 = i * 3;
          const ox = originalPositions[i3];
          const oy = originalPositions[i3 + 1];
          let px = posArr[i3];
          let py = posArr[i3 + 1];

          const idleX = ox + Math.sin(time + oy * 0.02) * 1.5;
          const idleY = oy + Math.cos(time + ox * 0.02) * 1.0;

          if (mouse.active) {
            const dx = px - mouse.x;
            const dy = py - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < REPEL_RADIUS && dist > 0.001) {
              const force = (1.0 - dist / REPEL_RADIUS) * REPEL_STRENGTH;
              px += (dx / dist) * force * 0.25;
              py += (dy / dist) * force * 0.25;
            }
          }

          px += (idleX - px) * RETURN_FACTOR;
          py += (idleY - py) * RETURN_FACTOR;

          posArr[i3] = px;
          posArr[i3 + 1] = py;
        }

        posAttr.needsUpdate = true;
        renderer.render(scene, camera);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      intersectionObserver.disconnect();
      container.removeEventListener("mousemove", handlePointerMove);
      container.removeEventListener("mouseleave", handlePointerLeave);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[360px] md:h-[430px] rounded-lg overflow-hidden border border-[#FAF5EB]/10 bg-[#071633]/60 cursor-crosshair select-none"
    >
      <div className="absolute left-[10%] top-[16%] pointer-events-none select-none flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#FF6B4A]" />
        <span className="font-mono text-[11px] font-semibold tracking-[0.2em] text-[#FAF5EB]">
          SKETCH // 0 M
        </span>
      </div>

      <div className="absolute left-[40%] top-[46%] pointer-events-none select-none flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#FF6B4A]" />
        <span className="font-mono text-[11px] font-semibold tracking-[0.2em] text-[#FAF5EB]">
          BUILD // 520 M
        </span>
      </div>

      <div className="absolute right-[8%] bottom-[14%] pointer-events-none select-none flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#FF6B4A]" />
        <span className="font-mono text-[11px] font-semibold tracking-[0.2em] text-[#FAF5EB]">
          LAUNCH // PRODUCTION
        </span>
      </div>
    </div>
  );
}
