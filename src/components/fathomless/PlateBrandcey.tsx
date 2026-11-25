"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface PlateProps {
  url?: string;
}

export default function PlateBrandcey({ url = "" }: PlateProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    const size = container.clientWidth || 290;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 1000);
    camera.position.z = 72;

    const isMobile = size < 768;
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 1.5));
    container.appendChild(renderer.domElement);

    const discGroup = new THREE.Group();
    scene.add(discGroup);

    // Point cloud disc forming a storefront awning in a circle with three shop windows
    const POINT_COUNT = isMobile ? 320 : 800;
    const positions = new Float32Array(POINT_COUNT * 3);
    const originalPositions = new Float32Array(POINT_COUNT * 3);
    const colors = new Float32Array(POINT_COUNT * 3);
    const sizes = new Float32Array(POINT_COUNT);

    const cCream = new THREE.Color("#FAF5EB");
    const cCoral = new THREE.Color("#FF6B4A");
    const cNavy = new THREE.Color("#1B2F4D");
    const cDeep = new THREE.Color("#0A1F44");

    const outerRadius = 22.0;

    let pIdx = 0;

    // 1. Circular disc awning points (top arc: theta from 0.2*PI to 0.8*PI)
    for (let i = 0; i < 900; i++) {
      const r = 12 + Math.random() * 9;
      const theta = 0.15 * Math.PI + Math.random() * 0.7 * Math.PI;
      const x = Math.cos(theta) * r;
      const y = Math.sin(theta) * r;
      const z = (Math.random() - 0.5) * 2;

      positions[pIdx * 3] = x;
      positions[pIdx * 3 + 1] = y;
      positions[pIdx * 3 + 2] = z;

      originalPositions[pIdx * 3] = x;
      originalPositions[pIdx * 3 + 1] = y;
      originalPositions[pIdx * 3 + 2] = z;

      const isCoral = Math.random() < 0.45;
      colors[pIdx * 3] = isCoral ? cCoral.r : cCream.r;
      colors[pIdx * 3 + 1] = isCoral ? cCoral.g : cCream.g;
      colors[pIdx * 3 + 2] = isCoral ? cCoral.b : cCream.b;
      sizes[pIdx] = 2.4;
      pIdx++;
    }

    // 2. Three shop windows (3 rectangular clusters below awning)
    const windowCenters = [-9, 0, 9];
    for (const wx of windowCenters) {
      for (let j = 0; j < 250; j++) {
        if (pIdx >= POINT_COUNT) break;
        const x = wx + (Math.random() - 0.5) * 5.5;
        const y = -4 + (Math.random() - 0.5) * 8.5;
        const z = (Math.random() - 0.5) * 1.5;

        positions[pIdx * 3] = x;
        positions[pIdx * 3 + 1] = y;
        positions[pIdx * 3 + 2] = z;

        originalPositions[pIdx * 3] = x;
        originalPositions[pIdx * 3 + 1] = y;
        originalPositions[pIdx * 3 + 2] = z;

        const isCream = Math.random() < 0.65;
        colors[pIdx * 3] = isCream ? cCream.r : cCoral.r;
        colors[pIdx * 3 + 1] = isCream ? cCream.g : cCoral.g;
        colors[pIdx * 3 + 2] = isCream ? cCream.b : cCoral.b;
        sizes[pIdx] = 2.2;
        pIdx++;
      }
    }

    // 3. Ambient disc speckles (navy, cream, coral)
    while (pIdx < POINT_COUNT) {
      const rRatio = Math.sqrt(Math.random());
      const r = 4 + rRatio * (outerRadius - 4);
      const theta = Math.random() * Math.PI * 2;

      const x = Math.cos(theta) * r;
      const y = Math.sin(theta) * r;
      const z = (Math.random() - 0.5) * 2.5;

      positions[pIdx * 3] = x;
      positions[pIdx * 3 + 1] = y;
      positions[pIdx * 3 + 2] = z;

      originalPositions[pIdx * 3] = x;
      originalPositions[pIdx * 3 + 1] = y;
      originalPositions[pIdx * 3 + 2] = z;

      const rand = Math.random();
      let col = cNavy;
      if (rand < 0.2) col = cCoral;
      else if (rand < 0.55) col = cCream;
      else col = cDeep;

      colors[pIdx * 3] = col.r;
      colors[pIdx * 3 + 1] = col.g;
      colors[pIdx * 3 + 2] = col.b;
      sizes[pIdx] = 1.8;
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
        gl_FragColor = vec4(vColor, 0.9);
      }
    `;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    discGroup.add(points);

    discGroup.rotation.x = 0.35;

    const mouse = { x: -9999, y: -9999, normX: 0, normY: 0, active: false };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      mouse.normX = (clientX / size) * 2 - 1;
      mouse.normY = -(clientY / size) * 2 + 1;
      mouse.x = mouse.normX * 24;
      mouse.y = mouse.normY * 24;
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
      time += 0.012;

      discGroup.rotation.z += 0.005;
      const targetRotX = 0.35 - mouse.normY * 0.3;
      const targetRotY = mouse.normX * 0.35;
      discGroup.rotation.x += (targetRotX - discGroup.rotation.x) * 0.05;
      discGroup.rotation.y += (targetRotY - discGroup.rotation.y) * 0.05;

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
          const repelRadius = 12;
          if (dist < repelRadius && dist > 0.001) {
            const force = (1.0 - dist / repelRadius) * 2.0;
            px += (dx / dist) * force;
            py += (dy / dist) * force;
          }
        }

        const ox = originalPositions[i3];
        const oy = originalPositions[i3 + 1];
        px += (ox - px) * 0.04;
        py += (oy - py) * 0.04;

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
    <div
      className="relative w-[260px] h-[260px] sm:w-[290px] sm:h-[290px] rounded-full overflow-hidden border border-[#FAF5EB]/10 bg-[#071633]/80 mx-auto select-none pointer-events-none"
    >
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
}
