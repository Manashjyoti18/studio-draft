"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function WorksCanvas3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // 2. Lighting - strictly using White and Orange highlights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.0);
    dirLight.position.set(6, 8, 6);
    scene.add(dirLight);

    const orangeLight = new THREE.PointLight(0xff6b35, 3.0, 15, 1.2);
    orangeLight.position.set(0, 0, 4);
    scene.add(orangeLight);

    // 3. Materials - strictly 4 colors: White (#FFFFFF), Ink Black (#111111), Orange (#FF6B35), Green (#B7E4C7)
    const inkMat = new THREE.MeshStandardMaterial({
      color: 0x111111,
      roughness: 0.3,
      metalness: 0.6,
    });

    const whiteMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.2,
      metalness: 0.2,
    });

    const orangeMat = new THREE.MeshStandardMaterial({
      color: 0xff6b35,
      roughness: 0.25,
      metalness: 0.4,
    });

    const greenWireMat = new THREE.MeshBasicMaterial({
      color: 0xb7e4c7,
      wireframe: true,
      transparent: true,
      opacity: 0.7,
    });

    const inkWireMat = new THREE.MeshBasicMaterial({
      color: 0x111111,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });

    // 4. Kinetic Editorial Object Assembly
    const group = new THREE.Group();
    scene.add(group);

    // Main central planar board (Ink Black)
    const mainPlateGeo = new THREE.BoxGeometry(2.8, 3.4, 0.08);
    const mainPlate = new THREE.Mesh(mainPlateGeo, inkMat);
    group.add(mainPlate);

    // Overlaid offset accent board (White)
    const subPlateGeo = new THREE.BoxGeometry(2.2, 2.6, 0.06);
    const subPlate = new THREE.Mesh(subPlateGeo, whiteMat);
    subPlate.position.set(-0.25, 0.2, 0.12);
    group.add(subPlate);

    // Dynamic Orange accent bar
    const barGeo = new THREE.BoxGeometry(2.4, 0.2, 0.1);
    const bar = new THREE.Mesh(barGeo, orangeMat);
    bar.position.set(0, -1.0, 0.2);
    group.add(bar);

    // Green Calibrated Coordinate Ring
    const ringGeo = new THREE.TorusGeometry(2.2, 0.02, 16, 80);
    const ring = new THREE.Mesh(ringGeo, greenWireMat);
    ring.rotation.x = Math.PI / 3.5;
    group.add(ring);

    // Outer wireframe cage
    const cageGeo = new THREE.BoxGeometry(4.4, 4.4, 4.4);
    const cage = new THREE.Mesh(cageGeo, inkWireMat);
    group.add(cage);

    // 5. Cursor Tracking & Scroll Parallax
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let scrollY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth - 0.5) * 2;
      targetY = (e.clientY / innerHeight - 0.5) * 2;
    };

    const onScroll = () => {
      scrollY = window.scrollY || window.pageYOffset;
    };

    const onResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    // 6. Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      // Subtle mechanical rotation
      group.rotation.y = elapsed * 0.12 + currentX * 0.5;
      group.rotation.x = -currentY * 0.35 + Math.sin(elapsed * 0.2) * 0.08;

      ring.rotation.z = -elapsed * 0.25;
      cage.rotation.y = elapsed * 0.05 + scrollY * 0.001;

      // Gentle camera reaction
      camera.position.x = currentX * 0.3;
      camera.position.y = -currentY * 0.3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full pointer-events-none select-none"
      aria-hidden="true"
    />
  );
}
