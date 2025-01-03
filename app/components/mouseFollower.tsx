"use client";
import React, { useState, useEffect } from "react";

export default function MouseFollower() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
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

  // Smooth animation with requestAnimationFrame and proper cleanup
  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      setSmoothPosition((prev) => ({
        x: prev.x + (mousePosition.x - prev.x) * 0.1,
        y: prev.y + (mousePosition.y - prev.y) * 0.1,
      }));
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [mousePosition]); // Only update when mouse moves

  return (
    <div
      className="pointer-events-none fixed w-6 h-6 bg-white rounded-full opacity-90 mix-blend-difference z-[9999]"
      style={{
        top: `${smoothPosition.y - 12}px`,
        left: `${smoothPosition.x - 12}px`,
        transform: isVisible ? "scale(1)" : "scale(0.5)",
        transition: "transform 0.2s ease-out, opacity 0.2s ease-out",
      }}
    />
  );
}
