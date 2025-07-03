"use client";

import { useEffect, useRef } from "react";
import "./canvasInter.css";
import { useTheme } from "../themeSwitcher";

/* ────────── класс частицы ────────── */
class Particle {
  x: number; y: number; size = 8;
  baseX: number; baseY: number; density: number;
  /* временный цвет-вспышка */
  flashColor: string | null = null;
  flashLife = 0;

  constructor(x: number, y: number) {
    this.x = x + 200;
    this.y = y - 100;
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = Math.random() * 20 + 1;  // ← старая “масса”
  }

  draw(ctx: CanvasRenderingContext2D, baseColor: string) {
    ctx.fillStyle = this.flashColor ?? baseColor;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }

  update(mouse: { x: number | null; y: number | null; radius: number }) {
    /* старая «магия» вокруг курсора */
    if (mouse.x != null && mouse.y != null) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.hypot(dx, dy);
      if (dist < mouse.radius + this.size) {
        const f = (mouse.radius - dist) / mouse.radius;
        this.x -= (dx / dist) * f * this.density;
        this.y -= (dy / dist) * f * this.density;
      }
    }
    /* возврат к исходной позиции */
    this.x -= (this.x - this.baseX) / 10;
    this.y -= (this.y - this.baseY) / 10;

    /* затухание вспышки */
    if (this.flashLife > 0 && --this.flashLife === 0) this.flashColor = null;
  }

  /** импульс + случайная подсветка */
  burst(cx: number, cy: number) {
    const dx = this.x - cx, dy = this.y - cy, d = Math.hypot(dx, dy) || 1;
    const k = 6;                    // сила разлёта
    this.x += (dx / d) * k;
    this.y += (dy / d) * k;

    /* 25 % точек становятся цветными */
    if (Math.random() < 0.25) {
      const hue = Math.floor(Math.random() * 360);
      this.flashColor = `hsl(${hue} 100% 60%)`;
      this.flashLife = 40;          // ≈ 0.7 с при 60 fps
    }
  }
}

/* ────────── компонент ────────── */
export default function InteractiveCanvas() {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouse = useRef({ x: null as number | null, y: null as number | null, radius: 150 });
  const rafRef = useRef<number | null>(null);
  const baseColor = useRef("white");

  /* цвет зависит от темы */
  useEffect(() => {
    baseColor.current =
      theme === "light" ? "black" : theme === "color" ? "#FEC342" : "white";
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    /* ── создаём частицы из текста ── */
    const build = () => {
      particlesRef.current = [];
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = "bold 16px Verdana";
      ctx.fillText("MOHAMMAD", 5, 30);
      const data = ctx.getImageData(0, 0, canvas.width, 100);
      const ax = -10, ay = -7;

      for (let y = 0; y < data.height; y++) {
        for (let x = 0; x < data.width; x++) {
          if (data.data[(y * 4 * data.width) + x * 4 + 3] > 128) {
            particlesRef.current.push(
              new Particle((x + ax) * 15, (y + ay) * 15)
            );
          }
        }
      }
    };

    /* ── рендер-цикл ── */
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const col = baseColor.current;
      particlesRef.current.forEach(p => {
        p.update(mouse.current);
        p.draw(ctx, col);
      });
      rafRef.current = requestAnimationFrame(draw);
    };

    /* ── helpers ── */
    const resize = () => {
      canvas.width = innerWidth;
      canvas.height = innerHeight;
      build();
    };
    const getPos = (clientX: number, clientY: number) => {
      const r = canvas.getBoundingClientRect();
      return {
        x: (clientX - r.left) * canvas.width / r.width,
        y: (clientY - r.top) * canvas.height / r.height,
      };
    };

    /* ── события ── */
    const move = (e: MouseEvent) => {
      Object.assign(mouse.current, getPos(e.clientX, e.clientY));
    };
    const click = (e: MouseEvent) => {
      const { x: cx, y: cy } = getPos(e.clientX, e.clientY);
      particlesRef.current.forEach(p => p.burst(cx, cy));
    };
    const tap = (e: TouchEvent) => {
      if (e.touches.length) {
        const { clientX, clientY } = e.touches[0];
        const { x: cx, y: cy } = getPos(clientX, clientY);
        particlesRef.current.forEach(p => p.burst(cx, cy));
      }
    };

    /* ── старт ── */
    resize();

    /* пауза, если блока не видно */
    const io = new IntersectionObserver(
      ([ent]) =>
        ent.isIntersecting
          ? (rafRef.current ??= requestAnimationFrame(draw))
          : (rafRef.current && (cancelAnimationFrame(rafRef.current), rafRef.current = null)),
      { threshold: 0.1 }
    );
    io.observe(canvas);

    window.addEventListener("mousemove", move);
    window.addEventListener("click", click);
    window.addEventListener("touchstart", tap, { passive: true });
    window.addEventListener("resize", resize);

    /* ── cleanup ── */
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("click", click);
      window.removeEventListener("touchstart", tap);
      window.removeEventListener("resize", resize);
      io.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="canvas" />;
}
