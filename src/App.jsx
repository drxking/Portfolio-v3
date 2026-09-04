import { MoveRight } from 'lucide-react';

import ImageRevealTrail from "./components/ImageRevealTrail"

function App() {
  return (
    <main>
      <nav className="fixed flex w-full  z-50 md:justify-between items-center p-8 md:px-20  ">
        <p className='md:flex hidden'></p>
        <ul className="flex  md:justify-center justify-between w-full  md:w-auto  md:gap-12 gap-2 md:text-sm text-xs">
          {
            [
              { link: "/", name: "Home" },
              { link: "/", name: "Works" },
              { link: "/", name: "Skills" },
              { link: "/", name: "Resume" }
            ].map((e) => (
              <li key={e.name} className="uppercase ">{e.name}</li>
            ))
          }
        </ul>
        <a href="" className='group md:flex hidden'><p className="uppercase flex items-center text-sm  gap-1">Hire Me <MoveRight className='group-hover:translate-x-2 transition inline-block' /></p></a>
      </nav>
      <div className='h-screen flex overflow-hidden justify-center relative w-screen'>
        <h1 className="cursiv text-[23vw] custom-text leading-none font-extrabold uppercase text-center w-full absolute md:bottom-0  bottom-[40%]">Sudip<br />Acharya</h1>
        <div className="absolute bottom-0 w-[250%] md:w-full flex justify-center">
          <img src="arrow.png" className='absolute xl:top-[0.5vw] xl:right-[35%] lg:top-0 lg:right-[30%] md:right-[27%] right-[35%] -top-[5%]  invert sm:h-30 h-20  rotate-45' alt="" />
          {/* <img src="bg2.png"  alt="" /> */}
          <ImageRevealTrail
            mainImage="/bg3.png"
            revealImage="/bg.png"
            width="80%"

            brushSize={120}
            softness={0.8}
            holdTime={200}
            fadeTime={500}
          />
        </div>
      </div>

    </main>

  )
}

export default App
