"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface PlateProps {
  url?: string;
}

export default function PlateToolKB({ url = "https://toolkb.in" }: PlateProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 330;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 80;

    const isMobile = width < 768;
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 1.5));
    container.appendChild(renderer.domElement);

    // Large image file shrinking: square with downward arrow and small KB badge
    const POINT_COUNT = isMobile ? 320 : 800;
    const positions = new Float32Array(POINT_COUNT * 3);
    const originalPositions = new Float32Array(POINT_COUNT * 3);
    const colors = new Float32Array(POINT_COUNT * 3);
    const sizes = new Float32Array(POINT_COUNT);

    const cCream = new THREE.Color("#FAF5EB");
    const cCoral = new THREE.Color("#FF6B4A");
    const cNavy = new THREE.Color("#1B2F4D");
    const cDark = new THREE.Color("#0A1F44");

    let pIdx = 0;

    // 1. Outer File Square (size 34 x 34)
    const filePoints = 850;
    for (let i = 0; i < filePoints; i++) {
      const edge = Math.floor(Math.random() * 4);
      const t = Math.random();
      let x = 0;
      let y = 0;
      const hw = 17;

      if (edge === 0) { // top
        x = -hw + t * (hw * 2);
        y = hw;
      } else if (edge === 1) { // right
        x = hw;
        y = -hw + t * (hw * 2);
      } else if (edge === 2) { // bottom
        x = -hw + t * (hw * 2);
        y = -hw;
      } else { // left
        x = -hw;
        y = -hw + t * (hw * 2);
      }

      // Add gentle jitter
      x += (Math.random() - 0.5) * 1.5;
      y += (Math.random() - 0.5) * 1.5;

      positions[pIdx * 3] = x;
      positions[pIdx * 3 + 1] = y;
      positions[pIdx * 3 + 2] = (Math.random() - 0.5) * 2;

      originalPositions[pIdx * 3] = x;
      originalPositions[pIdx * 3 + 1] = y;
      originalPositions[pIdx * 3 + 2] = positions[pIdx * 3 + 2];

      colors[pIdx * 3] = cCream.r;
      colors[pIdx * 3 + 1] = cCream.g;
      colors[pIdx * 3 + 2] = cCream.b;
      sizes[pIdx] = 2.2;
      pIdx++;
    }

    // 2. Downward Arrow inside
    const arrowPoints = 800;
    for (let i = 0; i < arrowPoints; i++) {
      let x = 0;
      let y = 0;
      const isStem = Math.random() < 0.55;

      if (isStem) {
        // stem: -3 to 3, y from 12 down to -4
        x = (Math.random() - 0.5) * 6;
        y = -4 + Math.random() * 16;
      } else {
        // arrowhead pointing down
        const t = Math.random();
        const spread = (1 - t) * 12;
        x = (Math.random() - 0.5) * spread * 2;
        y = -4 - t * 8;
      }

      positions[pIdx * 3] = x;
      positions[pIdx * 3 + 1] = y;
      positions[pIdx * 3 + 2] = 0;

      originalPositions[pIdx * 3] = x;
      originalPositions[pIdx * 3 + 1] = y;
      originalPositions[pIdx * 3 + 2] = 0;

      colors[pIdx * 3] = cCoral.r;
      colors[pIdx * 3 + 1] = cCoral.g;
      colors[pIdx * 3 + 2] = cCoral.b;
      sizes[pIdx] = 2.6;
      pIdx++;
    }

    // 3. KB Badge at top right (x ~ 10..15, y ~ 9..14)
    while (pIdx < POINT_COUNT) {
      const isBadge = Math.random() < 0.6;
      let x = 0;
      let y = 0;
      let col = cCream;

      if (isBadge) {
        x = 9 + Math.random() * 6;
        y = 9 + Math.random() * 5;
        col = cCoral;
      } else {
        x = (Math.random() - 0.5) * 36;
        y = (Math.random() - 0.5) * 36;
        col = Math.random() < 0.5 ? cNavy : cDark;
      }

      positions[pIdx * 3] = x;
      positions[pIdx * 3 + 1] = y;
      positions[pIdx * 3 + 2] = -1;

      originalPositions[pIdx * 3] = x;
      originalPositions[pIdx * 3 + 1] = y;
      originalPositions[pIdx * 3 + 2] = -1;

      colors[pIdx * 3] = col.r;
      colors[pIdx * 3 + 1] = col.g;
      colors[pIdx * 3 + 2] = col.b;
      sizes[pIdx] = isBadge ? 2.2 : 1.5;
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
        gl_PointSize = size * (60.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const fragmentShader = `
      varying vec3 vColor;
      void main() {
        gl_FragColor = vec4(vColor, 0.88);
      }
    `;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Mouse hover repulsion & tilt
    const mouse = { x: -9999, y: -9999, normX: 0, normY: 0, active: false };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      mouse.normX = (clientX / width) * 2 - 1;
      mouse.normY = -(clientY / height) * 2 + 1;
      mouse.x = mouse.normX * 32;
      mouse.y = mouse.normY * 26;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.normX = 0;
      mouse.normY = 0;
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    let time = 0;
    const animate = () => {
      time += 0.018;

      // Gentle shrinking / compression pulse
      const shrinkScale = 1.0 + Math.sin(time * 1.5) * 0.04;
      points.scale.set(shrinkScale, shrinkScale, 1);

      points.rotation.y += (mouse.normX * 0.35 - points.rotation.y) * 0.05;
      points.rotation.x += (-mouse.normY * 0.25 - points.rotation.x) * 0.05;

      const posAttr = geometry.attributes.position;
      const posArr = posAttr.array as Float32Array;

      for (let i = 0; i < POINT_COUNT; i++) {
        const i3 = i * 3;
        let px = posArr[i3];
        let py = posArr[i3 + 1];

        if (mouse.active) {
          const dx = px - mouse.x;
          const dy = py - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const repelRadius = 15;
          if (dist < repelRadius && dist > 0.001) {
            const force = (1.0 - dist / repelRadius) * 2.5;
            px += (dx / dist) * force;
            py += (dy / dist) * force;
          }
        }

        const ox = originalPositions[i3];
        const oy = originalPositions[i3 + 1];
        px += (ox - px) * 0.05;
        py += (oy - py) * 0.05;

        posArr[i3] = px;
        posArr[i3 + 1] = py;
      }

      posAttr.needsUpdate = true;
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block relative w-full h-[260px] sm:h-[330px] rounded-lg overflow-hidden border border-[#FAF5EB]/10 bg-[#071633]/80 cursor-pointer transition-colors hover:border-[#FF6B4A]/40"
      aria-label="Visit ToolKB.in live website"
    >
      <div ref={containerRef} className="w-full h-full" />
    </a>
  );
}
