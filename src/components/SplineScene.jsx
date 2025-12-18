import { useEffect, useState, useRef } from 'react';

export default function SplineScene({ sceneUrl }) {
  const [SplineComponent, setSplineComponent] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    // Import dynamique côté client uniquement
    if (typeof window !== 'undefined') {
      import('@splinetool/react-spline').then((module) => {
        setSplineComponent(() => module.default);
      });
    }
  }, []);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    // Initial update
    updateDimensions();

    // Update on resize
    window.addEventListener('resize', updateDimensions);
    
    // Update on orientation change
    window.addEventListener('orientationchange', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
      window.removeEventListener('orientationchange', updateDimensions);
    };
  }, []);

  if (!SplineComponent) {
    return (
      <div 
        ref={containerRef}
        className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-black"
      >
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white text-sm">Loading 3D scene...</p>
        </div>
      </div>
    );
  }

  // Calcul du ratio pour mobile/desktop
  const isMobile = dimensions.width < 600;
  const scale = isMobile ? 0.2 : 0.4; // Ajustez ces valeurs selon vos besoins

  return (
    <div 
      ref={containerRef}
      className="w-full h-full relative overflow-hidden"
    >
      {/* Container pour contrôler le scale et la position */}
      <div 
        className="absolute"
        style={{
          width: `${100 * scale}%`,
          height: `${100 * scale}%`,
          left: '50%',
          top: '50%',
          transform: `translate(-50%, -50%) scale(${1/scale})`,
          transformOrigin: 'center center'
        }}
      >
        <SplineComponent
          scene={sceneUrl || "https://prod.spline.design/ahCnIfrL54W3Supk/scene.splinecode"}
          style={{ 
            width: '100%', 
            height: '100%',
          }}
        />
      </div>
    </div>
  );
}