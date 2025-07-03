"use client";

import { useEffect, useRef } from "react";
import "./canvasInter.css";
import { useTheme } from "../themeSwitcher";   /* путь поправь, если другой */

interface ParticleProps {
  x: number;
  y: number;
  size: number;
  baseX: number;
  baseY: number;
  density: number;
}

class Particle implements ParticleProps {
  x: number;
  y: number;
  size: number;
  baseX: number;
  baseY: number;
  density: number;

  constructor(x: number, y: number) {
    this.x = x + 200;
    this.y = y - 100;
    this.size = 8;
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = Math.random() * 20 + 1;
  }

  draw(ctx: CanvasRenderingContext2D, color: string) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }

  update(mouse: { x: number | null; y: number | null; radius: number }) {
    if (mouse.x === null || mouse.y === null) return;

    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const force = (mouse.radius - distance) / mouse.radius;

    if (distance < mouse.radius + this.size) {
      const dirX = (dx / distance) * force * this.density;
      const dirY = (dy / distance) * force * this.density;
      this.x -= dirX;
      this.y -= dirY;
    } else {
      if (this.x !== this.baseX) this.x -= (this.x - this.baseX) / 10;
      if (this.y !== this.baseY) this.y -= (this.y - this.baseY) / 10;
    }
  }
}

export default function InteractiveCanvas() {
  const { theme } = useTheme();                       // ← текущая тема
  const canvasRef           = useRef<HTMLCanvasElement>(null);
  const particlesRef        = useRef<Particle[]>([]);
  const mouseRef            = useRef({ x: null as number | null, y: null as number | null, radius: 150 });
  const animationRef        = useRef<number | null>(null);
  const isAnimatingRef      = useRef(false);
  const particleColorRef    = useRef<string>("white"); // будет обновляться при смене темы

  /* ───────── Цвет частиц реагирует на смену темы ───────── */
  useEffect(() => {
    if (theme === "light")  particleColorRef.current = "black";
    if (theme === "dark")   particleColorRef.current = "white";
    if (theme === "color")  particleColorRef.current = "#00ffff";
  }, [theme]);

  /* ───────── Canvas lifecycle ───────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    /* resize + (re)init */
    const setCanvasSize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    /* генерируем частицы по тексту */
    const initParticles = () => {
      particlesRef.current = [];
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = "bold 16px Verdana";
      ctx.fillText("MOHAMMAD", 5, 30);
      const data = ctx.getImageData(0, 0, canvas.width, 100);

      const adjustX = -10, adjustY = -7;
      for (let y = 0; y < data.height; y++) {
        for (let x = 0; x < data.width; x++) {
          if (data.data[(y * 4 * data.width) + (x * 4) + 3] > 128) {
            particlesRef.current.push(
              new Particle((x + adjustX) * 15, (y + adjustY) * 15)
            );
          }
        }
      }
    };

    /* основной цикл */
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particlesRef.current) {
        p.update(mouseRef.current);
        p.draw(ctx, particleColorRef.current);  // ← цвет берём из ref
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    const start = () => {
      if (!isAnimatingRef.current) {
        isAnimatingRef.current = true;
        animate();
      }
    };
    const stop = () => {
      if (isAnimatingRef.current) {
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
        isAnimatingRef.current = false;
      }
    };

    /* IntersectionObserver — пауза при скролле */
    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? start() : stop()),
      { threshold: 0.1 }
    );
    io.observe(canvas);

    /* events */
    const move = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouseRef.current.x = (e.clientX - r.left) * (canvas.width  / r.width);
      mouseRef.current.y = (e.clientY - r.top)  * (canvas.height / r.height);
    };
    const debounce = (fn: () => void, ms: number) => {
      let id: NodeJS.Timeout;
      return () => { clearTimeout(id); id = setTimeout(fn, ms); };
    };
    const resize = debounce(setCanvasSize, 120);

    window.addEventListener("mousemove", move);
    window.addEventListener("resize", resize);
    setCanvasSize(); // init

    /* cleanup */
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("resize", resize);
      stop();
      io.disconnect();
      particlesRef.current = [];
    };
  }, []);

  return <canvas ref={canvasRef} className="canvas" />;
}
