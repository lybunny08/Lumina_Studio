/* eslint-disable react/no-unescaped-entities */
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectsComponent from "../components/Projectscomponents";
import ReusableText from "../components/Common/ReusableText";

gsap.registerPlugin(ScrollTrigger);

function Projects() {
  const containerRef = useRef(null);
  const horizontalRef = useRef(null);
  const spacerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const horizontal = horizontalRef.current;
    const spacer = spacerRef.current;
    
    if (!container || !horizontal) return;

    const setupScroll = () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());

      const totalScrollWidth = horizontal.scrollWidth;
      const viewportWidth = window.innerWidth;
      const horizontalDistance = Math.max(0, totalScrollWidth - viewportWidth);

      if (horizontalDistance <= 0) {
        container.style.height = "auto";
        if (spacer) spacer.style.display = "none";
        return;
      }

      // CRITIQUE: Calculer la hauteur exacte nécessaire
      const sectionHeight = container.offsetHeight;
      const calculatedHeight = horizontalDistance + sectionHeight;

      // Appliquer la hauteur au spacer pour réserver l'espace
      if (spacer) {
        spacer.style.height = `${calculatedHeight}px`;
        spacer.style.display = "block";
      }

      // Container principal garde sa hauteur normale
      container.style.height = "auto";

      gsap.to(horizontal, {
        x: -horizontalDistance,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "16% top", 
          end: `+=${horizontalDistance}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          markers: false,
          // Permettre le pin naturel
          pinSpacing: true,
        },
      });

      ScrollTrigger.refresh();
    };

    setTimeout(() => {
      setupScroll();
    }, 100);

    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setupScroll();
      }, 250);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      <section 
        ref={containerRef} 
        className="relative w-full"
      >
        <div className="flex flex-col gap-[26px]">
          <div className="flex flex-row items-end justify-between px-4">
            <ReusableText>Featured works</ReusableText>
            <span className="text-[42px] leading-[42px] md:text-[140px] md:leading-[140px] uppercase neue-medium">
              '06
            </span>
          </div>

          <div 
            ref={horizontalRef} 
            className="flex flex-col md:flex-row gap-[40px] md:gap-[200px] w-max min-w-full"
          >
            <ProjectsComponent />
          </div>
        </div>
      </section>
    </>
  );
}

export default Projects;