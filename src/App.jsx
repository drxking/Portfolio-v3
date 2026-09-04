import { MoveRight, Power } from 'lucide-react';

import ImageRevealTrail from "./components/ImageRevealTrail"
import { useEffect, useState } from 'react';

let skills = [

  {
    name: "GIT",
    power: 1,
    img:"git.png"
  },

  {
    name: "Linux",
    power: 2,
    img:"linux.png"
  },
  {
    name: "Postgres",
    power: 3,
    img:"sql.png"
  },
  {
    name: "Tailwind",
    power: 4,
    img:"tailwind.png"
  },
  {
    name: "React",
    power: 5,
    img:"react.png"
  },
  {
    name: "JavaScript",
    power: 6,
    img:"javascript.png"
  },
  {
    name: "Express",
    power: 5,
    img:"express.png"
  },
  {
    name: "GSAP",
    power: 4,
    img:"gsap.png"
  },
  {
    name: "MongoDB",
    power: 3,
    img:"mongo.png"
  },
  {
    name: "Docker",
    power: 2,
    img:"docker.png"
  },
  {
    name: "Python",
    power: 1,
    img:"/python.png"
  },
]

function App() {
  const [width, setwidth] = useState(window.innerWidth)

  window.addEventListener("resize",(e)=>{
    setwidth(window.innerWidth)
  })
  return (
    <main className='overflow-x-hidden'>
      <nav className="fixed flex w-full md:flex-row flex-col gap-6 z-50 md:justify-between items-center p-8 md:px-20  ">
        <div className='relative w-fit h-fit'>
          <a href="https://github.com/drxking" target='__blank'>
            <svg data-component="Octicon" aria-hidden="true" focusable="false" className="octicon octicon-mark-github scale-200" width="26" height="26" fill="currentColor" display="inline-block" overflow="visible" style={{ "verticalAlign": "text-bottom" }}><path d="M10.226 17.284c-2.965-.36-5.054-2.493-5.054-5.256 0-1.123.404-2.336 1.078-3.144-.292-.741-.247-2.314.09-2.965.898-.112 2.111.36 2.83 1.01.853-.269 1.752-.404 2.853-.404 1.1 0 1.999.135 2.807.382.696-.629 1.932-1.1 2.83-.988.315.606.36 2.179.067 2.942.72.854 1.101 2 1.101 3.167 0 2.763-2.089 4.852-5.098 5.234.763.494 1.28 1.572 1.28 2.807v2.336c0 .674.561 1.056 1.235.786 4.066-1.55 7.255-5.615 7.255-10.646C23.5 6.188 18.334 1 11.978 1 5.62 1 .5 6.188.5 12.545c0 4.986 3.167 9.12 7.435 10.669.606.225 1.19-.18 1.19-.786V20.63a2.9 2.9 0 0 1-1.078.224c-1.483 0-2.359-.808-2.987-2.313-.247-.607-.517-.966-1.034-1.033-.27-.023-.359-.135-.359-.27 0-.27.45-.471.898-.471.652 0 1.213.404 1.797 1.235.45.651.921.943 1.483.943.561 0 .92-.202 1.437-.719.382-.381.674-.718.944-.943"></path></svg>

          </a>
          <img src="arrow.png" className='absolute h-10 md:translate-x-16 translate-x-14 md:scale-200 scale-150 invert shrink-0  rotate-90 rotate-y-180 md:top-0 -top-2 ' alt="" />
        </div>
        <ul className="flex  md:justify-center justify-between w-full items-center  md:w-auto  md:gap-12 gap-2 md:text-sm text-xs">
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
        <a href="" className='group h-[60%] md:flex hidden'><p className="uppercase flex items-center text-sm  gap-1">Hire Me <MoveRight className='group-hover:translate-x-2 transition inline-block' /></p></a>
      </nav>
      <div className='h-screen flex overflow-hidden justify-center relative w-screen'>




        <h1 className="cursiv  text-[25vw] custom-text leading-none font-extrabold uppercase text-center w-full absolute md:bottom-0  bottom-[40%]">
          Sudip<br />Acharya</h1>
        <div className="absolute bottom-0 w-[250%] md:w-full flex justify-center">
          <img src="arrow.png" className='absolute xl:top-[0.5vw] xl:right-[35%] lg:top-0 lg:right-[30%] md:right-[27%] right-[35%] top-[-5%]  invert sm:h-30 h-20  rotate-45' alt="" />
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
      <div className='h-screen relative overflow-hidden grain-bg w-screen grid gap-0.5  items-end grid-cols-5  lg:grid-cols-11 '>

        {
          skills.map((e) => {
            if (e.power <= 3 && window.innerWidth < 1024) {
              return
            }
            return (
              <div key={e.name} className='bg-red-900/40 h-full flex flex-col justify-end'>
                <img style={{animationDelay:`${e.power/5}s`}} src={`/skills/${e.img}`} className='w-full float' />
                <div className={`bg-linear-to-b from-black/70 to-transparent  w-full rounded-t-full`} style={{ height: `${e.power * 10}%` }}> </div>
              </div>
            )
          })
        }


      </div>

    </main>

  )
}

export default App
