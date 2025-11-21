import { useRef, useEffect } from "react";
import Copy from "../components/Copy";
import ReusableText from "../components/Common/ReusableText";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function About() {
	const imageRef = useRef(null);
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
		}, []);

  return (
    <section className="w-full my-[72px] ">
      <div className="grid md:grid-cols-12 space-y-[8px] ">
        {/* Colonne gauche */}
        <div className="col-span-3">
          <ReusableText>about us</ReusableText>
        </div>
        {/* Colonne droite */}
        <div className="col-span-9 flex flex-col gap-[32px] md:gap-[66px]">
          <Copy disableOnMobile={true}>
						<h2 className="text-[24px] leading-[32px] md:text-[32px] md:leading-[40px] neue-medium">
							We help creative agencies stand out online. We listen to their vision,
							and build exactly what they imagine — with care, precision, and meaning.
						</h2>
					</Copy>
          {/* Grille interne pour positionner le bloc à droite */}
          <div className="grid md:grid-cols-9">
            <div className="col-start-4 col-span-6">
              <div className="flex flex-row gap-[32px] items-stretch">
								{/* Colonne gauche */}
								<div className="flex flex-col gap-[32px] flex-2">
									<p className="text-[16px]">
										We provide brands & websites with high objectives the strategy and the creativity it 
										takes to have that impact, by teaming up with some of the best talents out there.
									</p>
									<div className="flex flex-col gap-[16px] text-[16px]">
										<div className="h-px w-full bg-white"></div>
										<div className="flex gap-[8px]">
											<span>01.</span>
											<span>Creative Studio</span>
										</div>
										<div className="h-px w-full bg-black"></div>
										<div className="flex gap-[8px]">
											<span>02.</span>
											<span>From (Antananarivo, Madagascar)</span>
										</div>
										<div className="h-px w-full bg-black"></div>
									</div>
								</div>
								{/* Colonne droite */}
								<div ref={imageRef} className="flex-1 bg-[#bababa] rounded-sm"></div>
							</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
