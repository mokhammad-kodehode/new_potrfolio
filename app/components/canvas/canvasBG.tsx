"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "../themeSwitcher";

interface Shape {
  x: number;
  y: number;
  radius: number;
  offset: number;
  speed: number;
}

const CanvasBG: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();
  const baseColor = useRef("white");

  useEffect(() => {
    baseColor.current =
      theme === "light" ? "black" : theme === "color" ? "#FEC342" : "white";
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const mouse = { x: 0, y: 0, radius: 150 };

    const shapes: Shape[] = [
      {
        x: canvas.width / 5,
        y: canvas.height / 5,
        radius: 220,
        offset: Math.PI / 15,
        speed: 0.005,
      },
      {
        x: canvas.width / 3,
        y: canvas.height / 1.2,
        radius: 120,
        offset: Math.PI / 3,
        speed: 0.01,
      },
      {
        x: (canvas.width * 3) / 4,
        y: (canvas.height * 2) / 3,
        radius: 180,
        offset: Math.PI / 3,
        speed: 0.015,
      },
    ];

    const drawShape = (shape: Shape) => {
      ctx.beginPath();
      for (let angle = 0; angle <= Math.PI * 2; angle += Math.PI / 36) {
        const distanceX = shape.x + Math.cos(angle) * shape.radius - mouse.x;
        const distanceY = shape.y + Math.sin(angle) * shape.radius - mouse.y;
        const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

        const interaction =
          distance < mouse.radius
            ? Math.sin(angle * 3 + shape.offset) * 10 + (mouse.radius - distance) * 0.2
            : Math.sin(angle * 3 + shape.offset) * 10;

        const x = shape.x + Math.cos(angle) * (shape.radius + interaction);
        const y = shape.y + Math.sin(angle) * (shape.radius + interaction);

        if (angle === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.closePath();
      ctx.lineWidth = 3;
      ctx.strokeStyle = baseColor.current;
      ctx.stroke();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      shapes.forEach((shape) => {
        shape.offset += shape.speed;
        shape.y += Math.sin(shape.offset) * 0.5;
        drawShape(shape);
      });

      requestAnimationFrame(animate);
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    };

    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: "block",
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: "-1",
      }}
    />
  );
};

export default CanvasBG;
