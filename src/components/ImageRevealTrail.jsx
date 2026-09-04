import { useEffect, useRef } from "react";

export default function ImageRevealTrail({
  mainImage,
  revealImage,

  width = "100%",
  height = "100%",

  brushSize = 100,
  softness = 0.35,

  holdTime = 1200,
  fadeTime = 900,

  className = "",
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;

    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");

    const maskCanvas = document.createElement("canvas");
    const maskCtx = maskCanvas.getContext("2d");

    const mainCanvas = document.createElement("canvas");
    const mainCtx = mainCanvas.getContext("2d");

    const revealCanvas = document.createElement("canvas");
    const revealCtx = revealCanvas.getContext("2d");

    const mainImg = new Image();
    const revealImg = new Image();

    let mainLoaded = false;
    let revealLoaded = false;

    let lastPoint = null;
    let animationFrame;

    let isTouching = false;

    const points = [];

    const resize = () => {
      const rect = container.getBoundingClientRect();

      const dpr = Math.min(
        window.devicePixelRatio || 1,
        2
      );

      const w = Math.max(
        1,
        Math.round(rect.width * dpr)
      );

      const h = Math.max(
        1,
        Math.round(rect.height * dpr)
      );

      canvas.width = w;
      canvas.height = h;

      mainCanvas.width = w;
      mainCanvas.height = h;

      revealCanvas.width = w;
      revealCanvas.height = h;

      maskCanvas.width = w;
      maskCanvas.height = h;
    };

    const drawContain = (
      context,
      image,
      canvasWidth,
      canvasHeight
    ) => {
      const imageRatio =
        image.width / image.height;

      const canvasRatio =
        canvasWidth / canvasHeight;

      let drawWidth;
      let drawHeight;
      let x;
      let y;

      if (imageRatio > canvasRatio) {
        drawWidth = canvasWidth;

        drawHeight =
          drawWidth / imageRatio;

        x = 0;

        // Bottom aligned
        y =
          canvasHeight - drawHeight;
      } else {
        drawHeight = canvasHeight;

        drawWidth =
          drawHeight * imageRatio;

        // Center horizontally
        x =
          (canvasWidth - drawWidth) / 2;

        y = 0;
      }

      context.drawImage(
        image,
        x,
        y,
        drawWidth,
        drawHeight
      );
    };

    const getPoint = (event) => {
      const rect =
        canvas.getBoundingClientRect();

      return {
        x:
          (event.clientX - rect.left) *
          (canvas.width / rect.width),

        y:
          (event.clientY - rect.top) *
          (canvas.height / rect.height),
      };
    };

    const addPoint = (point) => {
      points.push({
        x: point.x,
        y: point.y,
        time: performance.now(),
      });
    };

    const addLine = (
      from,
      to
    ) => {
      const dx =
        to.x - from.x;

      const dy =
        to.y - from.y;

      const distance =
        Math.hypot(
          dx,
          dy
        );

      const rect =
        canvas.getBoundingClientRect();

      const scale =
        canvas.width /
        rect.width;

      const spacing =
        Math.max(
          3,
          brushSize *
            scale *
            0.12
        );

      const steps =
        Math.max(
          1,
          Math.ceil(
            distance /
              spacing
          )
        );

      for (
        let i = 0;
        i <= steps;
        i++
      ) {
        const t =
          i / steps;

        addPoint({
          x:
            from.x +
            dx * t,

          y:
            from.y +
            dy * t,
        });
      }
    };

    // -----------------------------
    // POINTER / TOUCH SUPPORT
    // -----------------------------

    const handlePointerDown = (
      event
    ) => {
      if (
        event.pointerType !==
        "mouse"
      ) {
        isTouching = true;
      }

      canvas.setPointerCapture?.(
        event.pointerId
      );

      const point =
        getPoint(event);

      addPoint(point);

      lastPoint = point;
    };

    const handlePointerMove = (
      event
    ) => {
      /*
       * Mouse:
       * reveal simply by hovering.
       *
       * Touch/Pen:
       * reveal only while touching.
       */
      if (
        event.pointerType !==
          "mouse" &&
        !isTouching
      ) {
        return;
      }

      const point =
        getPoint(event);

      if (lastPoint) {
        addLine(
          lastPoint,
          point
        );
      } else {
        addPoint(point);
      }

      lastPoint = point;
    };

    const handlePointerUp = (
      event
    ) => {
      if (
        event.pointerType !==
        "mouse"
      ) {
        isTouching = false;
      }

      lastPoint = null;

      try {
        canvas.releasePointerCapture?.(
          event.pointerId
        );
      } catch {
        // Pointer may already be released
      }
    };

    const handlePointerLeave =
      (event) => {
        if (
          event.pointerType ===
          "mouse"
        ) {
          lastPoint = null;
        }
      };

    const handlePointerCancel =
      (event) => {
        isTouching = false;
        lastPoint = null;

        try {
          canvas.releasePointerCapture?.(
            event.pointerId
          );
        } catch {
          // Ignore
        }
      };

    // -----------------------------
    // MASK
    // -----------------------------

    const drawMask = (
      now
    ) => {
      maskCtx.clearRect(
        0,
        0,
        maskCanvas.width,
        maskCanvas.height
      );

      const rect =
        canvas.getBoundingClientRect();

      const scale =
        canvas.width /
        rect.width;

      const baseRadius =
        brushSize * scale;

      while (
        points.length &&
        now -
          points[0].time >
          holdTime +
            fadeTime
      ) {
        points.shift();
      }

      for (
        const point of points
      ) {
        const age =
          now - point.time;

        let opacity = 1;
        let taper = 1;

        if (
          age >
          holdTime
        ) {
          const progress =
            Math.min(
              1,
              (age -
                holdTime) /
                fadeTime
            );

          opacity =
            1 - progress;

          /*
           * Pointed / tapered end.
           * Higher exponent = sharper tip.
           */
          taper =
            Math.pow(
              1 -
                progress,
              2.2
            );
        }

        const radius =
          baseRadius *
          Math.max(
            taper,
            0.02
          );

        const softnessAmount =
          Math.max(
            0,
            Math.min(
              1,
              softness
            )
          );

        const innerRadius =
          radius *
          (1 -
            softnessAmount);

        const gradient =
          maskCtx.createRadialGradient(
            point.x,
            point.y,
            innerRadius,

            point.x,
            point.y,
            radius
          );

        gradient.addColorStop(
          0,
          `rgba(255,255,255,${opacity})`
        );

        gradient.addColorStop(
          0.65,
          `rgba(255,255,255,${opacity})`
        );

        gradient.addColorStop(
          1,
          "rgba(255,255,255,0)"
        );

        maskCtx.fillStyle =
          gradient;

        maskCtx.beginPath();

        maskCtx.arc(
          point.x,
          point.y,
          radius,
          0,
          Math.PI * 2
        );

        maskCtx.fill();
      }
    };

    // -----------------------------
    // RENDER
    // -----------------------------

    const render = (
      now
    ) => {
      ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      );

      if (
        mainLoaded &&
        revealLoaded
      ) {
        // -------------------------
        // MAIN IMAGE
        // -------------------------

        mainCtx.clearRect(
          0,
          0,
          mainCanvas.width,
          mainCanvas.height
        );

        drawContain(
          mainCtx,
          mainImg,
          mainCanvas.width,
          mainCanvas.height
        );

        // -------------------------
        // MASK
        // -------------------------

        drawMask(now);

        // -------------------------
        // REMOVE MASK AREA
        // FROM MAIN IMAGE
        // -------------------------

        mainCtx.globalCompositeOperation =
          "destination-out";

        mainCtx.drawImage(
          maskCanvas,
          0,
          0
        );

        mainCtx.globalCompositeOperation =
          "source-over";

        // -------------------------
        // REVEAL IMAGE
        // -------------------------

        revealCtx.clearRect(
          0,
          0,
          revealCanvas.width,
          revealCanvas.height
        );

        drawContain(
          revealCtx,
          revealImg,
          revealCanvas.width,
          revealCanvas.height
        );

        // Reveal only inside mask
        revealCtx.globalCompositeOperation =
          "destination-in";

        revealCtx.drawImage(
          maskCanvas,
          0,
          0
        );

        revealCtx.globalCompositeOperation =
          "source-over";

        // -------------------------
        // FINAL RESULT
        // -------------------------

        ctx.drawImage(
          mainCanvas,
          0,
          0
        );

        ctx.drawImage(
          revealCanvas,
          0,
          0
        );
      }

      animationFrame =
        requestAnimationFrame(
          render
        );
    };

    // -----------------------------
    // IMAGE LOADING
    // -----------------------------

    mainImg.onload = () => {
      mainLoaded = true;
    };

    revealImg.onload = () => {
      revealLoaded = true;
    };

    mainImg.src =
      mainImage;

    revealImg.src =
      revealImage;

    // -----------------------------
    // INITIALIZE
    // -----------------------------

    resize();

    const resizeObserver =
      new ResizeObserver(
        resize
      );

    resizeObserver.observe(
      container
    );

    canvas.addEventListener(
      "pointerdown",
      handlePointerDown
    );

    canvas.addEventListener(
      "pointermove",
      handlePointerMove
    );

    canvas.addEventListener(
      "pointerup",
      handlePointerUp
    );

    canvas.addEventListener(
      "pointercancel",
      handlePointerCancel
    );

    canvas.addEventListener(
      "pointerleave",
      handlePointerLeave
    );

    animationFrame =
      requestAnimationFrame(
        render
      );

    // -----------------------------
    // CLEANUP
    // -----------------------------

    return () => {
      cancelAnimationFrame(
        animationFrame
      );

      resizeObserver.disconnect();

      canvas.removeEventListener(
        "pointerdown",
        handlePointerDown
      );

      canvas.removeEventListener(
        "pointermove",
        handlePointerMove
      );

      canvas.removeEventListener(
        "pointerup",
        handlePointerUp
      );

      canvas.removeEventListener(
        "pointercancel",
        handlePointerCancel
      );

      canvas.removeEventListener(
        "pointerleave",
        handlePointerLeave
      );
    };
  }, [
    mainImage,
    revealImage,
    brushSize,
    softness,
    holdTime,
    fadeTime,
  ]);

  return (
    <div
      ref={containerRef}
      className={
        className
      }
      style={{
        position:
          "relative",

        width,
        height,

        overflow:
          "hidden",

        background:
          "transparent",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width:
            "100%",

          height:
            "100%",

          display:
            "block",

          /*
           * Required so dragging
           * on mobile controls the
           * reveal instead of
           * scrolling the page.
           */
          touchAction:
            "none",

          userSelect:
            "none",

          WebkitUserSelect:
            "none",
        }}
      />
    </div>
  );
}