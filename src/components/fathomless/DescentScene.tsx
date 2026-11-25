"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { isWebGLAvailable } from "@/lib/webgl";

interface DescentSceneProps {
  depthProgress: number; // 0.0 at surface to 1.0 at launch
  isPaused?: boolean;
}

export default function DescentScene({ depthProgress, isPaused = false }: DescentSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const depthRef = useRef(depthProgress);
  depthRef.current = depthProgress;

  const isPausedRef = useRef(isPaused);
  isPausedRef.current = isPaused;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 0. WebGL Guard: If WebGL is unavailable or fails, keep clean static navy background
    if (!isWebGLAvailable()) {
      return;
    }

    let animationFrameId: number;
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    const isMobile = width < 768;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 42);

    // Performance DPR Cap: 1.5 desktop, 1.25 mobile
    const maxDPR = isMobile ? 1.25 : 1.5;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: !isMobile,
        powerPreference: "high-performance",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxDPR));
      container.appendChild(renderer.domElement);
    } catch {
      // Graceful fallback to static CSS background if context fails
      return;
    }

    // 2. Procedural Underlay Navy Background Quad (#071633 flat Midnight Navy)
    const bgVertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position.xy, 0.9999, 1.0);
      }
    `;

    const bgFragmentShader = `
      uniform float uDepth; // 0.0 to 1.0
      varying vec2 vUv;

      const vec3 C_MIDNIGHT   = vec3(0.027, 0.086, 0.200); // #071633
      const vec3 C_DEEP_NAVY  = vec3(0.039, 0.122, 0.267); // #0A1F44
      const vec3 C_BLACK_NAVY = vec3(0.004, 0.027, 0.047); // #01070C

      void main() {
        vec3 colorTop = mix(C_MIDNIGHT, C_DEEP_NAVY, uDepth);
        vec3 colorBottom = mix(C_DEEP_NAVY, C_BLACK_NAVY, uDepth);
        vec3 bg = mix(colorBottom, colorTop, vUv.y);
        gl_FragColor = vec4(bg, 1.0);
      }
    `;

    const bgUniforms = {
      uDepth: { value: 0.0 },
    };

    const bgMaterial = new THREE.ShaderMaterial({
      vertexShader: bgVertexShader,
      fragmentShader: bgFragmentShader,
      uniforms: bgUniforms,
      depthTest: false,
      depthWrite: false,
    });

    const bgQuad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), bgMaterial);
    bgQuad.frustumCulled = false;
    scene.add(bgQuad);

    // 3. Typographic Rotating Ring - Visible, readable, max 520px desktop, 320px mobile
    const RING_RADIUS = isMobile ? 5.8 : 9.5;
    const RING_HEIGHT = isMobile ? 1.4 : 1.8;
    const RING_SURFACE_Y = isMobile ? 0.0 : 0.0; // Centered behind and framing the headline

    const ringCanvas = document.createElement("canvas");
    ringCanvas.width = 2048;
    ringCanvas.height = 256;
    const ringCtx = ringCanvas.getContext("2d");
    if (ringCtx) {
      ringCtx.clearRect(0, 0, 2048, 256);
      ringCtx.font = "600 52px 'Fraunces', Georgia, serif";
      ringCtx.textAlign = "center";
      ringCtx.textBaseline = "middle";

      const phrase = "STUDIO DRAFT - DESIGN - DEVELOP - DEPLOY - ";
      const totalWidth = 2048;
      const repeatCount = 2;
      const step = totalWidth / repeatCount;

      for (let r = 0; r < repeatCount; r++) {
        const x = r * step + step / 2;
        ringCtx.fillStyle = "#FAF5EB";
        ringCtx.fillText(phrase, x, 128);
      }
    }

    const ringTexture = new THREE.CanvasTexture(ringCanvas);
    ringTexture.wrapS = THREE.RepeatWrapping;
    ringTexture.wrapT = THREE.ClampToEdgeWrapping;
    ringTexture.repeat.set(1, 1);

    const ringGeom = new THREE.CylinderGeometry(
      RING_RADIUS,
      RING_RADIUS,
      RING_HEIGHT,
      isMobile ? 48 : 96,
      1,
      true
    );

    const ringUniforms = {
      uTexture: { value: ringTexture },
      uDepth: { value: 0.0 },
      uOpacity: { value: 1.0 },
    };

    const ringVertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const ringFragmentShader = `
      uniform sampler2D uTexture;
      uniform float uDepth;
      uniform float uOpacity;
      varying vec2 vUv;

      void main() {
        vec4 tex = texture2D(uTexture, vUv);
        if (tex.a < 0.08) discard;

        bool isFront = gl_FrontFacing;
        vec3 letterColor = vec3(0.980, 0.961, 0.922); // #FAF5EB Cream

        float alpha = tex.a * uOpacity * (isFront ? 0.95 : 0.35);
        gl_FragColor = vec4(letterColor, alpha);
      }
    `;

    const ringMaterial = new THREE.ShaderMaterial({
      vertexShader: ringVertexShader,
      fragmentShader: ringFragmentShader,
      uniforms: ringUniforms,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    const ringMesh = new THREE.Mesh(ringGeom, ringMaterial);
    ringMesh.position.set(0, RING_SURFACE_Y, 0);
    scene.add(ringMesh);

    // 4. Clean Particle System - strictly capped at 360 desktop, 144 mobile (40% of desktop)
    const TOTAL_POINTS = isMobile ? 144 : 360;

    const pointPositions = new Float32Array(TOTAL_POINTS * 3);
    const pointColors = new Float32Array(TOTAL_POINTS * 3);
    const pointSizes = new Float32Array(TOTAL_POINTS);
    const pointBaseOpacities = new Float32Array(TOTAL_POINTS);
    const pointSpeeds = new Float32Array(TOTAL_POINTS);
    const pointPhases = new Float32Array(TOTAL_POINTS);

    const cCream = new THREE.Color("#FAF5EB");
    const cCoral = new THREE.Color("#FF6B4A");

    for (let i = 0; i < TOTAL_POINTS; i++) {
      let x = (Math.random() - 0.5) * 44;
      let y = -22 + Math.random() * 36;
      const z = (Math.random() - 0.5) * 20;

      if (Math.abs(x) < 16 && y > -14 && y < 14) {
        x = (x < 0 ? -1 : 1) * (16 + Math.random() * 8);
      }

      pointPositions[i * 3] = x;
      pointPositions[i * 3 + 1] = y;
      pointPositions[i * 3 + 2] = z;

      pointSpeeds[i] = 0.02 + Math.random() * 0.035;
      pointPhases[i] = Math.random() * Math.PI * 2;
      pointSizes[i] = 1.0 + Math.random() * 2.0;

      const isCoral = Math.random() < 0.25;
      const col = isCoral ? cCoral : cCream;
      pointColors[i * 3] = col.r;
      pointColors[i * 3 + 1] = col.g;
      pointColors[i * 3 + 2] = col.b;
      pointBaseOpacities[i] = isCoral ? 0.60 : 0.70;
    }

    const pointGeom = new THREE.BufferGeometry();
    pointGeom.setAttribute("position", new THREE.BufferAttribute(pointPositions, 3));
    pointGeom.setAttribute("color", new THREE.BufferAttribute(pointColors, 3));
    pointGeom.setAttribute("size", new THREE.BufferAttribute(pointSizes, 1));
    pointGeom.setAttribute("baseOpacity", new THREE.BufferAttribute(pointBaseOpacities, 1));

    const pointUniforms = {
      uDepth: { value: 0.0 },
      uPointerRepel: { value: new THREE.Vector2(-9999, -9999) },
    };

    const pointVertexShader = `
      attribute float size;
      attribute vec3 color;
      attribute float baseOpacity;
      uniform float uDepth;
      uniform vec2 uPointerRepel;
      varying vec3 vColor;
      varying float vOpacity;

      void main() {
        vColor = color;
        vOpacity = baseOpacity;

        vec3 pos = position;
        vec2 delta = pos.xy - uPointerRepel;
        float d = length(delta);
        float voidRadius = 4.0;
        if (d < voidRadius && d > 0.001) {
          vec2 dir = normalize(delta);
          float push = (1.0 - d / voidRadius) * 2.5;
          pos.xy += dir * push;
        }

        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = size * (50.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const pointFragmentShader = `
      varying vec3 vColor;
      varying float vOpacity;
      void main() {
        if (vOpacity < 0.01) discard;
        gl_FragColor = vec4(vColor, vOpacity);
      }
    `;

    const pointMaterial = new THREE.ShaderMaterial({
      vertexShader: pointVertexShader,
      fragmentShader: pointFragmentShader,
      uniforms: pointUniforms,
      transparent: true,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(pointGeom, pointMaterial);
    scene.add(particleSystem);

    // 5. Pointer & Parallax
    const pointer = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      worldX: -9999,
      worldY: -9999,
    };

    const handlePointerMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      pointer.targetX = normX;
      pointer.targetY = normY;
      pointer.worldX = normX * 22;
      pointer.worldY = normY * 16;
    };

    const handlePointerLeave = () => {
      pointer.targetX = 0;
      pointer.targetY = 0;
      pointer.worldX = -9999;
      pointer.worldY = -9999;
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("mouseleave", handlePointerLeave, { passive: true });

    // 6. Viewport Visibility & Tab Active Observer
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

    let clock = new THREE.Clock();
    const posArr = pointGeom.attributes.position.array as Float32Array;

    const animate = () => {
      if (!isPausedRef.current && isTabVisible && isInView) {
        const delta = Math.min(clock.getDelta(), 0.1);
        const time = clock.getElapsedTime();
        const depth = depthRef.current;

        pointer.x += (pointer.targetX - pointer.x) * 0.04;
        pointer.y += (pointer.targetY - pointer.y) * 0.04;

        bgUniforms.uDepth.value = depth;
        ringUniforms.uDepth.value = depth;
        pointUniforms.uDepth.value = depth;
        pointUniforms.uPointerRepel.value.set(pointer.worldX, pointer.worldY);

        ringMesh.rotation.y += delta * ((2 * Math.PI) / 40);
        ringMesh.rotation.z = pointer.x * 0.04;

        if (depth < 0.35) {
          const t = depth / 0.35;
          ringMesh.rotation.x = THREE.MathUtils.lerp(0.32, 0.22, t) - pointer.y * 0.06;
          ringMesh.scale.setScalar(THREE.MathUtils.lerp(1.0, 0.95, t));
          ringMesh.position.y = THREE.MathUtils.lerp(RING_SURFACE_Y, 2.0, t);
          ringMesh.position.z = THREE.MathUtils.lerp(0, -1, t);
          ringUniforms.uOpacity.value = THREE.MathUtils.lerp(0.80, 0.65, t);
        } else if (depth < 0.68) {
          const t = (depth - 0.35) / (0.68 - 0.35);
          ringMesh.rotation.x = THREE.MathUtils.lerp(0.22, 1.25, t) - pointer.y * 0.06;
          ringMesh.scale.setScalar(THREE.MathUtils.lerp(0.95, 0.85, t));
          ringMesh.position.y = THREE.MathUtils.lerp(2.0, -1.0, t);
          ringMesh.position.z = THREE.MathUtils.lerp(-1, -4, t);
          ringUniforms.uOpacity.value = THREE.MathUtils.lerp(0.65, 0.35, t);
        } else {
          const t = Math.min(1, (depth - 0.68) / 0.32);
          ringMesh.rotation.x = THREE.MathUtils.lerp(1.25, 1.45, t) - pointer.y * 0.06;
          ringMesh.scale.setScalar(THREE.MathUtils.lerp(0.85, 0.80, t));
          ringMesh.position.y = -1.0;
          ringMesh.position.z = -5.0;
          ringUniforms.uOpacity.value = THREE.MathUtils.lerp(0.35, 0.20, t);
        }

        for (let p = 0; p < TOTAL_POINTS; p++) {
          const p3 = p * 3;
          let py = posArr[p3 + 1];
          let px = posArr[p3];

          py -= pointSpeeds[p];
          if (py < -22.0) {
            py = 16.0;
            px = (Math.random() - 0.5) * 44;
          }

          px += Math.sin(time * 0.35 + pointPhases[p]) * 0.012;

          posArr[p3] = px;
          posArr[p3 + 1] = py;
        }
        pointGeom.attributes.position.needsUpdate = true;

        renderer.render(scene, camera);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      intersectionObserver.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mouseleave", handlePointerLeave);
      renderer.dispose();
      bgMaterial.dispose();
      ringMaterial.dispose();
      pointMaterial.dispose();
      ringTexture.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 pointer-events-none" />;
}
