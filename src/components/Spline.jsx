import { useEffect, useState } from 'react';

export default function SplineScene({ sceneUrl }) {
  const [SplineComponent, setSplineComponent] = useState(null);

  useEffect(() => {
    // Import dynamique côté client uniquement
    if (typeof window !== 'undefined') {
      import('@splinetool/react-spline').then((module) => {
        setSplineComponent(() => module.default);
      });
    }
  }, []);

  if (!SplineComponent) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
        <div className="animate-pulse text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <SplineComponent
        scene={sceneUrl || "https://prod.spline.design/ahCnIfrL54W3Supk/scene.splinecode"}
        style={{ 
          width: "100%", 
          height: "100%",
        }}
      />
    </div>
  );
}