"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function DraftScene3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability
    const testCanvas = document.createElement("canvas");
    const gl =
      testCanvas.getContext("webgl") ||
      testCanvas.getContext("experimental-webgl");
    if (!gl) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      40,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0); // Transparent canvas
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 2. Lighting Setup (Neutral White + Studio Orange Accent + Mint Fill)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(6, 8, 8);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xb7e4c7, 0.8);
    fillLight.position.set(-6, -4, 4);
    scene.add(fillLight);

    // Studio Orange Specular Accent Light
    const orangeLight = new THREE.PointLight(0xff6b35, 3.2, 14, 1.4);
    orangeLight.position.set(1.5, 2.5, 4);
    scene.add(orangeLight);

    // 3. Materials
    const browserFrameMat = new THREE.MeshStandardMaterial({
      color: 0x111111,
      metalness: 0.82,
      roughness: 0.28,
    });

    const browserHeaderMat = new THREE.MeshStandardMaterial({
      color: 0x181818,
      metalness: 0.65,
      roughness: 0.35,
    });

    const orangeDotMat = new THREE.MeshStandardMaterial({
      color: 0xff6b35,
      metalness: 0.4,
      roughness: 0.3,
    });

    const greenDotMat = new THREE.MeshStandardMaterial({
      color: 0xb7e4c7,
      metalness: 0.3,
      roughness: 0.4,
    });

    const silverDotMat = new THREE.MeshStandardMaterial({
      color: 0x777777,
      metalness: 0.5,
      roughness: 0.4,
    });

    const addressBarMat = new THREE.MeshStandardMaterial({
      color: 0x0a0a0a,
      roughness: 0.5,
    });

    // 4. Load Production Project Screenshots via TextureLoader
    const textureLoader = new THREE.TextureLoader();

    // The Retro Cafe Texture
    const retroTexture = textureLoader.load(
      "/images/projects/retro_cafe.png",
      () => renderer.render(scene, camera)
    );
    retroTexture.colorSpace = THREE.SRGBColorSpace;
    retroTexture.minFilter = THREE.LinearMipmapLinearFilter;
    retroTexture.magFilter = THREE.LinearFilter;

    // Cafe and Bakery Demo Texture
    const bakeryTexture = textureLoader.load(
      "/images/projects/cafe_bakery_demo.svg",
      () => renderer.render(scene, camera)
    );
    bakeryTexture.colorSpace = THREE.SRGBColorSpace;

    // Beauty and Salon Demo Texture
    const salonTexture = textureLoader.load(
      "/images/projects/beauty_salon_demo.svg",
      () => renderer.render(scene, camera)
    );
    salonTexture.colorSpace = THREE.SRGBColorSpace;

    // 5. Helper to construct high-fidelity 3D Browser Window
    const createBrowserWindow = (
      width: number,
      height: number,
      screenTexture: THREE.Texture,
      urlLabel: string,
      isMain: boolean
    ) => {
      const group = new THREE.Group();

      // Outer Frame
      const frameGeo = new THREE.BoxGeometry(width, height, 0.1);
      const frame = new THREE.Mesh(frameGeo, browserFrameMat);
      frame.castShadow = true;
      frame.receiveShadow = true;
      group.add(frame);

      // Header Bar
      const headerHeight = 0.34;
      const headerGeo = new THREE.BoxGeometry(width - 0.04, headerHeight, 0.11);
      const header = new THREE.Mesh(headerGeo, browserHeaderMat);
      header.position.set(0, height / 2 - headerHeight / 2 - 0.02, 0.01);
      group.add(header);

      // Window Control Dots
      const dotGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.03, 16);
      dotGeo.rotateX(Math.PI / 2);

      const d1 = new THREE.Mesh(dotGeo, orangeDotMat);
      d1.position.set(-width / 2 + 0.28, height / 2 - headerHeight / 2 - 0.02, 0.07);
      group.add(d1);

      const d2 = new THREE.Mesh(dotGeo, greenDotMat);
      d2.position.set(-width / 2 + 0.42, height / 2 - headerHeight / 2 - 0.02, 0.07);
      group.add(d2);

      const d3 = new THREE.Mesh(dotGeo, silverDotMat);
      d3.position.set(-width / 2 + 0.56, height / 2 - headerHeight / 2 - 0.02, 0.07);
      group.add(d3);

      // Address Bar
      const addressBarGeo = new THREE.BoxGeometry(
        Math.min(width * 0.45, 1.8),
        0.16,
        0.02
      );
      const addressBar = new THREE.Mesh(addressBarGeo, addressBarMat);
      addressBar.position.set(0, height / 2 - headerHeight / 2 - 0.02, 0.07);
      group.add(addressBar);

      // Screen Surface (Showing Production Project Screenshot)
      const screenWidth = width - 0.08;
      const screenHeight = height - headerHeight - 0.08;
      const screenGeo = new THREE.PlaneGeometry(screenWidth, screenHeight);

      const screenMat = new THREE.MeshBasicMaterial({
        map: screenTexture,
        toneMapped: false,
      });

      const screen = new THREE.Mesh(screenGeo, screenMat);
      screen.position.set(0, -headerHeight / 2, 0.06);
      group.add(screen);

      return { group, frameGeo, headerGeo, dotGeo, addressBarGeo, screenGeo, screenMat };
    };

    // 6. Assemble the 3D Floating Composition
    const compositionGroup = new THREE.Group();
    scene.add(compositionGroup);

    // BROWSER 1: MAIN FOREGROUND (The Retro Cafe)
    const mainBrowser = createBrowserWindow(
      4.3,
      2.75,
      retroTexture,
      "theretrocafe.in",
      true
    );
    mainBrowser.group.position.set(0.95, -0.05, 0.6);
    mainBrowser.group.rotation.set(0.12, -0.22, 0.04);
    compositionGroup.add(mainBrowser.group);

    // BROWSER 2: BACKGROUND TOP-LEFT (Cafe and Bakery Demo)
    const bgBrowser1 = createBrowserWindow(
      3.2,
      2.05,
      bakeryTexture,
      "cafebakerydemo.42web.io",
      false
    );
    bgBrowser1.group.position.set(-2.5, 1.45, -1.8);
    bgBrowser1.group.rotation.set(0.18, 0.28, -0.06);
    bgBrowser1.group.scale.set(0.78, 0.78, 0.78);
    compositionGroup.add(bgBrowser1.group);

    // BROWSER 3: BACKGROUND BOTTOM-RIGHT (Beauty and Salon Demo)
    const bgBrowser2 = createBrowserWindow(
      3.4,
      2.15,
      salonTexture,
      "beautybussiness.freedev.app",
      false
    );
    bgBrowser2.group.position.set(2.6, -1.45, -2.2);
    bgBrowser2.group.rotation.set(-0.14, -0.32, 0.08);
    bgBrowser2.group.scale.set(0.8, 0.8, 0.8);
    compositionGroup.add(bgBrowser2.group);

    // Initial Layout adjustment based on viewport
    const updateLayout = () => {
      const isMobile = window.innerWidth < 1024;
      if (isMobile) {
        mainBrowser.group.position.set(0, -0.6, -0.4);
        mainBrowser.group.scale.set(0.68, 0.68, 0.68);
        bgBrowser1.group.position.set(-1.4, 1.2, -2.4);
        bgBrowser1.group.scale.set(0.52, 0.52, 0.52);
        bgBrowser2.group.position.set(1.4, -1.8, -2.6);
        bgBrowser2.group.scale.set(0.52, 0.52, 0.52);
      } else {
        mainBrowser.group.position.set(0.95, -0.05, 0.6);
        mainBrowser.group.scale.set(1, 1, 1);
        bgBrowser1.group.position.set(-2.5, 1.45, -1.8);
        bgBrowser1.group.scale.set(0.78, 0.78, 0.78);
        bgBrowser2.group.position.set(2.6, -1.45, -2.2);
        bgBrowser2.group.scale.set(0.8, 0.8, 0.8);
      }
    };
    updateLayout();

    // 7. Apple-Style ScrollTrigger Choreography
    const sectionEl = container.closest("section") || container;

    const st = ScrollTrigger.create({
      trigger: sectionEl,
      start: "top top",
      end: "+=120%",
      scrub: 1.1,
      onUpdate: (self) => {
        const p = self.progress;

        // 1. Camera moves towards viewer (dolly zoom)
        camera.position.z = 7.5 - p * 3.6;

        // 2. Main foreground browser rotates to face forward, centers, and expands
        const isMobile = window.innerWidth < 1024;
        const initialMainX = isMobile ? 0 : 0.95;
        const initialMainY = isMobile ? -0.6 : -0.05;

        mainBrowser.group.position.x = initialMainX * (1 - p);
        mainBrowser.group.position.y = initialMainY * (1 - p);
        mainBrowser.group.rotation.x = 0.12 * (1 - p);
        mainBrowser.group.rotation.y = -0.22 * (1 - p);
        mainBrowser.group.rotation.z = 0.04 * (1 - p);

        // Foreground browser expands to reveal actual website
        const expandScale = (isMobile ? 0.68 : 1) * (1 + p * 0.42);
        mainBrowser.group.scale.set(expandScale, expandScale, expandScale);

        // 3. Background browsers separate into depth layers (layered explosion)
        const bg1InitialX = isMobile ? -1.4 : -2.5;
        const bg1InitialY = isMobile ? 1.2 : 1.45;
        bgBrowser1.group.position.x = bg1InitialX - p * 3.2;
        bgBrowser1.group.position.y = bg1InitialY + p * 1.6;
        bgBrowser1.group.position.z = -1.8 - p * 2.8;
        bgBrowser1.group.rotation.y = 0.28 + p * 0.35;

        const bg2InitialX = isMobile ? 1.4 : 2.6;
        const bg2InitialY = isMobile ? -1.8 : -1.45;
        bgBrowser2.group.position.x = bg2InitialX + p * 3.4;
        bgBrowser2.group.position.y = bg2InitialY - p * 1.8;
        bgBrowser2.group.position.z = -2.2 - p * 2.8;
        bgBrowser2.group.rotation.y = -0.32 - p * 0.35;
      },
    });

    // 8. Interactive Mouse Parallax (Idle Reactivity)
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.35;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.35;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // 9. Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Subtle breathing suspension
      const floatY = Math.sin(elapsed * 1.2) * 0.035;
      const floatRot = Math.cos(elapsed * 0.9) * 0.012;

      compositionGroup.rotation.y += (mouseX + floatRot - compositionGroup.rotation.y) * 0.03;
      compositionGroup.rotation.x += (-mouseY - compositionGroup.rotation.x) * 0.03;
      compositionGroup.position.y = floatY;

      renderer.render(scene, camera);
    };
    animate();

    // 10. Handle Resize
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      updateLayout();
    };
    window.addEventListener("resize", handleResize);

    // 11. Complete Clean Cleanup
    return () => {
      st.kill();
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      browserFrameMat.dispose();
      browserHeaderMat.dispose();
      orangeDotMat.dispose();
      greenDotMat.dispose();
      silverDotMat.dispose();
      addressBarMat.dispose();
      retroTexture.dispose();
      bakeryTexture.dispose();
      salonTexture.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[600px] pointer-events-none"
    />
  );
}
