"use client";

import { useParams } from "next/navigation";
import projects from "@/app/data/projects";
import PageTransition from "@/app/components/PageTransiction";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import CanvasBG from "@/app/components/canvas/canvasBG";
import Link from "next/link";


export default function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((proj) => proj.id === id);
  const [showIframe, setShowIframe] = useState(false);

  if (!project) {
    return <div className="text-white text-center mt-20">Project not found!</div>;
  }

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col justify-center items-center  text-white px-6 md:px-12 py-8 md:py-16">
      <CanvasBG/>
          <div className="flex justify-center mt-7 mb-10 items-center w-full md:mb-16">
          <div className="relative pl-1 pr-1 inline-block overflow-hidden text-center">
            <span className="absolute bottom-0 left-0 w-full h-[6px] bg-white animate-border"></span>
            <span className="absolute inset-0 bg-white opacity-0 animate-fillBackground"></span>
            <h1 className="text-5xl font-bold uppercase leading-tight mix-blend-difference md:text-7xl mt-2 mb-2 md: tracking-widest">
            {project.title}
            </h1>
          </div>
        </div>

        <p className="text-base md:text-lg text-center w-full md:w-[750px] mb-8 opacity-70">
          {project.description_two}
        </p>
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {project.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-800 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white text-xl md:text-3xl mb-5 flex items-center gap-2"
        >
          <FaGithub /> GitHub
        </a>

        {/* Кнопка для открытия iframe */}
        <div className="flex gap-5 justify-center">
            <button
              onClick={() => setShowIframe(true)}
              className="px-6 py-3 bg-white text-black rounded-sm  font-bold hover:bg-gray-300 hover:rounded-lg transition-all duration-500 ease-in-out"
            >
              Open Project
            </button>
            <Link target="blank" href={project.visitLink} passHref>
              <button
                className="px-6 py-3 border border-white rounded-sm bg-black text-white  hover:bg-transparent hover:rounded-lg transition-all duration-500 ease-in-out"
              >
                Visit Page
              </button>
            </Link>
        </div>

        {/* Модальное окно с iframe */}
        {showIframe && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
            <div className="relative w-[90%] h-[85vh] md:w-[95%] md:h-[95vh] bg-white rounded-lg overflow-hidden">
              <iframe
                src={project.iframe}
                className="w-full h-full border-none"
                allowFullScreen
              ></iframe>
              <button
                onClick={() => setShowIframe(false)}
                className="absolute top-4 right-4 bg-black text-white px-4 py-2 rounded-full hover:bg-red-800 transition"
              >
                X
              </button>
            </div>
          </div>
        )}

        {/* Кнопка возврата */}
        <div className="mt-12 text-center">
          <Link href="/projects" className="text-white underline">
            ← Back to Projects
          </Link>
        </div>
      </div>
    </PageTransition>
  );
}
