"use client";

import InteractiveCanvas from "./components/canvas/interactiveCanvas";
import CanvasAnimationNew from "./components/canvas/canvasLines";
import PageTransition from "./components/PageTransiction";
import { useEffect, useState } from "react";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isCurrentlyMobile = window.innerWidth < 768;
      if (isMobile !== isCurrentlyMobile) {
        setIsMobile(isCurrentlyMobile);
      }
    };

    // Set initial state
    handleResize();

    // Add event listener for resize
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  const renderContent = () => {
    if (isMobile) {
      return (
        <span className="relative px-1 inline-block ml-2 overflow-hidden">
          <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white animate-border"></span>
          <span className="absolute inset-0 bg-white opacity-0 animate-fillBackground"></span>
          <h1 className="text-6xl font-bold mb-1 leading-tight mix-blend-difference opacity-0 animate-fadeIn">
            Mohammad
          </h1>
        </span>
      );
    }
    return <InteractiveCanvas />;
  };

  return (
    <PageTransition>
      <div className="flex flex-col items-center justify-center min-h-screen text-center text-white">
        <CanvasAnimationNew />
        <h1 className="text-4xl mix-blend-difference font-bold mb-2">Hi. I&apos;m</h1>
        <div className={`w-full ${isMobile ? "h-auto" : "h-32"} max-w-4xl`}>
          {renderContent()}
        </div>
        <div className="max-w-3xl text-lg leading-relaxed mt-6">
          <p className="mb-6 opacity-70 text-[--text-color] text-sm px-2 md:text-[20px] leading-[1.8]">
          I am a passionate and innovative front-end developer, driven by creativity and determination to deliver exceptional digital experiences. With a sharp eye for detail and a commitment to excellence, I bring a unique perspective and tailored approach to every project. My goal is to craft user-friendly and visually stunning solutions that elevate your brand and exceed expectations.
          </p>
          <div className="text-center">
            <h2 className="text-2xl mix-blend-difference font-semibold mb-4">
              Front-end web
              <span className="relative px-1 inline-block ml-2 overflow-hidden">
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white animate-border"></span>
                <span className="relative text-lg font-normal z-10 mix-blend-difference opacity-0 animate-fadeIn">
                  developer
                </span>
              </span>
            </h2>
            <h2 className="text-2xl mix-blend-difference font-semibold mb-4">
              UI/UX
              <span className="relative px-1 inline-block ml-2 overflow-hidden">
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white animate-border"></span>
                <span className="relative  fadeIn text-lg font-normal z-10 mix-blend-difference opacity-0 animate-fadeIn">
                  designer
                </span>
              </span>
            </h2>
            <h2 className="text-2xl mix-blend-difference font-semibold">
              Programmer and
              <span className="relative px-1 inline-block ml-2 overflow-hidden">
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white animate-border"></span>
                <span className="relative text-lg font-normal z-10 mix-blend-difference opacity-0 animate-fadeIn">
                  friendly guy
                </span>
              </span>
            </h2>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
