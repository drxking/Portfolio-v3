import { Mouse, MoveRight } from 'lucide-react';

import ImageRevealTrail from "./components/ImageRevealTrail"
import { useEffect, useRef } from 'react';
import gsap, { Power1 } from 'gsap';

import { ScrollTrigger } from "gsap/ScrollTrigger"
import Lenis from 'lenis';
import { ShinyButton } from "../components/ui/shiny-button"
import { useGSAP } from '@gsap/react';
import CircularSplitRollSection from "./components/CircularSplitRollSection";

gsap.registerPlugin(ScrollTrigger)

let skills = [

  {
    name: "GIT'H",
    power: 1,
    img: "git.png"
  },




  {
    name: "React",
    power: 2,
    img: "react.png"
  },
  {
    name: "Docker",
    power: 3,
    img: "docker.png"
  },
  {
    name: "MongoDB",
    power: 4,
    img: "mongo.png"
  },
  {
    name: "Postgres",
    power: 5,
    img: "sql.png"
  },
  {
    name: "JavaScript",
    power: 6,
    img: "javascript.png"
  },
  {
    name: "Tailwind",
    power: 5,
    img: "tailwind.png"
  },

  {
    name: "Expresss",
    power: 4,
    img: "express.png"
  },
  {
    name: "Python",
    power: 3,
    img: "/python.png"
  },
  {
    name: "Linux",
    power: 2,
    img: "linux.png"
  },




  {
    name: "GSAP",
    power: 1,
    img: "gsap.png"
  },

]


let projects = [
  {
    name: "Taara",
    img: "taraa.png",
    desc: "A frontend clone project showcasing seamless animations using GSAP, smooth scrolling with Lenis, and modern design principles with Tailwind CSS.",
    skills: [
      "tailwind", "javascript", "gsap", "git"
    ],
    link: "https://taara-clone.sudipacharya456.com.np/"
  },
  {
    name: "Payment",
    img: "payment.png",
    desc: "A modern, gesture-inspired UI that brings swipe-to-pay interactions and seamless transitions to the web.",
    skills: [
      "react", "tailwind", "javascript", "gsap", "mongo"
    ],
    link: "https://payment.sudipacharya456.com.np/"
  },
  {
    name: "Dakar",
    img: "dakar.png",
    desc: "A bold and interactive website that blends futuristic design with smooth motion, delivering a visually striking and immersive exploration experience.",
    skills: [
      "tailwind", "javascript", "mongo", "gsap", "react"
    ],
    link: "https://dakar.sudipacharya456.com.np/"
  },
  {
    name: "Wander",
    img: "wander.png",
    desc: "A modern web experience combining smooth animations, immersive scrolling, and elegant interactivity",
    skills: [
      "tailwind", "javascript", "gsap"
    ],
    link: "https://wanders.sudipacharya456.com.np/"
  }
]

