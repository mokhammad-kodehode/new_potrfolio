"use client";

import InteractiveImageCanvas from "../components/canvas/InterImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHtml5,
  faCss3Alt,
  faJsSquare,
  faReact,
  faNodeJs,
  faFigma,
  faWordpress,
  faPhp,
  faGitAlt,
} from "@fortawesome/free-brands-svg-icons";

import { faDiagramProject, faCodeBranch } from "@fortawesome/free-solid-svg-icons"; // For Power Apps and Next.js icons
import PageTransition from "../components/PageTransiction";
import { useState, useEffect } from "react";

export default function About() {

 const [isMobile, setIsMobile] = useState(false);

   useEffect(() => {
     const handleResize = () => {
       setIsMobile(window.innerWidth < 768); // Adjust breakpoint as needed
     };
   
     // Set initial state
     handleResize();
   
     // Add event listener for resize
     window.addEventListener("resize", handleResize);
   
     return () => {
       window.removeEventListener("resize", handleResize);
     };
   }, []);

  return (
    <PageTransition>
      <div className={`flex flex-col items-center justify-center min-h-screen text-white ${isMobile ? "px-4" : ""}`}>
        <div className={`flex ${isMobile ? "flex-col" : "flex-row"} items-center justify-center w-full`}>
          <div className={`${isMobile ? "w-full mb-8" : "w-1/3"}`}>
          {!isMobile && <InteractiveImageCanvas />}
          </div>
          <div className={`${isMobile ? "w-full" : "w-[680px]"} px-2 text-center`}>
            <span className="relative pl-1 pr-1 inline-block ml-2 overflow-hidden">
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white animate-border"></span>
                <span className="absolute inset-0 bg-white opacity-0 animate-fillBackground"></span>
                <h1 className={`text-6xl font-bold mb-1 leading-tight mix-blend-difference opacity-0 animate-fadeIn ${isMobile ? "text-4xl" : ""}`}>
                  ABOUT ME
                </h1>
              </span>
            <p className={`mt-4 ${isMobile ? "text-sm" : ""}`}>
              My name is Mohammad, and I am a passionate front-end developer. Since early 2023, I’ve been part of an intensive Kodehode course, where I quickly mastered full-stack development. Coding has become more than a profession for me—it’s a way of life.
            </p>
            <p className={`mt-4 ${isMobile ? "text-sm" : ""}`}>
              Previously, I was an entrepreneur with several successful projects in the service and entertainment industries, gaining valuable experience in marketing and business management. Now, I aim to combine my technical and entrepreneurial skills to create impactful projects.
            </p>
            <p className={`mt-4 ${isMobile ? "text-sm" : ""}`}>
              Outside of work, I love traveling, playing video games, spending time with my family, and cycling. I’m honest, responsible, and always motivated to grow and learn. For me, coding is about solving real problems and making life better for others.
            </p>

            {/* My Skills Section */}
            <div className="w-full mt-12">
              <div className="relative h-13 overflow-hidden">
                <div className="flex gap-8 animate-marquee-left">
                  <div className="group flex flex-col items-center">
                    <FontAwesomeIcon
                      icon={faHtml5}
                      size="2x"
                      className="text-white group-hover:scale-110 transition-transform duration-300"
                    />
                    <p className="mt-2 text-sm font-semibold">HTML5</p>
                  </div>
                  <div className="group flex flex-col items-center">
                    <FontAwesomeIcon
                      icon={faCss3Alt}
                      size="2x"
                      className="text-white group-hover:scale-110 transition-transform duration-300"
                    />
                    <p className="mt-2 text-sm font-semibold">CSS3</p>
                  </div>
                  <div className="group flex flex-col items-center">
                    <FontAwesomeIcon
                      icon={faJsSquare}
                      size="2x"
                      className="text-white group-hover:scale-110 transition-transform duration-300"
                    />
                    <p className="mt-2 text-sm font-semibold">JavaScript</p>
                  </div>
                  <div className="group flex flex-col items-center">
                    <FontAwesomeIcon
                      icon={faReact}
                      size="2x"
                      className="text-white group-hover:scale-110 transition-transform duration-300"
                    />
                    <p className="mt-2 text-sm font-semibold">React</p>
                  </div>
                  <div className="group flex flex-col items-center">
                    <FontAwesomeIcon
                      icon={faNodeJs}
                      size="2x"
                      className="text-white group-hover:scale-110 transition-transform duration-300"
                    />
                    <p className="mt-2 text-sm font-semibold">Node.js</p>
                  </div>
                  <div className="group flex flex-col items-center">
                    <FontAwesomeIcon
                      icon={faFigma}
                      size="2x"
                      className="text-white group-hover:scale-110 transition-transform duration-300"
                    />
                    <p className="mt-2 text-sm font-semibold">Figma</p>
                  </div>
                  <div className="group flex flex-col items-center">
                    <FontAwesomeIcon
                      icon={faWordpress}
                      size="2x"
                      className="text-white group-hover:scale-110 transition-transform duration-300"
                    />
                    <p className="mt-2 text-sm font-semibold">WordPress</p>
                  </div>
                  <div className="group flex flex-col items-center">
                    <FontAwesomeIcon
                      icon={faPhp}
                      size="2x"
                      className="text-white group-hover:scale-110 transition-transform duration-300"
                    />
                    <p className="mt-2 text-sm font-semibold">PHP</p>
                  </div>
                  <div className="group flex flex-col items-center">
                    <FontAwesomeIcon
                      icon={faDiagramProject}
                      size="2x"
                      className="text-white group-hover:scale-110 transition-transform duration-300"
                    />
                    <p className="mt-2 text-sm font-semibold">Power Apps</p>
                  </div>
                  <div className="group flex flex-col items-center">
                    <FontAwesomeIcon
                      icon={faCodeBranch}
                      size="2x"
                      className="text-white group-hover:scale-110 transition-transform duration-300"
                    />
                    <p className="mt-2 text-sm font-semibold">Next.js</p>
                  </div>
                  <div className="group flex flex-col items-center">
                    <FontAwesomeIcon
                      icon={faGitAlt}
                      size="2x"
                      className="text-white group-hover:scale-110 transition-transform duration-300"
                    />
                    <p className="mt-2 text-sm font-semibold">Git</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
