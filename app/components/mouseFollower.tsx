"use client";
import React, { useState, useEffect, useRef } from "react";

export default function MouseFollower() {
  const [isVisible, setIsVisible] = useState(false);
  const mousePosition = useRef({ x: 0, y: 0 });
  const smoothPosition = useRef({ x: 0, y: 0 });
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const animationFrameId = useRef<number | null>(null); // Используем useRef

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const animate = () => {
      smoothPosition.current.x += (mousePosition.current.x - smoothPosition.current.x) * 0.2;
      smoothPosition.current.y += (mousePosition.current.y - smoothPosition.current.y) * 0.2;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${smoothPosition.current.x - 12}px, ${smoothPosition.current.y - 12}px)`;
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed w-6 h-6 bg-white rounded-full opacity-90 mix-blend-difference z-[9999] transition-transform duration-200 ease-out"
      style={{
        transform: isVisible ? "scale(1)" : "scale(0.5)",
        opacity: isVisible ? 1 : 0,
      }}
    />
  );
}
