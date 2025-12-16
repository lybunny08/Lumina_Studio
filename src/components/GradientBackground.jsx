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

    // CursorTexture pour interaction
    const cursorTexture = new CursorTexture({ debug: false });
    cursorTextureRef.current = cursorTexture;

    // Charger textures (adapté à ton projet)
    const loader = new THREE.TextureLoader();
    const noiseTexture = loader.load("/perlin.png");
    const gradientTexture = loader.load("/gradient1.png");

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
      uSpeed: { value: 0.5 },
      uZoom: { value: 0.75 },
      uGrainAmount: { value: 0.03 },
      uGrainSpeed: { value: 5 },
      uCursorTexture: { value: cursorTexture.texture },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    };

    // Géométrie et matériel
    const geometry = new THREE.PlaneGeometry(1, 1);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
    });

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

    // Animation boucle
    let time = 0;
    function animate() {
      time += 0.01;
      uniforms.uTime.value = time;

      cursorTexture.update();

      renderer.render(scene, camera);

      animationIdRef.current = requestAnimationFrame(animate);
    }
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationIdRef.current);

      renderer.dispose();
      geometry.dispose();
      material.dispose();

      containerRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full h-screen relative left-1/2 right-1/2 -mx-[50vw]"
    ></section>
  );
}
