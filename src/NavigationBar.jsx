import React, { useState, useEffect } from 'react';
import MobileMenu from './MobileMenu';
import DesktopNav from './DesktopNav';
import NavLink from './NavLink';

function NavigationBar({ lenis }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hoveredLink, setHoveredLink] = useState(null);

  // Gestion de la navbar qui disparaît au scroll
  useEffect(() => {
    if (isMenuOpen) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY <= lastScrollY || currentScrollY < 20);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isMenuOpen]);

  const scrollToSection = (id) => {
    setIsMenuOpen(false);
    setTimeout(() => {
      const section = document.getElementById(id);
      if (section) {
        lenis.scrollTo(section, {
          duration: 1.5,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      }
    }, 50);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className={`w-full fixed bg-white z-60 h-[70px] md:h-[80px] pb-4 transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="flex flex-row justify-between items-center absolute w-full px-[25px] xl:px-[25px] pt-[15px] text-black text-[20px]">
        <div className="flex flex-row gap-4 items-center">
          <a href="#hero" className="bold nav_links">Connekit-eo</a>
        </div>

        <DesktopNav 
          scrollToSection={scrollToSection} 
          hoveredLink={hoveredLink} 
          setHoveredLink={setHoveredLink}
        />

        <div className="lg:hidden flex items-center gap-[12px]">
          <button className="bg-[#d9d9d9]/40 rounded-full text-black text-[18px]">S'inscrire</button>
          <div onClick={toggleMenu} className="cursor-pointer size-[50px] rounded-xl bg-black flex justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.9} stroke="#fff" className="size-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
            </svg>
          </div>
        </div>
      </div>

      <MobileMenu 
        isOpen={isMenuOpen} 
        onClose={toggleMenu}
        scrollToSection={scrollToSection}
        hoveredLink={hoveredLink}
        setHoveredLink={setHoveredLink}
      />
    </nav>
  );
}

export default NavigationBar;