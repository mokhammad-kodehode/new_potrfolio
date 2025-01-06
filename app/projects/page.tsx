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
  const [visibleProjects, setVisibleProjects] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll(".project-image");
    
      elements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        
        // Check if the element belongs to the second or third row
        const isSecondOrThirdRow = index >= 3 && index < 9; 
  
        if (rect.top < window.innerHeight * 0.75 && isSecondOrThirdRow) {
          element.classList.add("animate-scaleOut");
        } else {
          element.classList.remove("animate-scaleOut");
        }
      });
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  useEffect(() => {
   
    const delayAnimation = () => {
      projects.forEach((_, index) => {
        setTimeout(() => {
          setVisibleProjects((prev) => prev + 1);
        }, index * 300); 
      });
    };
    delayAnimation();
  }, []);

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
      <div className="min-h-screen  text-white px-12 py-8 md:py-16 relative">
        {/* Centered Title Section */}
        <div className="flex justify-center mt-7 mb-10 items-center w-full md:mb-16">
          <div className="relative pl-1 pr-1 inline-block overflow-hidden text-center">
            <span className="absolute bottom-0 left-0 w-full h-[6px] bg-white animate-border"></span>
            <span className="absolute inset-0 bg-white opacity-0 animate-fillBackground"></span>
            <h1 className="text-5xl mix-blend-difference md:text-8xl font-bold mt-2 mb-2 md: tracking-widest">
              PROJECTS
            </h1>
          </div>
        </div>
        {/* Project Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-16 md:px-[150px]">
          {projects.map((project, index) => (
            <Link href={project.link} key={index} passHref>
              <div
                className={`group relative bg-black w-full bg- overflow-hidden   cursor-pointer transition-all duration-700 transform hover:bg-white ${
                  visibleProjects > index
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="relative w-full overflow-hidden h-[320px] sm:h-[400px] md:h-[540px]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    style={{ objectFit: "cover" }}
                    className=" project-image   animate-scaleOut"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60 group-hover:opacity-10"></div>
                </div>
                <div className="relative   text-[#BFBFBF] p-4 text-center transition-all duration-500">
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
            className="fixed flex items-center justify-center bg-black text-black rounded-full pointer-events-none transition-transform duration-300 ease-out z-[1000] "
            style={{
              top: `${smoothPosition.y - circleSize / 2}px`,
              left: `${smoothPosition.x - circleSize / 2}px`,
              width: `${circleSize}px`,
              height: `${circleSize}px`,
              transform: `scale(${hoveredIndex !== null ? 1 : 0.5})`,
              opacity: hoveredIndex !== null ? 1 : 0,
            }}
          >
            <span className="text-xs text-white font-bold">View Project</span>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
