"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface PlateProps {
  url?: string;
}

export default function PlateArogya({ url = "https://www.arogyarelief.in" }: PlateProps) {
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

    // Medical cross with heartbeat pulse line in cream points with a coral pulse on black navy
    const POINT_COUNT = isMobile ? 320 : 800;
    const positions = new Float32Array(POINT_COUNT * 3);
    const originalPositions = new Float32Array(POINT_COUNT * 3);
    const colors = new Float32Array(POINT_COUNT * 3);
    const sizes = new Float32Array(POINT_COUNT);
    const pulseIndices = new Float32Array(POINT_COUNT);

    const cCream = new THREE.Color("#FAF5EB");
    const cCoral = new THREE.Color("#FF6B4A");
    const cNavy = new THREE.Color("#1B2F4D");
    const cDark = new THREE.Color("#0A1F44");

    let pIdx = 0;

    // 1. Medical Cross (vertical bar: |x| < 4.5, y: -16 to 16; horizontal bar: |x| < 16, y: -4.5 to 4.5)
    for (let i = 0; i < 1400; i++) {
      let x = 0;
      let y = 0;
      if (Math.random() < 0.5) {
        // vertical bar
        x = (Math.random() - 0.5) * 8.5;
        y = (Math.random() - 0.5) * 32;
      } else {
        // horizontal bar
        x = (Math.random() - 0.5) * 32;
        y = (Math.random() - 0.5) * 8.5;
      }

      positions[pIdx * 3] = x;
      positions[pIdx * 3 + 1] = y;
      positions[pIdx * 3 + 2] = (Math.random() - 0.5) * 2;

      originalPositions[pIdx * 3] = x;
      originalPositions[pIdx * 3 + 1] = y;
      originalPositions[pIdx * 3 + 2] = positions[pIdx * 3 + 2];

      pulseIndices[pIdx] = 0.0; // not on pulse line

      colors[pIdx * 3] = cCream.r;
      colors[pIdx * 3 + 1] = cCream.g;
      colors[pIdx * 3 + 2] = cCream.b;
      sizes[pIdx] = 2.4;
      pIdx++;
    }

    // 2. Heartbeat pulse line points (running horizontally across x: -22 to 22)
    const pulsePoints = 650;
    for (let i = 0; i < pulsePoints; i++) {
      const u = i / (pulsePoints - 1); // 0 to 1
      const x = -24 + u * 48;
      let y = 0;

      // Heartbeat wave profile (P-Q-R-S-T wave)
      const nx = (u - 0.5) * 2; // -1 to 1
      if (Math.abs(nx) < 0.12) {
        // R-peak spike
        y = (0.12 - Math.abs(nx)) * 75;
      } else if (Math.abs(nx - 0.2) < 0.08) {
        // S-dip
        y = -(0.08 - Math.abs(nx - 0.2)) * 30;
      } else if (Math.abs(nx + 0.2) < 0.08) {
        // Q-dip
        y = -(0.08 - Math.abs(nx + 0.2)) * 25;
      }

      positions[pIdx * 3] = x;
      positions[pIdx * 3 + 1] = y;
      positions[pIdx * 3 + 2] = 2.0;

      originalPositions[pIdx * 3] = x;
      originalPositions[pIdx * 3 + 1] = y;
      originalPositions[pIdx * 3 + 2] = 2.0;

      pulseIndices[pIdx] = u; // normalized coordinate along pulse

      colors[pIdx * 3] = cCoral.r;
      colors[pIdx * 3 + 1] = cCoral.g;
      colors[pIdx * 3 + 2] = cCoral.b;
      sizes[pIdx] = 3.0;
      pIdx++;
    }

    // 3. Ambient points
    while (pIdx < POINT_COUNT) {
      const x = (Math.random() - 0.5) * 44;
      const y = (Math.random() - 0.5) * 36;
      positions[pIdx * 3] = x;
      positions[pIdx * 3 + 1] = y;
      positions[pIdx * 3 + 2] = -1;

      originalPositions[pIdx * 3] = x;
      originalPositions[pIdx * 3 + 1] = y;
      originalPositions[pIdx * 3 + 2] = -1;

      pulseIndices[pIdx] = -1.0;

      const c = Math.random() < 0.5 ? cNavy : cDark;
      colors[pIdx * 3] = c.r;
      colors[pIdx * 3 + 1] = c.g;
      colors[pIdx * 3 + 2] = c.b;
      sizes[pIdx] = 1.6;
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

      // Pulse wave animates left to right in 3s then holds 1s
      const cycle = time % 4.0;
      const pulseProgress = Math.min(1.0, cycle / 3.0); // 0 to 1 over 3s, then holds for 1s

      const colorAttr = geometry.attributes.color;
      const colorArr = colorAttr.array as Float32Array;
      const posAttr = geometry.attributes.position;
      const posArr = posAttr.array as Float32Array;

      for (let i = 0; i < POINT_COUNT; i++) {
        const u = pulseIndices[i];
        const i3 = i * 3;

        if (u >= 0.0) {
          // If this point is on pulse line, glow bright coral when pulse passes
          const distToWave = Math.abs(u - pulseProgress);
          if (distToWave < 0.12) {
            colorArr[i3] = cCoral.r;
            colorArr[i3 + 1] = cCoral.g;
            colorArr[i3 + 2] = cCoral.b;
          } else {
            colorArr[i3] = cCream.r;
            colorArr[i3 + 1] = cCream.g;
            colorArr[i3 + 2] = cCream.b;
          }
        }

        // Mouse hover repulsion
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

        const ox = originalPositions[i3];
        const oy = originalPositions[i3 + 1];
        px += (ox - px) * 0.05;
        py += (oy - py) * 0.05;

        posArr[i3] = px;
        posArr[i3 + 1] = py;
      }

      colorAttr.needsUpdate = true;
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
      aria-label="Visit Arogya Relief live website"
    >
      <div ref={containerRef} className="w-full h-full" />
    </a>
  );
}
