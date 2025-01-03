"use client";

import { useState, useEffect } from "react";
import PageTransition from "../components/PageTransiction";
import Image from "next/image";
import Link from "next/link";
import projects from "../data/projects";

export default function Projects() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [circleSize, setCircleSize] = useState(48);

  const handleMouseMove = (e: React.MouseEvent, index: number) => {
    setHoveredIndex(index);
    setMousePosition({ x: e.clientX, y: e.clientY });
    setCircleSize(80);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setCircleSize(48);
  };

  // Smooth circle movement using requestAnimationFrame
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
  }, [mousePosition]); 

  return (
    <PageTransition>
      <div className="min-h-screen bg-black text-white px-12 py-8 md:py-16 relative">
        <h1 className="text-5xl md:text-8xl font-bold text-center mt-8 mb-8 md:mb-16 tracking-widest">
          PROJECTS
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-16 md:px-[150px]">
          {projects.map((project, index) => (
            <Link href={project.link} key={index} passHref>
              <div
                className="group relative w-full bg-black overflow-hidden shadow-lg cursor-pointer transition-colors duration-300 hover:bg-white"
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="relative w-full h-[320px] sm:h-[400px] md:h-[540px]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    layout="fill"
                    objectFit="cover"
                    className="group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60 group-hover:opacity-10"></div>
                </div>
                <div className="relative text-[#BFBFBF] p-4 text-center transition-all duration-500">
                  <h2 className="text-base sm:text-lg md:text-xl font-bold uppercase mb-1 sm:mb-2 group-hover:text-black">
                    {project.title}
                  </h2>
                  <p className="text-xs sm:text-sm md:text-base mb-2 sm:mb-4 group-hover:text-black">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="inline-block text-[10px] sm:text-xs font-medium bg-gray-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full transition-colors duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Expanding Moving Circle with Smooth Animation */}
        {hoveredIndex !== null && (
          <div
            className="fixed flex items-center justify-center bg-white text-black rounded-full pointer-events-none transition-transform duration-300 ease-out z-[1000] mix-blend-difference"
            style={{
              top: `${smoothPosition.y - circleSize / 2}px`,
              left: `${smoothPosition.x - circleSize / 2}px`,
              width: `${circleSize}px`,
              height: `${circleSize}px`,
              transform: `scale(${hoveredIndex !== null ? 1 : 0.5})`,
              opacity: hoveredIndex !== null ? 1 : 0,
            }}
          >
            <span className="text-xs font-bold">View Project</span>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
