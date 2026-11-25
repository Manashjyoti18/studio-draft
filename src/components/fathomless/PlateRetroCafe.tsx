"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface PlateProps {
  url?: string;
}

export default function PlateRetroCafe({ url = "https://theretrocafe.in" }: PlateProps) {
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

    const group = new THREE.Group();
    scene.add(group);

    // Coffee cup with steam in cream and coral points
    const POINT_COUNT = isMobile ? 320 : 800;
    const positions = new Float32Array(POINT_COUNT * 3);
    const originalPositions = new Float32Array(POINT_COUNT * 3);
    const colors = new Float32Array(POINT_COUNT * 3);
    const sizes = new Float32Array(POINT_COUNT);
    const isSteamArr = new Float32Array(POINT_COUNT);

    const cCream = new THREE.Color("#FAF5EB");
    const cCoral = new THREE.Color("#FF6B4A");
    const cNavy = new THREE.Color("#1B2F4D");
    const cDark = new THREE.Color("#0A1F44");

    let pIdx = 0;

    // 1. Cup Body and Handle (y: -10 to 6, x: -12 to 12)
    const cupPoints = 1100;
    for (let i = 0; i < cupPoints; i++) {
      let x = 0;
      let y = 0;
      const isHandle = Math.random() < 0.22;

      if (isHandle) {
        // Handle on right: circle arc centered at (13, 0), radius ~5.5
        const theta = -Math.PI * 0.4 + Math.random() * Math.PI * 0.8;
        x = 11.5 + Math.cos(theta) * 5.5;
        y = 0 + Math.sin(theta) * 5.5;
      } else {
        // Cup body: tapered cylinder profile
        const u = Math.random();
        y = -8 + u * 15; // -8 to 7
        const halfWidth = 9.5 - (7 - y) * 0.15; // taper towards bottom
        x = (Math.random() - 0.5) * halfWidth * 2;
      }

      positions[pIdx * 3] = x;
      positions[pIdx * 3 + 1] = y;
      positions[pIdx * 3 + 2] = (Math.random() - 0.5) * 2;

      originalPositions[pIdx * 3] = x;
      originalPositions[pIdx * 3 + 1] = y;
      originalPositions[pIdx * 3 + 2] = positions[pIdx * 3 + 2];

      isSteamArr[pIdx] = 0;

      const isCoral = Math.random() < 0.35;
      colors[pIdx * 3] = isCoral ? cCoral.r : cCream.r;
      colors[pIdx * 3 + 1] = isCoral ? cCoral.g : cCream.g;
      colors[pIdx * 3 + 2] = isCoral ? cCoral.b : cCream.b;
      sizes[pIdx] = 2.4;
      pIdx++;
    }

    // 2. Saucer base (y: -10 to -13, width 32)
    const saucerPoints = 350;
    for (let i = 0; i < saucerPoints; i++) {
      const x = (Math.random() - 0.5) * 30;
      const y = -10.5 - Math.random() * 2.5;

      positions[pIdx * 3] = x;
      positions[pIdx * 3 + 1] = y;
      positions[pIdx * 3 + 2] = (Math.random() - 0.5) * 1.5;

      originalPositions[pIdx * 3] = x;
      originalPositions[pIdx * 3 + 1] = y;
      originalPositions[pIdx * 3 + 2] = positions[pIdx * 3 + 2];

      isSteamArr[pIdx] = 0;

      colors[pIdx * 3] = cCream.r;
      colors[pIdx * 3 + 1] = cCream.g;
      colors[pIdx * 3 + 2] = cCream.b;
      sizes[pIdx] = 2.2;
      pIdx++;
    }

    // 3. Steam rising in 3 wavy lines (y: 8 to 26)
    const steamPoints = 650;
    for (let i = 0; i < steamPoints; i++) {
      const strand = Math.floor(Math.random() * 3); // -6, 0, 6 base x
      const baseX = (strand - 1) * 6;
      const u = Math.random();
      const y = 8 + u * 18;
      const wave = Math.sin(u * Math.PI * 3 + strand) * 2.5;
      const x = baseX + wave + (Math.random() - 0.5) * 1.2;

      positions[pIdx * 3] = x;
      positions[pIdx * 3 + 1] = y;
      positions[pIdx * 3 + 2] = 1.0;

      originalPositions[pIdx * 3] = x;
      originalPositions[pIdx * 3 + 1] = y;
      originalPositions[pIdx * 3 + 2] = 1.0;

      isSteamArr[pIdx] = 1.0; // steam marker

      colors[pIdx * 3] = cCoral.r;
      colors[pIdx * 3 + 1] = cCoral.g;
      colors[pIdx * 3 + 2] = cCoral.b;
      sizes[pIdx] = 2.6;
      pIdx++;
    }

    // 4. Ambient points
    while (pIdx < POINT_COUNT) {
      const x = (Math.random() - 0.5) * 44;
      const y = (Math.random() - 0.5) * 36;
      positions[pIdx * 3] = x;
      positions[pIdx * 3 + 1] = y;
      positions[pIdx * 3 + 2] = -1;

      originalPositions[pIdx * 3] = x;
      originalPositions[pIdx * 3 + 1] = y;
      originalPositions[pIdx * 3 + 2] = -1;

      isSteamArr[pIdx] = 0;

      const c = Math.random() < 0.5 ? cNavy : cDark;
      colors[pIdx * 3] = c.r;
      colors[pIdx * 3 + 1] = c.g;
      colors[pIdx * 3 + 2] = c.b;
      sizes[pIdx] = 1.5;
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
    group.add(points);

    const mouse = { x: -9999, y: -9999, normX: 0, normY: 0, active: false };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      mouse.normX = (clientX / width) * 2 - 1;
      mouse.normY = -(clientY / height) * 2 + 1;
      mouse.x = mouse.normX * 30;
      mouse.y = mouse.normY * 25;
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

      group.rotation.y += (mouse.normX * 0.3 - group.rotation.y) * 0.05;
      group.rotation.x += (-mouse.normY * 0.2 - group.rotation.x) * 0.05;

      const posAttr = geometry.attributes.position;
      const posArr = posAttr.array as Float32Array;

      for (let i = 0; i < POINT_COUNT; i++) {
        const i3 = i * 3;
        const ox = originalPositions[i3];
        const oy = originalPositions[i3 + 1];

        let targetX = ox;
        let targetY = oy;

        // If steam particle, animate wave upward
        if (isSteamArr[i] > 0.5) {
          targetX = ox + Math.sin(time * 2.5 + oy * 0.3) * 1.5;
        }

        let px = posArr[i3];
        let py = posArr[i3 + 1];

        if (mouse.active) {
          const dx = px - mouse.x;
          const dy = py - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const repelRadius = 14;
          if (dist < repelRadius && dist > 0.001) {
            const force = (1.0 - dist / repelRadius) * 2.2;
            px += (dx / dist) * force;
            py += (dy / dist) * force;
          }
        }

        px += (targetX - px) * 0.05;
        py += (targetY - py) * 0.05;

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
      aria-label="Visit The Retro Cafe live website"
    >
      <div ref={containerRef} className="w-full h-full" />
    </a>
  );
}
