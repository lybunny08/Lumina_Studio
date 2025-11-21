// import Sound from "./Sound";
// import lenis from "lenis";
import { useState, useEffect } from "react";

function NavigationBar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [lastScrollY, setLastScrollY] = useState(0);

	useEffect(() => {
		if (isMenuOpen) return;

		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			setLastScrollY(currentScrollY);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [lastScrollY, isMenuOpen]);

  return (
	<div 
		className="z-20 fixed left-0 text-white py-[24px] px-[30px] top-0 w-full flex flex-row justify-between">
	  <div className="flex flex-row items-center gap-[16px] ">
				<p className="uppercase neue-bold text-[22px] text-white mix-blend-difference ">Lumina Studio</p>
			</div>
			<div className="flex flex-row items-center gap-[18px]">
				<div className="flex items-center py-[8px] px-[16px] bg-[#ffd900] rounded-md ">
					<p className="leading-[18px] text-black uppercase neue-medium ">Menu</p>
				</div>
				<div className="hidden md:block flex items-center py-[8px] px-[16px] bg-[#ffd900] rounded-md ">
					<p className="leading-[18px] text-black uppercase neue-medium ">Book a call</p>
				</div>
			</div>
	</div>
  );
}

export default NavigationBar;