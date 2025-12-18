import { useEffect, useRef } from "react";
import * as THREE from "three";
import vertexShader from "../shaders/plane.vert?raw";
import fragmentShader from "../shaders/gradient.frag?raw";
import { CursorTexture } from "./CursorTexture";

export default function GradientBackground() {
  const containerRef = useRef(null);
  const rendererRef = useRef();
  const sceneRef = useRef();
  const cameraRef = useRef();
  const planeRef = useRef();
  const animationIdRef = useRef();
  const cursorTextureRef = useRef();

  // Stocke la taille pour gestion resize
  const size = useRef({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    if (!containerRef.current) return;

    // Setup scène
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Setup caméra
    const perspective = 500;
    const fov =
      (180 * (2 * Math.atan(window.innerHeight / 2 / perspective))) / Math.PI;
    const camera = new THREE.PerspectiveCamera(
      fov,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.set(0, 0, perspective);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Debug overlay to show elapsed time and help isolate shader vs JS issues
    const debugEl = document.createElement("div");
    debugEl.id = "gradient-debug";
    debugEl.style.position = "absolute";
    debugEl.style.top = "10px";
    debugEl.style.left = "10px";
    debugEl.style.color = "#fff";
    debugEl.style.background = "rgba(255,0,0,0.95)"; // red background for visibility
    debugEl.style.padding = "6px 8px";
    debugEl.style.borderRadius = "6px";
    debugEl.style.zIndex = 9999;
    debugEl.style.fontFamily = "monospace";
    debugEl.style.border = "1px solid rgba(255,255,255,0.12)";
    debugEl.style.boxShadow = "0 4px 12px rgba(255,0,0,0.25)";
    debugEl.textContent = "uTime: 0.00";
    containerRef.current.appendChild(debugEl);

    // CursorTexture pour interaction
    const cursorTexture = new CursorTexture({ debug: false });
    cursorTextureRef.current = cursorTexture;

    // Charger textures (adapté à ton projet) — use placeholders and callbacks to detect missing files
    const loader = new THREE.TextureLoader();

    // Placeholder (1x1) textures so shader still has valid textures if files are missing
    const placeholderNoise = new THREE.DataTexture(new Uint8Array([128, 128, 128, 255]), 1, 1, THREE.RGBAFormat);
    placeholderNoise.needsUpdate = true;
    const placeholderGradient = new THREE.DataTexture(new Uint8Array([255, 255, 255, 255]), 1, 1, THREE.RGBAFormat);
    placeholderGradient.needsUpdate = true;

    let noiseTexture = placeholderNoise;
    let gradientTexture = placeholderGradient;

    // Try loading real textures; log any failures
    loader.load(
      "/perlin.png",
      (tex) => {
        tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
        tex.minFilter = THREE.LinearFilter;
        noiseTexture = tex;
        if (uniforms) uniforms.uNoise.value = noiseTexture;
        console.log("Loaded /perlin.png");
      },
      undefined,
      (err) => {
        console.warn("Failed to load /perlin.png", err);
      }
    );

    loader.load(
      "/gradient1.png",
      (tex) => {
        tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
        tex.minFilter = THREE.LinearFilter;
        gradientTexture = tex;
        if (uniforms) uniforms.uGradient.value = gradientTexture;
        console.log("Loaded /gradient1.png");
      },
      undefined,
      (err) => {
        console.warn("Failed to load /gradient1.png", err);
      }
    );

    // Uniforms shader
    const uniforms = {
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color("#731806") },
      uColor2: { value: new THREE.Color("#f98d28") },
      uColor3: { value: new THREE.Color("#e81eb9") },
    //   uColor1: { value: new THREE.Color("#ffffff") },   // blanc pur
    //   uColor2: { value: new THREE.Color("#eeeeee") },   // blanc cassé, un peu plus doux
    //   uColor3: { value: new THREE.Color("#cccccc") },   // gris clair, légèrement différent
      uNoise: { value: noiseTexture },
      uGradient: { value: gradientTexture },
      uSpeed: { value: 1.0 },
      uZoom: { value: 0.75 },
      uGrainAmount: { value: 0.03 },
      uGrainSpeed: { value: 5 },
      uCursorTexture: { value: cursorTexture.texture },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uDebug: { value: 1.0 },
    };

    // Géométrie et matériel
    const geometry = new THREE.PlaneGeometry(1, 1);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
    });

    // Quick sanity check: ensure shader source contains our debug uniform
    try {
      console.log("Gradient shader contains uDebug?", material.fragmentShader && material.fragmentShader.includes("uDebug"));
      material.needsUpdate = true;
    } catch (err) {
      console.warn("Could not inspect shader source", err);
    }

    const plane = new THREE.Mesh(geometry, material);
    plane.scale.set(window.innerWidth, window.innerHeight, 1);
    scene.add(plane);
    planeRef.current = plane;

    // Gestion resize
    function onResize() {
      size.current.width = window.innerWidth;
      size.current.height = window.innerHeight;

      renderer.setSize(size.current.width, size.current.height);
      camera.aspect = size.current.width / size.current.height;
      camera.updateProjectionMatrix();

      plane.scale.set(size.current.width, size.current.height, 1);

      uniforms.uResolution.value.set(size.current.width, size.current.height);
    }
    window.addEventListener("resize", onResize);

    // Gestion souris
    function onMouseMove(e) {
      const x = e.clientX;
      const y = e.clientY;
      cursorTexture.addPoint({
        x: x / size.current.width,
        y: y / size.current.height,
      });
    }
    window.addEventListener("mousemove", onMouseMove);

    // Animation boucle (use elapsed time for consistent motion)
    const startTime = performance.now();
    function animate() {
      const elapsed = (performance.now() - startTime) * 0.001; // seconds
      uniforms.uTime.value = elapsed;

      // Update debug overlay text so we can confirm updates outside the shader
      if (debugEl) debugEl.textContent = `uTime: ${elapsed.toFixed(2)}`;

      cursorTexture.update();

      try {
        renderer.render(scene, camera);
      } catch (err) {
        console.error("WebGL render error:", err);
      }

      animationIdRef.current = requestAnimationFrame(animate);
    }
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationIdRef.current);

      // Dispose renderer, geometry and material
      renderer.dispose();
      geometry.dispose();
      material.dispose();

      // Remove canvas only if it's still mounted inside the container
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }

      // Remove debug overlay if present
      const el = document.getElementById("gradient-debug");
      if (el && el.parentNode === containerRef.current) el.parentNode.removeChild(el);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full h-screen relative left-1/2 right-1/2 -mx-[50vw]"
    ></section>
  );
}
