"use client";

import { useParams } from "next/navigation";
import projects from "@/app/data/projects";
import { useState, useEffect } from "react";
import { FaGithub } from "react-icons/fa";
import dynamic from "next/dynamic"; 
import Link from "next/link";
import { useRef } from "react";

  const CanvasBG = dynamic(() => import("@/app/components/canvas/canvasBG"), {
  ssr: false,
  loading: () => <div className="sr-only">Loading background…</div>,
});


export default function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((proj) => proj.id === id);
  const [showIframe, setShowIframe] = useState(false);
  const [isMobile, setIsMobile] = useState(false);



// Ленивый загрузчик канваса с сохранением положения
function LazyCanvasBG() {
  const [show, setShow] = useState(false);
  const holderRef = useRef<HTMLDivElement>(null); // вот это обязательно

  useEffect(() => {
    const el = holderRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return <div ref={holderRef}>{show && <CanvasBG />}</div>;
}

  
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
  if (!project) {
    return <div className="text-white text-center mt-20">Project not found!</div>;
  }

  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center  text-white px-6 md:px-12 py-8 md:py-16">
      {!isMobile && (
      <div className="absolute inset-0 -z-10 w-full h-full">
        <LazyCanvasBG />
      </div>
    )}
          <div className="flex justify-center mt-7 mb-10 items-center w-full md:mb-16">
          <div className="relative pl-1 pr-1 inline-block overflow-hidden text-center">
            <span className="absolute bottom-0 left-0 w-full h-[6px] r bg-[--border-color] animate-border"></span>
            <span className="absolute inset-0 bg-[--border-color] opacity-0 rounded-sm animate-fillBackground"></span>
            <h1 className="text-5xl animate-reveal-text w-[100%] font-bold uppercase leading-tight text-[--border-color] md:w-[650px] md:text-7xl mt-2 mb-2 md: tracking-widest">
            {project.title}
            </h1>
          </div>
        </div>

        <p className="text-base text-[--text-color] md:text-lg text-center w-full md:w-[750px] mb-8 opacity-70">
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
          className="text-[--text-color] text-xl md:text-3xl mb-5 flex items-center gap-2"
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
            <div className="relative w-[99%] h-[99%] md:w-[95%] md:h-[95vh] bg-white rounded-lg overflow-hidden">
              <iframe
                src={project.iframe}
                className="w-full h-full border-none"
                allowFullScreen
              ></iframe>
                <button
                    onClick={() => setShowIframe(false)}
                    className="absolute top-10 left-1/2 text-3xl  transform -translate-x-1/2 -translate-y-1/2 bg-black text-white px-3 py-3 rounded-full hover:bg-white hover:text-black  hover:px-5 transition-transform duration-300 ease-in-out"
                >
                    X
                </button>
            </div>
          </div>
        )}

        {/* Кнопка возврата */}
        <div className="mt-12 text-center">
          <Link href="/projects" className="text-[--text-color] underline">
            ← Back to Projects
          </Link>
        </div>
      </div>
    </>
  );
}
