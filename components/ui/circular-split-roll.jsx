"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const DESKTOP_WIDTH = 1200;
const TABLET_MIN_WIDTH = 768;
const DEPTH_MIN = -1;
const DEPTH_MAX = 1;
const Z_INDEX_MIN = 1;
const FOCUS_LOCAL_PROGRESS = 0.75;

gsap.registerPlugin(ScrollTrigger);

const IMAGES = [
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=900&q=80",
];

const defaultItems = [
  { id: 0, title: "Aperture", subtitle: "Light and framing", image: IMAGES[0], alt: "Aperture" },
  { id: 1, title: "Lumen", subtitle: "Soft visual systems", image: IMAGES[1], alt: "Lumen" },
  { id: 2, title: "Halcyon", subtitle: "Calm cinematic mood", image: IMAGES[2], alt: "Halcyon" },
  { id: 3, title: "Meridian", subtitle: "Direction and scale", image: IMAGES[3], alt: "Meridian" },
  { id: 4, title: "Cascade", subtitle: "Rhythm in motion", image: IMAGES[4], alt: "Cascade" },
  { id: 5, title: "Vertex", subtitle: "Sharp composition", image: IMAGES[5], alt: "Vertex" },
  { id: 6, title: "Solace", subtitle: "Quiet detail", image: IMAGES[6], alt: "Solace" },
  { id: 7, title: "Quill", subtitle: "Narrative texture", image: IMAGES[7], alt: "Quill" },
  { id: 8, title: "Ember", subtitle: "Warm visual energy", image: IMAGES[8], alt: "Ember" },
  { id: 9, title: "Drift", subtitle: "Slow exploration", image: IMAGES[9], alt: "Drift" },
];

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);

    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return prefersReducedMotion;
}

function wrapProgress(value) {
  let wrappedValue = value % 1;

  if (wrappedValue < 0) {
    wrappedValue += 1;
  }

  return wrappedValue;
}

function getCircularPosition(progress, radiusX, radiusY, angleOffset = 0) {
  const angle = progress * Math.PI * 2 + angleOffset;

  return {
    x: Math.sin(angle) * radiusX,
    y: Math.cos(angle) * radiusY,
    horizontalDepth: Math.sin(angle),
  };
}

function getStrength(value) {
  return gsap.utils.clamp(
    0,
    1,
    gsap.utils.mapRange(DEPTH_MIN, DEPTH_MAX, 0, 1, value),
  );
}

function shapeFocus(strength, start = 0.42, power = 2.8) {
  const normalized = gsap.utils.clamp(0, 1, (strength - start) / (1 - start));
  return Math.pow(normalized, power);
}

function getNearestSnapPoint(value, snapPoints) {
  return snapPoints.reduce((nearest, point) => {
    return Math.abs(point - value) < Math.abs(nearest - value) ? point : nearest;
  }, snapPoints[0] ?? 0);
}

