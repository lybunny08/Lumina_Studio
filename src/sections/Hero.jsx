import lumina from "../assets/blo.mp4"
function Hero() {
  return (
    <div className="-mx-[10px] md:-mx-[20px] my-[8px] relative ">
      {/* <video
        src={lumina}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full rounded-sm object-cover z-0"
      /> */}
      <div className="min-h-[97vh] bg-[#000] text-white rounded-md w-full flex items-end pb-[32px] px-[20px]">
        <div className="flex flex-row justify-between items-end w-full">
          {/* Texte gauche */}
          <div className="relative flex flex-col md:items-start gap-[16px]">
            {/* <p className="text-[24px] md:text-[32px] letter-spacing-[0.6px] leading-[38.4px]">
              We create in the shadow, <br className="hidden md:block" /> to reveal the light.
            </p> */}
            <button className="bg-white rounded-md text-black px-4 py-2">
              <div className="flex flex-row justify-center items-center gap-[8px]">
                <span className="neue-medium text-[18px] ">Contact us</span>
                <div className="size-[20px] bg-black rounded-sm"></div>
              </div>
            </button>
          </div>

          {/* Texte droite */}
          <div className="hidden md:block">
            <div className="flex flex-col items-end text-right">
              <p className="text-[46px] leading-[46px] uppercase neue-bold">Lumina Studio —</p>
              <p className="text-[22px] leading-[29.9px] ">Branding & Development</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
