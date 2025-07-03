"use client";
import { useEffect, useRef } from "react";

/* ───────── настройки ───────── */
const STEP = 6;
const PHOTO_SIZE = 650;
const BASE_SIZE = 2;
const JITTER_POS = 1;
const JITTER_SIZE = 1;
const TARGET_FPS = 30;
const MOUSE_R = 240;
const BRIGHT_K = 1.4;
const CONTRAST = 30;
const BURST_FORCE = 6;

/* ───────── типы / класс ───────── */
type Mouse = { x: number | null; y: number | null };

class Particle {
  x: number; y: number; baseX: number; baseY: number;
  vx = 0; vy = 0; size: number; color: string; alpha = 1;

  constructor(x: number, y: number, color: string, size: number) {
    this.x = this.baseX = x;
    this.y = this.baseY = y;
    this.size = size;
    this.color = color;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  update(mouse: Mouse) {
    if (mouse.x != null && mouse.y != null) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.hypot(dx, dy);

      if (dist < MOUSE_R) {
        const f = (MOUSE_R - dist) / MOUSE_R;
        const angle = Math.atan2(dy, dx);
        this.vx -= Math.cos(angle) * f * 2;
        this.vy -= Math.sin(angle) * f * 2;
        this.alpha = 1; // вспышка
      }
    }

    /* трение + возврат */
    this.vx *= 0.92;
    this.vy *= 0.92;
    this.x += this.vx;
    this.y += this.vy;
    const dx0 = this.x - this.baseX;
    const dy0 = this.y - this.baseY;
    this.vx -= dx0 * 0.02;
    this.vy -= dy0 * 0.02;

    /* лёгкое затухание */
    if (Math.abs(this.vx) + Math.abs(this.vy) < 0.5) {
      this.alpha = Math.max(0.25, this.alpha - 0.02);
    }
  }

  burst(cx: number, cy: number) {
    const dx = this.x - cx;
    const dy = this.y - cy;
    const d = Math.hypot(dx, dy) || 1;
    const k = BURST_FORCE * (0.6 + Math.random() * 0.4);
    this.vx += (dx / d) * k;
    this.vy += (dy / d) * k;
    this.alpha = 1;
  }
}

/* ───────── компонент ───────── */
export default function InteractiveImageCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const partsRef = useRef<Particle[]>([]);
  const mouseRef = useRef<Mouse>({ x: null, y: null });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    /* ---------- генерация частиц ---------- */
    const build = () => {
      partsRef.current = [];

      const img = new Image();
      img.src = "/Photo.svg";
      img.onload = () => {
        const W = PHOTO_SIZE;
        const H = PHOTO_SIZE;
        const x0 = canvas.width / 3 - W / 2;
        const y0 = canvas.height / 2 - H / 2;

        ctx.drawImage(img, x0, y0, W, H);
        const data = ctx.getImageData(x0, y0, W, H);

        for (let y = 0; y < data.height; y += STEP) {
          for (let x = 0; x < data.width; x += STEP) {
            const idx = (y * 4 * data.width) + x * 4;
            const a = data.data[idx + 3];
            if (a < 40) continue;

            let r = data.data[idx] * BRIGHT_K + CONTRAST;
            let g = data.data[idx + 1] * BRIGHT_K + CONTRAST;
            let b = data.data[idx + 2] * BRIGHT_K + CONTRAST;
            r = Math.min(255, r);
            g = Math.min(255, g);
            b = Math.min(255, b);

            const jx = (Math.random() * 2 - 1) * JITTER_POS;
            const jy = (Math.random() * 2 - 1) * JITTER_POS;
            const size = BASE_SIZE + Math.random() * JITTER_SIZE;

            partsRef.current.push(
              new Particle(x0 + x + jx, y0 + y + jy, `rgb(${r},${g},${b})`, size)
            );
          }
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        loop(performance.now());
      };
    };

    /* ---------- throttle-loop ---------- */
    let prev = 0;
    const loop = (t: number) => {
      if (t - prev > 1000 / TARGET_FPS) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        /* glow-режим */
        ctx.globalCompositeOperation = "lighter";
        partsRef.current.forEach(p => {
          p.update(mouseRef.current);
          p.draw(ctx);
        });
        ctx.globalCompositeOperation = "source-over";

        prev = t;
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    /* ---------- events ---------- */
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = (e.clientX - rect.left) * canvas.width / rect.width;
      mouseRef.current.y = (e.clientY - rect.top) * canvas.height / rect.height;
    };

    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const cx = (e.clientX - rect.left) * canvas.width / rect.width;
      const cy = (e.clientY - rect.top) * canvas.height / rect.height;
      partsRef.current.forEach(p => p.burst(cx, cy));
    };

    const resize = () => {
      canvas.width = innerWidth;
      canvas.height = innerHeight;
      build();
    };

    /* IntersectionObserver — пауза */
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!rafRef.current) rafRef.current = requestAnimationFrame(loop);
        } else if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
      },
      { threshold: 0.05 }
    );
    io.observe(canvas);

    /* init */
    resize();
    window.addEventListener("mousemove", onMove);
    window.addEventListener("click", onClick);
    window.addEventListener("resize", resize);

    /* cleanup */
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
      window.removeEventListener("resize", resize);
      io.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      partsRef.current = [];
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
        zIndex: -1,
      }}
    />
  );
}