function CircularSplitRollComp({
  items = defaultItems,
  className = "",
  background,
  titleColor,
  sectionHeight = 260,
  leftRadiusX = 220,
  leftRadiusY = 220,
  rightRadiusX = 400,
  rightRadiusY = 400,
  imageCardWidth = 190,
  imageCardHeight = 210,
  titleSize = "clamp(28px, 3vw, 56px)",
  subtitleSize = "clamp(11px, 0.9vw, 14px)",
  pinSpacing = true,
  scrub = 1.2,
  snapDelay = 0.1,
  textCenterScale = 1,
  textSideScale = 0.68,
  textCenterOpacity = 1,
  textSideOpacity = 0.18,
  imageCenterScale = 1,
  imageSideScale = 0.58,
  imageCenterOpacity = 1,
  imageSideOpacity = 0.14,
  textFocusStart = 0.42,
  textFocusPower = 2.6,
  imageFocusStart = 0.45,
  imageFocusPower = 3.2,
  leftAngleOffset = Math.PI,
  rightAngleOffset = 0,
  focusPhase = 0,
  leftDepthMax = 30,
  rightDepthMax = 40,
  columnSpreadVw = 5,
  columnOffsetPx = 500,
  gridImageClassName = "",
  gridCardClassName = "",
  gridTitleClassName = "",
  gridSubtitleClassName = "",
}) {
  const rootRef = useRef(null);
  const stickyRef = useRef(null);
  const progressRef = useRef(0);
  const reducedMotion = usePrefersReducedMotion();

  const safeItems = useMemo(() => {
    return items.map((item, index) => ({
      id: item.id ?? index,
      key: `${item.id ?? item.title ?? "item"}-${index}`,
      title: item.title ?? `Item ${index + 1}`,
      subtitle: item.subtitle ?? "",
      date: item.date ?? "",
      image: item.image ?? item.mainImage ?? "",
      mainImage: item.mainImage ?? item.image ?? "",
      characterImage: item.characterImage ?? item.revealImage ?? item.image ?? "",
      alt: item.alt ?? item.title ?? `Item ${index + 1}`,
    }));
  }, [items]);

  useEffect(() => {
    if (!rootRef.current || !stickyRef.current) return undefined;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      const ctx = gsap.context(() => {
        const leftNodes = gsap.utils.toArray(
          ".circular-scroll-showcase__left-item",
        );
        const rightNodes = gsap.utils.toArray(
          ".circular-scroll-showcase__right-item",
        );
        const total = safeItems.length;
        const snapPoints = safeItems
          .map((_, index) => {
            return wrapProgress(index / total + focusPhase / total);
          })
          .sort((a, b) => a - b);

        if (!total) return undefined;

        gsap.set([...leftNodes, ...rightNodes], { opacity: 1 });

        const render = (scrollProgress) => {
          progressRef.current = scrollProgress;

          const width = window.innerWidth || DESKTOP_WIDTH;
          let factor = 1;

          if (width < DESKTOP_WIDTH && width >= TABLET_MIN_WIDTH) {
            factor = width / DESKTOP_WIDTH;
          }

          leftNodes.forEach((node, index) => {
            const localProgress = wrapProgress(
              index / total - scrollProgress + FOCUS_LOCAL_PROGRESS + focusPhase / total,
            );
            const position = getCircularPosition(
              localProgress,
              leftRadiusX * factor,
              leftRadiusY * factor,
              leftAngleOffset,
            );
            const focusStrength = shapeFocus(
              getStrength(position.horizontalDepth),
              textFocusStart,
              textFocusPower,
            );

            gsap.set(node, {
              x: position.x,
              y: position.y,
              scale: gsap.utils.interpolate(textSideScale, textCenterScale, focusStrength),
              opacity: gsap.utils.interpolate(textSideOpacity, textCenterOpacity, focusStrength),
              zIndex: Math.round(gsap.utils.interpolate(Z_INDEX_MIN, leftDepthMax, focusStrength)),
              transformOrigin: "50% 50%",
            });
          });

          rightNodes.forEach((node, index) => {
            const localProgress = wrapProgress(
              index / total - scrollProgress + FOCUS_LOCAL_PROGRESS + focusPhase / total,
            );
            const position = getCircularPosition(
              localProgress,
              rightRadiusX * factor,
              rightRadiusY * factor,
              rightAngleOffset,
            );
            const focusStrength = shapeFocus(
              getStrength(-position.horizontalDepth),
              imageFocusStart,
              imageFocusPower,
            );

            gsap.set(node, {
              x: position.x,
              y: position.y,
              scale: gsap.utils.interpolate(imageSideScale, imageCenterScale, focusStrength),
              opacity: gsap.utils.interpolate(imageSideOpacity, imageCenterOpacity, focusStrength),
              zIndex: Math.round(gsap.utils.interpolate(Z_INDEX_MIN, rightDepthMax, focusStrength)),
              transformOrigin: "50% 50%",
            });
          });
        };

        render(0);

        const scrollTrigger = ScrollTrigger.create({
          trigger: rootRef.current,
          start: "top top",
          end: `+=${sectionHeight * safeItems.length}%`,
          pin: stickyRef.current,
          scrub,
          pinSpacing,
          snap: {
            snapTo: (value) => {
              return getNearestSnapPoint(value, snapPoints);
            },
            delay: snapDelay,
            duration: { min: 0.25, max: 0.6 },
            ease: "power2.out",
          },
          invalidateOnRefresh: true,
          onUpdate: (self) => render(self.progress),
        });

        const onResize = () => {
          render(progressRef.current);
          scrollTrigger.refresh();
        };

        window.addEventListener("resize", onResize);

        return () => {
          window.removeEventListener("resize", onResize);
          scrollTrigger.kill();
        };
      }, rootRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [
    safeItems,
    scrub,
    snapDelay,
    pinSpacing,
    sectionHeight,
    leftRadiusX,
    leftRadiusY,
    rightRadiusX,
    rightRadiusY,
    textCenterScale,
    textSideScale,
    textCenterOpacity,
    textSideOpacity,
    imageCenterScale,
    imageSideScale,
    imageCenterOpacity,
    imageSideOpacity,
    textFocusStart,
    textFocusPower,
    imageFocusStart,
    imageFocusPower,
    leftAngleOffset,
    rightAngleOffset,
    focusPhase,
    leftDepthMax,
    rightDepthMax,
  ]);

  return (
    <section
      ref={rootRef}
      className={`relative min-h-screen w-full overflow-clip ${background ? "" : "bg-background"} ${titleColor ? "" : "text-foreground"} ${className}`}
      style={{
        background,
        color: titleColor,
      }}
    >
      <div
        ref={stickyRef}
        aria-hidden="true"
        className={`relative h-screen w-full overflow-hidden ${reducedMotion ? "hidden" : "max-[1025px]:hidden"}`}
      >
        <div className="relative mx-auto flex h-full w-full">
          <div
            className="relative flex h-full w-[50vw] items-center justify-center"
            style={{ transform: `translateX(calc(${columnSpreadVw}vw - ${columnOffsetPx}px))` }}
          >
            <div className="relative h-[78vh]">
              {safeItems.map((item) => (
                <div
                  key={item.key}
                  className="circular-scroll-showcase__left-item pointer-events-none absolute left-1/2 top-1/2 w-full origin-center whitespace-nowrap text-center opacity-0 will-change-[transform,opacity]"
                >
                  <span className="block font-medium leading-none" style={{ fontSize: titleSize }}>
                    {item.title}
                  </span>
                  {item.subtitle ? (
                    <span
                      className="mt-3 block font-sans font-medium uppercase leading-none tracking-widest opacity-70"
                      style={{ fontSize: subtitleSize }}
                    >
                      {item.subtitle}
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          <div
            className="relative flex h-full w-[50vw] items-center justify-center"
            style={{ transform: `translateX(calc(${columnOffsetPx}px - ${columnSpreadVw}vw))` }}
          >
            <div className="relative h-[78vh]">
              {safeItems.map((item) => (
                <div
                  key={item.key}
                  className="circular-scroll-showcase__right-item absolute left-1/2 top-1/2 origin-center opacity-0 will-change-[transform,opacity]"
                  style={{
                    width: imageCardWidth,
                    height: imageCardHeight,
                    marginLeft: imageCardWidth * -0.5,
                    marginTop: imageCardHeight * -0.5,
                  }}
                >
                  <div className="relative h-full w-full overflow-hidden rounded-[18px] bg-[#f5f2eb] shadow-[0_30px_60px_rgba(0,0,0,0.28),0_8px_20px_rgba(0,0,0,0.16)]">
                    <img
                      src={item.characterImage || item.image}
                      alt={item.alt}
                      className="pointer-events-none absolute inset-0 block h-full w-full select-none object-cover"
                      draggable="false"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={`w-full px-5 py-10 max-md:px-4 max-md:py-8 ${reducedMotion ? "block" : "sr-only max-[1025px]:not-sr-only max-[1025px]:block"}`}>
        <div className="mx-auto grid w-full max-w-5xl grid-cols-3 gap-5 max-md:grid-cols-1 max-md:gap-y-16">
          {safeItems.map((item, index) => {
            const mobileAlignment = index % 2 === 0 ? "max-md:items-start" : "max-md:items-end";
            const mobileTextAlignment = index % 2 === 0 ? "max-md:text-left" : "max-md:text-right";

            return (
            <article key={item.key} className={`w-full max-md:flex max-md:flex-col ${mobileAlignment} ${gridCardClassName}`}>
              <div className={`relative aspect-square w-full overflow-hidden bg-[#f5f2eb] shadow-[0_18px_38px_rgba(0,0,0,0.28)] max-md:w-[180px] ${gridImageClassName}`}>
                <img
                  src={item.characterImage || item.image}
                  alt={item.alt}
                  className="absolute inset-0 block h-full w-full object-cover"
                  draggable="false"
                />
              </div>

              <h3 className={`mt-4 text-left text-[clamp(26px,5vw,42px)] font-medium leading-none text-foreground max-md:mt-3 max-md:text-[clamp(34px,11vw,58px)] ${mobileTextAlignment} ${gridTitleClassName}`}>
                {item.title}
              </h3>
              {item.subtitle ? (
                <p className={`mt-3 text-left text-sm font-medium uppercase tracking-widest text-white/65 max-md:text-base ${mobileTextAlignment} ${gridSubtitleClassName}`}>
                  {item.subtitle}
                </p>
              ) : null}
              {item.date ? (
                <p className={`mt-2 text-left text-sm font-semibold uppercase tracking-[0.28em] text-white/45 max-md:text-base ${mobileTextAlignment}`}>
                  {item.date}
                </p>
              ) : null}
            </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function CircularSplitRoll({
  items = defaultItems,
  radius = 500,
  cardSize = 205,
  sectionHeight = 100,
  snapDelay = 0.1,
  subtitleSize,
  leftRadiusX,
  leftRadiusY,
  rightRadiusX,
  rightRadiusY,
  imageCardWidth,
  imageCardHeight,
  ...rest
}) {
  return (
    <CircularSplitRollComp
      items={items}
      sectionHeight={sectionHeight}
      snapDelay={snapDelay}
      subtitleSize={subtitleSize}
      leftRadiusX={leftRadiusX ?? radius}
      leftRadiusY={leftRadiusY ?? radius}
      rightRadiusX={rightRadiusX ?? radius}
      rightRadiusY={rightRadiusY ?? radius}
      imageCardWidth={imageCardWidth ?? cardSize}
      imageCardHeight={imageCardHeight ?? cardSize}
      {...rest}
    />
  );
}
