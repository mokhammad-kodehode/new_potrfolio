"use client";
import { useEffect, useRef } from "react";
import "./canvas.css";

interface CanvasProps {
  activeIndex: number; // Active element index
}

const CanvasAnimation = ({ activeIndex }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) {
      console.error("Canvas not found!");
      return;
    }

    const $ = c.getContext("2d");
    if (!$) {
      console.error("2D context not found!");
      return;
    }

    let w = (c.width = window.innerWidth);
    let h = (c.height = window.innerHeight);
    let t = 0; // Time for animation
    const num = 850;
    const _t = 1 / 60;
    let x = 0,
      y = 0,
      _x = 0,
      _y = 0;

    const getRadius = () => {
      switch (activeIndex) {
        case 0:
          return 1.5;
        case 1:
          return 2;
        case 2:
          return 2.5;
        case 3:
          return 3;
        default:
          return 1.5;
      }
    };

    const anim = () => {
      $.globalCompositeOperation = "source-over";
      $.clearRect(0, 0, w, h);
      $.globalCompositeOperation = "lighter";

      for (let i = 0; i < 1; i++) {
        x = 0;
        let b = 0;
        $.beginPath();

        for (let j = 0; j < num; j++) {
          x -= 0.312 * Math.sin(1);
          y = x * Math.sin(i + 2.5 * t + x / 7) / 9;

          b = (j * 9 * Math.PI) / 20;
          _x = x * Math.cos(b) - y * Math.sin(b);
          _y = x * Math.sin(b) + y * Math.cos(b);

          const radius = getRadius();

          if (!isNaN(_x) && !isNaN(_y)) {
            // Draw shape border only
            $.strokeStyle = "white";
            $.lineWidth = 1;
            $.beginPath();
            $.arc(w / 2 - _x, h / 2 - _y, radius, 0, Math.PI * 2);
            $.stroke();
          }
        }
      }
      t += _t;
      window.requestAnimationFrame(anim);
    };

    anim();

    const handleResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      c.width = w;
      c.height = h;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [activeIndex]);

  return <canvas ref={canvasRef} className="canvasone" />;
};

export default CanvasAnimation;