function App() {


  useEffect(() => {
    const lenis = new Lenis()

    lenis.on("scroll", ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000)
      })

      lenis.destroy()
    }
  }, [])


  useGSAP(() => {
    let tl = gsap.timeline()
    tl.to(".overlay", {
      opacity: 0,
      delay: 1,

    })
    tl.to(".open-box", {
      y: `-100%`,
      stagger: 0.1,
      ease: Power1.easeInOut,
      duration: 1
    })

  })

  return (
    <main >
      <div className='h-screen w-full fixed  pointer-events-none  z-1000 grid grid-cols-5 md:grid-cols-7'>
        <div className='absolute overlay  -translate-x-1/2 -translate-y-1/2 flex items-center justify-center top-1/2 left-1/2 '>

          <svg data-component="Octicon" aria-hidden="true" focusable="false" className="octicon octicon-mark-github scale-200 animate-spin  absolute" width="25.5" height="25.5" fill="currentColor" display="inline-block" overflow="visible" ><path d="M10.226 17.284c-2.965-.36-5.054-2.493-5.054-5.256 0-1.123.404-2.336 1.078-3.144-.292-.741-.247-2.314.09-2.965.898-.112 2.111.36 2.83 1.01.853-.269 1.752-.404 2.853-.404 1.1 0 1.999.135 2.807.382.696-.629 1.932-1.1 2.83-.988.315.606.36 2.179.067 2.942.72.854 1.101 2 1.101 3.167 0 2.763-2.089 4.852-5.098 5.234.763.494 1.28 1.572 1.28 2.807v2.336c0 .674.561 1.056 1.235.786 4.066-1.55 7.255-5.615 7.255-10.646C23.5 6.188 18.334 1 11.978 1 5.62 1 .5 6.188.5 12.545c0 4.986 3.167 9.12 7.435 10.669.606.225 1.19-.18 1.19-.786V20.63a2.9 2.9 0 0 1-1.078.224c-1.483 0-2.359-.808-2.987-2.313-.247-.607-.517-.966-1.034-1.033-.27-.023-.359-.135-.359-.27 0-.27.45-.471.898-.471.652 0 1.213.404 1.797 1.235.45.651.921.943 1.483.943.561 0 .92-.202 1.437-.719.382-.381.674-.718.944-.943"></path></svg>

          <p className='md:translate-y-16  translate-y-10 md:text-sm text-xs tracking-wider uppercase'>Loading Portfolio...</p>
        </div>
        {[0, 0, 0, 0, 0, 0, 0].map((e, idx) => {
          if (idx < 5) {
            return <div className='h-full open-box bg-linear-to-b border-r border-r-red-900 from-red-600 to-red-800'></div>
          } else {
            return <div className='h-full md:flex hidden open-box bg-linear-to-b border-r border-r-red-900 from-red-600 to-red-800'></div>
          }
        })}

      </div>
      <nav className="absolute overflow-hidden top-0 flex w-full md:flex-row flex-col gap-6 z-50 md:justify-between items-center p-8 md:px-20  ">
        <div className='relative w-fit h-fit'>
          <a href="https://github.com/drxking" target='__blank'>
            <svg data-component="Octicon" aria-hidden="true" focusable="false" className="octicon octicon-mark-github scale-200" width="26" height="26" fill="currentColor" display="inline-block" overflow="visible" style={{ "verticalAlign": "text-bottom" }}><path d="M10.226 17.284c-2.965-.36-5.054-2.493-5.054-5.256 0-1.123.404-2.336 1.078-3.144-.292-.741-.247-2.314.09-2.965.898-.112 2.111.36 2.83 1.01.853-.269 1.752-.404 2.853-.404 1.1 0 1.999.135 2.807.382.696-.629 1.932-1.1 2.83-.988.315.606.36 2.179.067 2.942.72.854 1.101 2 1.101 3.167 0 2.763-2.089 4.852-5.098 5.234.763.494 1.28 1.572 1.28 2.807v2.336c0 .674.561 1.056 1.235.786 4.066-1.55 7.255-5.615 7.255-10.646C23.5 6.188 18.334 1 11.978 1 5.62 1 .5 6.188.5 12.545c0 4.986 3.167 9.12 7.435 10.669.606.225 1.19-.18 1.19-.786V20.63a2.9 2.9 0 0 1-1.078.224c-1.483 0-2.359-.808-2.987-2.313-.247-.607-.517-.966-1.034-1.033-.27-.023-.359-.135-.359-.27 0-.27.45-.471.898-.471.652 0 1.213.404 1.797 1.235.45.651.921.943 1.483.943.561 0 .92-.202 1.437-.719.382-.381.674-.718.944-.943"></path></svg>

          </a>
          <img src="arrow.png" className='absolute h-10 md:translate-x-16 translate-x-14 md:scale-200 scale-150 invert shrink-0  rotate-90 rotate-y-180 md:top-0 -top-2 ' alt="" />
        </div>
        <ul className="flex  md:justify-center justify-between w-full items-center  md:w-auto  md:gap-12 gap-2 md:text-sm text-xs">
          {
            [
              { link: "#works", name: "Works" },
              { link: "#skills", name: "Skills" }
            ].map((e) => (
              <li key={e.name} className="uppercase ">
                <a href={e.link}>{e.name}</a>
              </li>
            ))
          }
          <li className="uppercase ">
            <a href="Sudip_Acharya_Resume.pdf" download>Resume</a>
          </li>
        </ul>
        <a href="mailto:xtre969@gmail.com" className='group'><p className=" flex items-center leading-none text-sm  gap-1">xtre969@gmail.com <MoveRight className='group-hover:translate-x-2 transition inline-block' /></p></a>
      </nav>
      <div className='h-screen flex overflow-hidden justify-center relative w-full ccc'>


        <div id='skills' className='h-screen absolute  top-0 left-0 w-full overflow-hidden grain-bg  grid gap-0.5  items-end grid-cols-5  lg:grid-cols-11 '>
          {
            skills.map(() => (
              <div className='h-full border-r-2 border-r-red-600/50 '></div>
            ))
          }
        </div>

        <div className='flex md:hidden flex-col items-center opacity-70 justify-center absolute left-1/2 -translate-x-1/2 top-[27%]'>
          <Mouse size={20} />
          <p className='text-[9px]'>Scroll from here</p>
        </div>



        <div className='absolute flex flex-col items-center justify-center md:bottom-0 bottom-[40%]'>
        
          <h1 className="cursiv z-10  text-[25vw] custom-text leading-none font-extrabold uppercase text-center w-full   ">
            Sudip</h1>
          <h1 className="cursiv z-10  text-[25vw] custom-text leading-none font-extrabold uppercase text-center w-full   ">
            Acharya</h1>
        </div>
        <div className="absolute z-20 bottom-0 w-[250%] md:w-full flex justify-center">
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

      <div id='skills' className='h-screen w-full relative overflow-hidden grain-bg  grid gap-0.5  items-end grid-cols-5  lg:grid-cols-11 '>
        <div className='absolute invert cursiv bottom-5 text-center w-full uppercase font-bold text-8xl custom-text text-black/10 '>
          My <br /> Skills
        </div>



        {
          skills.map((e) => {
            if (e.power <= 3 && window.innerWidth < 1024) {
              return null;
            }

            return (
              <Bar key={e.name} e={e} />
            );
          })
        }


      </div>
      <div id='works' className='bg-[#AB0910] py-20 md:px-10 px-4'>
        <h1 className='md:text-[11rem] text-[8rem] md:mb-10 leading-none custom-text uppercase font-extrabold invert cursiv'>My Works</h1>
        <div className='  md:pt-10 grid  grid-cols-1 lg:grid-cols-2 gap-x-5 md:gap-y-40 gap-y-5'>
          {
            projects.map((e, idx) => {
              if (idx % 2 == 0) {
                return (
                  <>
                    <div className='h-auto w-full md:mt-0 mt-20'>
                      {/* <img src={`/projects/${e.img}`} className='h-auto w-full' /> */}
                      <ImageRevealTrail
                        revealImage="/bg.png"
                        mainImage={`/projects/${e.img}`}
                        width="100%"

                        brushSize={50}
                        softness={0.8}
                        holdTime={200}
                        fadeTime={500}
                      />
                    </div>
                    <div className='text-black'>
                      <h1 className='md:text-8xl text-5xl uppercase custom-text font-bold invert'>{e.name}</h1>
                      <p className='xl:w-2/4 lg:w-3/4 pt-4 md:pl-10 uppercase text-xs invert'>{e.desc}</p>
                      <p className='md:pl-10 pt-10 flex  gap-2'>
                        {e.skills?.map((ei, idxs) => (
                          <img key={idxs} src={`/skills/${ei}.png`} className='h-14' alt={ei} />
                        ))}
                      </p>
                      <a href={e.link}>
                        <ShinyButton className='md:mt-10 mt-2 md:ml-10'>Visit Site</ShinyButton>
                      </a>

                    </div>
                  </>
                )
              }
              else {
                if (window.innerWidth >= 1024) {
                  return (
                    <>
                      <div className='flex flex-col text-black items-end'>
                        <h1 className='md:text-8xl text-5xl uppercase custom-text invert font-bold'>{e.name}</h1>
                        <p className='xl:w-2/4 lg:w-3/4 pt-4 md:pr-10 text-right invert'>{e.desc}</p>
                        <p className='md:pr-10 pt-10 flex justify-end gap-2'>
                          {e.skills?.map((ei, idxs) => (
                            <img key={idxs} src={`/skills/${ei}.png`} className='h-14' alt={ei} />
                          ))}
                        </p>
                        <a href={e.link}>
                          <ShinyButton className='md:mt-10 mt-2 md:mr-10'>Visit Site</ShinyButton>
                        </a>
                      </div>
                      <div className='h-auto md:mt-0 mt-20'>
                        {/* <img src={`/projects/${e.img}`} className='h-auto w-full' /> */}
                        <ImageRevealTrail
                          revealImage="/bg.png"
                          mainImage={`/projects/${e.img}`}
                          width="100%"

                          brushSize={50}
                          softness={0.8}
                          holdTime={200}
                          fadeTime={500}
                        />
                      </div>
                    </>
                  )
                } else {
                  return (
                    <>
                      <div className='h-auto md:mt-0 mt-20'>
                        {/* <img src={`/projects/${e.img}`} className='h-auto w-full' /> */}
                        <ImageRevealTrail
                          revealImage="/bg.png"
                          mainImage={`/projects/${e.img}`}
                          width="100%"

                          brushSize={50}
                          softness={0.8}
                          holdTime={200}
                          fadeTime={500}
                        />
                      </div>
                      <div className='flex flex-col text-black items-end'>
                        <h1 className='md:text-8xl text-5xl uppercase custom-text invert font-bold'>{e.name}</h1>
                        <p className='xl:w-2/4 lg:w-3/4 pt-4 md:pr-10 text-right invert'>{e.desc}</p>
                        <p className='md:pr-10 pt-10 flex justify-end gap-2'>
                          {e.skills?.map((ei, idxs) => (
                            <img key={idxs} src={`/skills/${ei}.png`} className='h-14' alt={ei} />
                          ))}
                        </p>
                        <a href={e.link}>
                          <ShinyButton className='md:mt-10 mt-2 md:mr-10'>Visit Site</ShinyButton>
                        </a>
                      </div>

                    </>
                  )
                }
              }
            })
          }
        </div>
      </div>
      <div className='relative pt-20 '>
        <h1 className='md:text-[8rem]  md:px-10 px-4 text-[4rem]  md:mb-10 leading-none  uppercase font-extrabold cursiv'>My <br /> Extra <br /> Interests</h1>
        <p className='ml-auto md:pl-20 pl-16   md:sticky md:text-lg font-semibold uppercase top-0 md:top-[50%] z-10 tracking-widest text-white/75 text-xs md:pt-0 pt-2'>
          My Favorite Series <br /> <span className='pl-10'>Favorite Character</span>
        </p>
        <CircularSplitRollSection />

      </div>
      <div className='pt-10 relative h-screen overflow-hidden'>
        <h1 className='md:text-[8rem] custom-text  md:px-10 px-4 text-[4rem] md:mb-10 leading-none  uppercase font-extrabold cursiv'>Connect With Me</h1>
        <div className='flex flex-col h-4/5 md:pb-0 pb-30 items-center justify-center'>
          <h1 className='md:text-[20rem] text-[15rem] custom-text invert cursiv font-extrabold leading-none tracking-tighter'>404</h1>
          <p className='text-2xl text-center custom-text invert'>Not Found
          </p>
          <p className='md:text-2xl text-lg leading-none pt-4 text-center opacity-35'>
            This person is already working remotely for <a href="#" className='underline'>CyberLhotse.</a></p>
        </div>
        <img src="bg.png" className='absolute w-[110%] sm:w-[40%] right-1/2 translate-x-1/2 sm:translate-0 sm:right-0 bottom-0' />
      </div>

    </main>

  )
}

export default App


const Bar = ({ e }) => {
  let hello = useRef(null)
  // useGSAP(()=>{
  //   gsap.from(hello.current,{
  //     height:"0",
  //     delay:e.power/20,
  //     scrollTrigger:{
  //       trigger:".grain-bg" ,
  //       start: "top 20%",
  //     }
  //   })
  // })
  return (
    <div
      key={e.name}
      className="bg-red-900/40 h-full flex flex-col justify-end "
    >
      <img
        style={{
          animationDelay: `${e.power / 5}s`,
        }}
        src={`/skills/${e.img}`}
        className="w-full float"
      />

      <div
        ref={hello}
        className="
            bg-linear-to-b
            from-black/70
            to-transparent
            relative
            w-full
            rounded-t-full
            shadow-custom
          "
        style={{
          height: `${e.power * 10 + 15}%`,
        }}
      >
        <p
          className="
              absolute
              top-[15%]
              left-1/2
              -translate-x-1/2
              uppercase
              font-bold
              md:text-7xl
              text-4xl
              whitespace-nowrap
              custom-text2
              invert
              opacity-75
            "
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
          }}
        >
          {e.name}
        </p>
      </div>
    </div>
  )
}
