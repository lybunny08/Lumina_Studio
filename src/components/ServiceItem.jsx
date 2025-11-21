import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function ServiceItem({ number, title, description, tags = [], image }) {
  const imageRef = useRef(null);
  const itemRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!imageRef.current) return;

    const initAnimation = () => {
      // Nettoyer toute animation existante
      if (animationRef.current) {
        animationRef.current.scrollTrigger?.kill();
        animationRef.current.kill();
      }

      // État initial
      gsap.set(imageRef.current, {
        clipPath: "inset(0% 0% 100% 0%)",
        opacity: 1
      });

      // Vérifier si l'élément est déjà dans le viewport
      const rect = imageRef.current.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight && rect.bottom >= 0;

      if (isInViewport) {
        // Si déjà dans le viewport, jouer l'animation immédiatement
        console.log("Element already in viewport, playing animation immediately");
        gsap.to(imageRef.current, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.5,
          ease: "power3.out",
        });
      } else {
        // Sinon, créer le ScrollTrigger normal
        animationRef.current = gsap.to(imageRef.current, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 85%",
            end: "top 30%",
            toggleActions: "play none none none",
            markers: false,
            onEnter: () => console.log("ScrollTrigger activated for:", title),
          },
        });
      }

      ScrollTrigger.refresh();
    };

    const timeoutId = setTimeout(initAnimation, 150);

    const handleResize = () => {
      clearTimeout(timeoutId);
      setTimeout(initAnimation, 200);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        animationRef.current.scrollTrigger?.kill();
        animationRef.current.kill();
      }
    };
  }, [image, title]);

  return (
    <div ref={itemRef} className="bg-white w-full h-full px-[16px] py-[32px] rounded-sm">
      <div className="md:grid md:grid-cols-12">
        {/* Colonne gauche */}
        <div className="md:col-span-3">
          <p>({number})</p>
        </div>

        {/* Colonne droite */}
        <div className="md:col-span-9 flex flex-col md:flex-row gap-[0px]">
          <h2 className="text-[24px] leading-[24px] md:text-[32px] md:leading-[40px] neue-medium w-[500px] ">{title}</h2>
          <div className="flex flex-row gap-[40px] ">
            <div className="flex flex-col gap-[16px]">
              <p>{description}</p>
              <div className="flex flex-wrap gap-[8px] ">
                {tags.map((tag, i) => (
                  <div key={i} className="py-1 px-2 rounded-md bg-gray-500 text-white text-[14px]">
                    {tag}
                  </div>
                ))}
              </div>
            </div>

            {/* Image (optionnelle) */}
            <div 
              ref={imageRef} 
              className="hidden md:block w-[450px] h-[220px] bg-[#d9d9d9] rounded-sm overflow-hidden"
            >
              {image && <img src={image} alt={title} className="w-full h-full object-cover" />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceItem;