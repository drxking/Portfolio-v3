import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect } from "react";


const CardCircle = ({
  cards = [],
  numberOfCards = cards.length,
  radius = 240,
  cardWidth = 40,
  cardHeight = 56,
  rotationOffset = 90,
}) => {
  const visibleCards = cards.slice(0, numberOfCards);

  window.addEventListener("resize", () => {
    circleManager()
  })
  useEffect(() => {
    circleManager()
  }, [])


  function circleManager() {
    console.log(window.innerWidth)
    if (window.innerWidth < 1024) {
      document.querySelector(".repear").style.scale = 0.7
      document.querySelector(".repear").style.transform = `translateY(150px)`
    } else {
      document.querySelector(".repear").style.scale = 1
      document.querySelector(".repear").style.transform = `translateY(0px)`


    }
  }
  useGSAP(() => {
    gsap.to(".repear", {
      rotate: "360deg",
      repeat: -1,
      ease: "none",
      duration: 10,
      
    })
    let tl = gsap.timeline({
      repeat:-1,
      repeatDelay:2
    })

    tl.to(".cards", {
      rotateY: "180deg",
      rotateX:"180deg",
      duration: 1,
      stagger: 0.03
    })
    tl.to(".cards", {
      rotateY: "360deg",
      rotateX:"360deg",
      duration: 1,
      stagger: 0.03
    })

  })

  return (
    <div
      className="relative  repear flex items-center justify-center"
      style={{
        width: radius * 2,
        height: radius * 2,
      }}
    >
      {visibleCards.map((src, index) => {
        const angle = (index / numberOfCards) * Math.PI * 2;

        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        const rotation =
          (360 / numberOfCards) * index + rotationOffset;

        return (
          <img
            key={index}
            src={src}
            alt=""
            className="absolute cards rounded-md flex  object-cover"
            style={{
              width: `${cardWidth}px`,
              height: `${cardHeight}px`,


              transform: `
                translate(${x}px, ${y}px)
                rotate(${rotation}deg)
              `,
            }}
          />
        );
      })}
    </div>
  );
};

export default CardCircle;