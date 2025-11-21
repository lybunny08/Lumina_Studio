import About from './sections/About';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import Hero from './sections/Hero';
import Intro from './sections/Intro';
import './App.css';
import Projects from './sections/Projects1';
import NavigationBar from './components/NavigationBar';
import Services from './sections/Services';
import Approach from './sections/Approach';
// import Preloader from './components/Preloader';
// import Pre from './components/Pre';

function App() {

  return (
    <>
    <NavigationBar />
      <div className='relative overflow-hidden'>
        {/* Grille d’alignement */}
        <div className="absolute z-30 inset-0 grid grid-cols-12 gap-[20px] px-[30px] pointer-events-none ">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="bg-red-500/0"></div>
          ))}
        </div>
        <div
          className="relative bg-[#fcfcfc] text-[#0a0a0a] w-full min-h-screen px-[16px] md:px-[30px]"
        >
          <div className="relative z-10 flex flex-col">
            <Hero />
            <About />
            <Projects />
            <Services />
            <Approach />
            <div className="hidden md:block" >
              <Intro />
            </div>
            <div className="flex flex-col pt[200px] w-full gap-[16px]">
              <Contact />
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </>
    
  );
}

export default App;
