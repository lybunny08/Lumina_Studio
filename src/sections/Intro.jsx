/* eslint-disable react/no-unescaped-entities */
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import TextAnimation from "../components/TextAnimation;";
import ReusableText from "../components/Common/ReusableText";

const COLORS = ["#ff595e","#93b748" ,"#ffca3a", "#8ac926","#2f27ce" , "#1982c4", "#6a4c93" ];

function Intro() {
  const trailRefs = useRef([]);
  const sectionRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const pos = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    pos.current = { x: e.clientX, y: e.clientY };
  };

  useEffect(() => {
    const trailElements = trailRefs.current;

    const animate = () => {
      if (isHovering) {
        trailElements.forEach((el, index) => {
          if (!el) return;
          gsap.to(el, {
            x: pos.current.x,
            y: pos.current.y,
            duration: 0.6,
            ease: "power3.out",
            delay: index * 0.04,
          });
        });
      }
      requestAnimationFrame(animate);
    };

    animate();
  }, [isHovering]);

  return (
    <div
      // ref={sectionRef}
      // onMouseEnter={() => setIsHovering(true)}
      // onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
      className="h-screen w-full md:pb-[200px] md:px-[200px] flex flex-col gap-[16px] items-center justify-center relative"
    >
      <ReusableText>Vous avez fait autant de chemin — peut-être que ce n'est pas par hasard.</ReusableText>
      <TextAnimation>
        <p className="z-20 text-center text-[24px] md:text-[32px] neue-medium">
          Si votre idée vit dans l'ombre, nous sommes là pour la transformer en quelque chose de clair, puissant et intemporel. Commencent une conversation qui transforme le silence en lumières.
        </p>
      </TextAnimation>

      {/* Colored trail */}
      {COLORS.map((color, i) => (
        <div
          key={i}
          ref={(el) => (trailRefs.current[i] = el)}
          className={`z-10 w-[180px] h-[180px] rounded-md absolute pointer-events-none mix-blend-color transition-opacity duration-300 ${
            isHovering ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundColor: color,
            top: 0,
            left: 0,
            // transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </div>
  );
}

export default Intro;
