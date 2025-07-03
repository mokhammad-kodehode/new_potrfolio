"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "../themeSwitcher"; // исправь путь, если нужно

export default function CanvasAnimationNew() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const rafRef = useRef<number | null>(null);
  const strokeRef = useRef<string>("#FFFFFF");
  const wavesRef = useRef<any[]>([]);

  useEffect(() => {
    if (theme === "light")  strokeRef.current = "#000000";
    if (theme === "dark")   strokeRef.current = "#FFFFFF";
    if (theme === "color")  strokeRef.current = "#FFFFFF";
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // ОПТИМИЗАЦИЯ: меньше волн + шаг
    const waveCount = 3; // (или 4, если нужно)
    const step = 4; // попробуй от 3 до 6 — чем больше, тем быстрее

    wavesRef.current = Array.from({ length: waveCount }).map((_, i) => ({
      waveHeight: 100 + Math.random() * 80,
      waveLength: 0.002 + Math.random() * 0.003,
      speed:      0.00001 + Math.random() * 0.0009,
      offset:     Math.random() * Math.PI * 2,
      frequency:  0.5 + Math.random() * 0.8,
      verticalOffset: i * 150,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      wavesRef.current.forEach((w, idx) => {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 3 + w.verticalOffset);

        for (let x = 0; x < canvas.width; x += step) {
          const yOffset =
            Math.sin(x * w.waveLength + w.offset) * w.waveHeight +
            Math.sin(x * w.waveLength * w.frequency + w.offset * 2) * (w.waveHeight / 3);
          ctx.lineTo(x, canvas.height / 3 + w.verticalOffset + yOffset);
        }

        ctx.strokeStyle = strokeRef.current;
        ctx.globalAlpha = 0.9 + idx * 0.05;
        ctx.lineWidth = 3.5 + idx * 0.5;
        ctx.stroke();
        ctx.globalAlpha = 1;

        w.offset += w.speed;
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute bottom-0 left-0 opacity-[0.1] w-full h-full"
    />
  );
}
