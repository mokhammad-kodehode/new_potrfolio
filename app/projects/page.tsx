"use client";

import { useState } from "react";
import PageTransition from "../components/PageTransiction";
import Image from "next/image";


const projects = [
  {
    title: "Serenity Sounds",
    description: "Serenity Sounds is an interactive web application that I have designed to offer users an immersive experience with the soothing sounds of nature.",
    tags: ["Web application", "Next.js", "HTML", "TypeScript", "CSS"],
    image: "/serenity.png",
    link: "https://re-noise-my.vercel.app/soundPage",
  },
  {
    title: "TRAVEL AND STUDY",
    description: "Travel and Study provides opportunities for cultural immersion and learning.",
    tags: ["Design", "Development", "eCommerce", "Strategy"],
    image: "/travel.png",
    link: "https://www.travelandstudy.ru/",
  },
];

export default function Projects() {
  const [iframeUrl, setIframeUrl] = useState<string | null>(null);

  const handleProjectClick = (url: string) => {
    setIframeUrl(url);
  };

  const closeIframe = () => {
    setIframeUrl(null);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-black text-white px-12 py-8 md:py-16">
        <h1 className="text-5xl md:text-8xl font-bold text-center mt-8 mb-8 md:mb-16 tracking-widest">
          PROJECTS
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-16">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative bg-black overflow-hidden shadow-lg cursor-pointer transition-colors duration-300 hover:bg-white"
              onClick={() => handleProjectClick(project.link)}
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
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-black text-white group-hover:bg-white group-hover:text-black rounded-full">
                    <span className="font-bold text-xs sm:text-sm text-center">
                      View Project
                    </span>
                  </div>
                </div>
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
          ))}
        </div>
        {/* Iframe Modal */}
        {iframeUrl && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
            
            <div className="relative w-full max-w-7xl h-[90vh] bg-white rounded-lg overflow-hidden">
              <iframe
                src={iframeUrl}
                className="w-full h-full border-none"
                allowFullScreen
              ></iframe>
              <button
                onClick={closeIframe}
                className="absolute top-2 right-2 bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-800 transition"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
