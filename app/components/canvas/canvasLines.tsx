"use client";
import { useEffect, useRef } from "react";

const CanvasAnimationNew = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");

        if (!canvas || !ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const waveCount = 5;
        const waves = Array.from({ length: waveCount }).map((_, index) => ({
            waveHeight: Math.random() * 80 + 100,  // Increased height for bigger curves
            waveLength: Math.random() * 0.003 + 0.002, // Stretched wave length for smoother curves
            speed: Math.random() * 0.0009 + 0.00001,  // Slowed down movement
            offset: Math.random() * Math.PI * 2,
            frequency: Math.random() * 0.8 + 0.5, // Reduced frequency for slower secondary waves
            verticalOffset: index * 150, // Bigger distance between lines
        }));

        const drawWaves = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            waves.forEach((wave, index) => {
                ctx.beginPath();
                ctx.moveTo(0, canvas.height / 3 + wave.verticalOffset);

                for (let i = 0; i < canvas.width; i++) {
                    const yOffset =
                        Math.sin(i * wave.waveLength + wave.offset) * wave.waveHeight +
                        Math.sin(i * wave.waveLength * wave.frequency + wave.offset * 2) * (wave.waveHeight / 3); 
                    ctx.lineTo(i, canvas.height / 3 + wave.verticalOffset + yOffset);
                }

                ctx.strokeStyle = `rgba(255, 255, 255, ${.9 + index * 0.05})`;
                ctx.lineWidth = 3.5 + index * 0.5;
                ctx.stroke();

                wave.offset += wave.speed;
            });

            requestAnimationFrame(drawWaves);
        };

        drawWaves();
    }, []);

    return <canvas ref={canvasRef} className="absolute bottom-0 left-0 opacity-[0.08] w-full h-full" />;
};

export default CanvasAnimationNew;
