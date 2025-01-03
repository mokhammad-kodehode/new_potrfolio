"use client";
import { useEffect, useRef } from "react";
import "./canvasInter.css";

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
  
    draw(ctx: CanvasRenderingContext2D) {
      ctx.fillStyle = "white";
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

const InteractiveCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: null as number | null, y: null as number | null, radius: 150 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error("2D context not available");
      return;
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const adjustX = -10;
    const adjustY = -7;
    const particleArray: Particle[] = [];

    // Mouse move event
    const handleMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
    
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width; // Коэффициент масштабирования по ширине
      const scaleY = canvas.height / rect.height; // Коэффициент масштабирования по высоте
    
      mouseRef.current.x = (e.clientX - rect.left) * scaleX;
      mouseRef.current.y = (e.clientY - rect.top) * scaleY;
    };

    // Initialize particles
    ctx.font = "bold 16px Verdana";
    ctx.fillText("MOHAMMAD", 5, 30);
    const data = ctx.getImageData(0, 0, canvas.width, 100);

    for (let y = 0; y < data.height; y++) {
      for (let x = 0; x < data.width; x++) {
        if (data.data[(y * 4 * data.width) + (x * 4) + 3] > 128) {
          const positionX = x + adjustX;
          const positionY = y + adjustY;
          particleArray.push(new Particle(positionX * 15, positionY * 15));
        }
      }
    }
    particlesRef.current = particleArray;

    // Animate particles
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const particle of particlesRef.current) {
        particle.update(mouseRef.current);
        particle.draw(ctx);
      }

      requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return <canvas ref={canvasRef} className="canvas" />;
};

export default InteractiveCanvas;