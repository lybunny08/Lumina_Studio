import SplineScene from "../components/Spline";

function Hero() {
  return (
    <div className="-mx-[10px] md:-mx-[20px] my-[8px]">
      <div className="relative min-h-[97vh] text-white rounded-md w-full flex items-end pb-[32px] px-[20px]">
        {/* Spline background */}
        <div className="absolute inset-0 overflow-hidden rounded-md">
          {typeof window !== "undefined" && (
            <SplineScene
              sceneUrl="https://prod.spline.design/ahCnIfrL54W3Supk/scene.splinecode"
            />
          )}
          
          {/* Overlay jaune en bas - différentes options */}

          {/* Option 1: Dégradé jaune subtil */}
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
          
          {/* Option 2: Bande jaune solide */}
          {/* <div className="absolute bottom-0 left-0 right-0 h-32 bg-yellow-500/40"></div> */}
          
          {/* Option 3: Dégradé avec effet de fondu */}
          {/* <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-yellow-500/50 via-yellow-500/20 to-transparent backdrop-blur-sm"></div> */}
          
          {/* Option 4: Dégradé latéral */}
          {/* <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-tr from-yellow-500/30 via-yellow-400/15 to-transparent"></div> */}
        </div>

        {/* Overlay sombre global pour contraste */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

        <div className="relative z-10 flex flex-row justify-between items-end w-full">
          {/* Texte gauche */}
          <div className="relative flex flex-col md:items-start gap-[16px]">
            <button className="bg-white rounded-md text-black px-4 py-2 hover:bg-gray-100 transition duration-300 shadow-lg hover:shadow-xl">
              <div className="flex flex-row justify-center items-center gap-[8px]">
                <span className="neue-medium text-[18px]">Contact us</span>
                <div className="size-[20px] bg-black rounded-sm"></div>
              </div>
            </button>
          </div>

          {/* Texte droite */}
          <div className="hidden md:block">
            <div className="flex flex-col items-end text-right">
              <p className="text-[46px] leading-[46px] uppercase neue-bold">Lumina Studio —</p>
              <p className="text-[22px] leading-[29.9px]">Branding & Development</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;