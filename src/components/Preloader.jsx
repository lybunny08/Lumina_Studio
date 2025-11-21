import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftTextRef = useRef<HTMLDivElement>(null);
  const rightTextRef = useRef<HTMLDivElement>(null);
  const blockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power4.inOut", duration: 1.2 },
    });

    // Texte apparaît
    tl.fromTo(
      [leftTextRef.current, rightTextRef.current],
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, stagger: 0.2 }
    )

      // Bloc s'ouvre au centre
      .to(blockRef.current, { width: "100vw" }, "+=0.3")

      // Texte repoussé de chaque côté
      .to(leftTextRef.current, { x: "-50vw" }, "<")
      .to(rightTextRef.current, { x: "50vw" }, "<")

      // Le preloader devient le Hero (background prend la place)
      .to(containerRef.current, { height: "100vh" }, "-=0.5");
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-screen text-white flex items-center justify-center overflow-hidden z-[9999]"
    >
      {/* Texte gauche */}
      <div
        ref={leftTextRef}
        className="text-[120px] font-bold absolute left-[25%] translate-x-[-50%]"
      >
        OBSCUR
      </div>

      {/* Bloc central */}
      <div
        ref={blockRef}
        className="h-[60px] w-0 bg-black z-10"
      ></div>

      {/* Texte droit */}
      <div
        ref={rightTextRef}
        className="text-[120px] font-bold absolute right-[25%] translate-x-[50%]"
      >
        STUDIO
      </div>
    </div>
  );
}
