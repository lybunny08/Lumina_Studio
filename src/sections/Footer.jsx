import Copy from '../components/Copy';
import GradientBackground from '../components/GradientBackground';
import lumina from '../assets/lumina studio.svg'
import luminalg from '../assets/lumina studiolg.svg'

function Footer() {
  return (
    <div className="relative h-screen w-full flex flex-col py-[16px] justify-between ">
      {/* Gradient background en position absolue derrière */}
      {/* <div className="absolute inset-0 -z-10 opacity-15">
        <GradientBackground />
      </div> */}
      <div className="absolute -mx-[30px] inset-0 -z-10 opacity-40">
        {/* <GradientBackground /> */}
        {/* Overlay de fondu en haut avec Tailwind */}
        <div className="absolute top-0 left-0 w-full h-1/5 bg-gradient-to-b from-white to-transparent pointer-events-none" />
      </div>

      {/* Contenu au-dessus */}
      <div className="flex flex-col gap-[32px] ">
        <img src={luminalg} alt="" className='w-screen h-full hidden md:block' />
        <img src={lumina} alt="" className='w-screen h-full md:hidden' />
        {/* <p className="hidden md:block uppercase text-[153.6px] leading-[153.6px] neue-bold ">lumina Studio</p> */}
        {/* <p className="md:hidden text-center uppercase text-[85px] leading-[85px] neue-bold ">lumina Studio</p> */}
        <div className="flex flex-row justify-between leading-[14px] text-[14px] ">
          <Copy>
            <p>Home</p>
          </Copy>
          <Copy>
            <p>About</p>
          </Copy>
          <Copy>
            <p>Services</p>
          </Copy>
          <Copy>
            <p>Works</p>
          </Copy>
          <Copy>
            <p>Contact</p>
          </Copy>
        </div>
      </div>
      <div className="flex flex-col gap-[16px] text-[14px] ">
        <div className="flex flex-row justify-between items-end">
          <div className="flex flex-col md:flex-row leading-[16px] gap-[16px] ">
            <a href="mailto:obscurstudio@gmail.com">luminastudio@gmail.com</a>
            <div className='flex flex-row gap-[16px] '>
              <div className="flex items-end gap-[8px] ">
                <p className="leading-[16px] ">LinkedIn</p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3.5} stroke="currentColor" className="size-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </div>
              <div className="flex items-end gap-[8px] ">
                <p className="leading-[16px] ">Instagram</p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3.5} stroke="currentColor" className="size-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </div>
            </div>
          </div>
          <div
            role="button"
            tabIndex={0}
            aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.code === 'Space') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="size-[46px] rounded-sm bg-black flex items-center justify-center cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="#fff" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
            </svg>
          </div>
        </div>
        <div className="flex flex-col gap-[16px] ">
          <div className="h-[0.5px] w-full bg-black"></div>
          <div className="flex flex-row justify-between">
            <p>Lumina Studio 2025</p>
            <p>Site by Mamitiana Lydien</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
