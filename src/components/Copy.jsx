import { useRef, useEffect, Children, cloneElement } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

function Copy({ 
  children, 
  animationOnScroll = true, 
  delay = 0,
  inPinSection = false,
  pinTimeline = null,
  startPosition = 0,
  disableOnMobile = true,
  mobileBreakpoint = 768 // Breakpoint personnalisable
}) {
  const containerRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const isMobile = window.innerWidth < mobileBreakpoint;
    
    // Si désactivé sur mobile et on est sur mobile, ne rien faire
    if (disableOnMobile && isMobile) {
      return;
    }

    const runAnimation = () => {
      const elements = containerRef.current.hasAttribute('data-copy-wrapper') 
        ? Array.from(containerRef.current.children) 
        : [containerRef.current];

      const allSplits = [];
      const allLines = [];

      elements.forEach((el) => {
        const split = new SplitText(el, {
          type: 'lines',
          mask: 'lines',
          linesClass: 'line++',
        });

        allSplits.push(split);

        const computedStyle = window.getComputedStyle(el);
        const textIndent = computedStyle.textIndent;

        if (textIndent && textIndent !== '0px') {
          if (split.lines.length > 0) {
            split.lines[0].style.paddingLeft = textIndent;
          }
          el.style.textIndent = '0';
        }

        allLines.push(...split.lines);
      });

      gsap.set(allLines, { y: '100%' });

      const animationProps = {
        y: '0%',
        duration: 1,
        stagger: 0.1,
        ease: 'power4.out',
        delay: delay,
      };

      if (inPinSection && pinTimeline) {
        animationRef.current = pinTimeline.to(allLines, {
          ...animationProps
        }, startPosition);
      } else if (animationOnScroll) {
        animationRef.current = gsap.to(allLines, {
          ...animationProps,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            once: true,
          },
        });
      } else {
        animationRef.current = gsap.to(allLines, animationProps);
      }
    };

    const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
    fontsReady.then(() => {
      setTimeout(() => {
        runAnimation();
      }, 150);
    });

    return () => {
      if (animationRef.current) {
        if (animationRef.current.revert) animationRef.current.revert();
        if (animationRef.current.kill) animationRef.current.kill();
      }
    };
  }, [animationOnScroll, delay, inPinSection, pinTimeline, startPosition, disableOnMobile, mobileBreakpoint]);

  if (Children.count(children) === 1) {
    return cloneElement(children, {
      ref: containerRef,
    });
  }

  return (
    <div ref={containerRef} data-copy-wrapper="true">
      {children}
    </div>
  );
}

export default Copy;