"use client";
import { useEffect, useRef } from "react";

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
    this.x = x;
    this.y = y;
    this.size = 3; // Увеличим размер частиц для лучшей видимости
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = Math.random() * 30 + 1;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)"
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }

  update(mouse: { x: number | null; y: number | null; radius: number }) {
    if (!mouse.x || !mouse.y) return;

    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const force = (mouse.radius - distance) / mouse.radius;
    const directionX = (dx / distance) * force * this.density;
    const directionY = (dy / distance) * force * this.density;

    if (distance < mouse.radius + this.size) {
      this.x -= directionX;
      this.y -= directionY;
    } else {
      if (this.x !== this.baseX) this.x -= (this.x - this.baseX) / 10;
      if (this.y !== this.baseY) this.y -= (this.y - this.baseY) / 10;
    }
  }
}

const InteractiveImageCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: null as number | null, y: null as number | null, radius: 150 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) {
      console.error("2D context not available");
      return;
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;



    // Load and render the SVG
    const svg = new Image();
    svg.src = "/Photo.svg"; // Убедитесь, что путь к SVG корректный
    svg.onload = () => {
      // Очищаем canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    
      const svgWidth = 700; // Ширина изображения
      const svgHeight = 700; // Высота изображения
    
      // Отрисовка SVG на canvas
      ctx.drawImage(svg, canvas.width / 3 - svgWidth / 2, canvas.height / 2 - svgHeight / 2, svgWidth, svgHeight);
    
      // Очищаем массив частиц
      particlesRef.current = [];
    
      // Извлечение данных пикселей
      const imageData = ctx.getImageData(
        canvas.width / 3 - svgWidth / 2,
        canvas.height / 2 - svgHeight / 2,
        svgWidth,
        svgHeight
      );
    
      for (let y = 0; y < imageData.height; y += 5) {
        for (let x = 0; x < imageData.width; x += 5) {
          const r = imageData.data[(y * 4 * imageData.width) + (x * 4)];
          const g = imageData.data[(y * 4 * imageData.width) + (x * 4) + 1];
          const b = imageData.data[(y * 4 * imageData.width) + (x * 4) + 2];
          const alpha = (r + g + b) / 3;
          if (alpha > 146) {
            const posX = canvas.width / 3 - svgWidth / 2 + x;
            const posY = canvas.height / 2 - svgHeight / 2 + y;
            particlesRef.current.push(new Particle(posX, posY));
          }
        }
      }
    
      // Запускаем анимацию
      animate();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const particle of particlesRef.current) {
        particle.update(mouseRef.current);
        particle.draw(ctx);
      }

      requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      mouseRef.current.x = (e.clientX - rect.left) * scaleX;
      mouseRef.current.y = (e.clientY - rect.top) * scaleY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: "block",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: "-1",
      }}
    />
  );
};

export default InteractiveImageCanvas;
