"use client";
import { useState, useRef, useEffect } from "react";
import "./navbar.css";
// import CanvasAnimation from "./canvas/canvas";
import CanvasAnimation from "./canvas/canvasone/canvas";
import { FaGithub, FaLinkedin } from "react-icons/fa"; // Импорт иконок
import Link from "next/link";
import projects from "../data/projects";

const menuItems = [
  { name: "HOME", audio: "/audio/Home.wav", link: "/" },
  { name: "ABOUT", audio: "/audio/about.wav", link: "/about" },
  { name: "PROJECTS", audio: "/audio/projects.wav", link: "/projects" },
  { name: "CONTACT", audio: "/audio/contact.wav", link: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1); // -1 означает, что ничего не активно
  const audioRefs = useRef<HTMLAudioElement[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [showProjectList, setShowProjectList] = useState(false);

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


  // Обработчик прокрутки
  const handleScroll = (e: React.WheelEvent) => {
    if (!isOpen) return;

    let newIndex = activeIndex;
    if (e.deltaY > 0 && activeIndex < menuItems.length - 1) newIndex++;
    if (e.deltaY < 0 && activeIndex > 0) newIndex--;

    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
      audioRefs.current[newIndex]?.play(); // Воспроизведение звука
    }
  };

  // Воспроизведение звука при наведении
  const playSound = (index: number) => {
    audioRefs.current[index]?.play();
  };

  return (
    <>
      {/* Бургер-кнопка */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 flex flex-col space-y-1"
        aria-label="Toggle Menu"
      >
        <span
          className={`w-8 h-1 bg-white rounded transition-transform duration-300 ${
            isOpen ? "rotate-45 translate-y-2" : ""
          }`}
        ></span>
        <span
          className={`w-8 h-1 bg-white rounded transition-transform duration-300 ${
            isOpen ? "opacity-0" : ""
          }`}
        ></span>
        <span
          className={`w-8 h-1 bg-white rounded transition-transform duration-300 ${
            isOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        ></span>
      </button>

      {/* Навбар */}
      <nav
        onWheel={handleScroll}
        className={`fixed top-0 left-0 h-full w-[400px]  bg-[#0a0a0a] text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-40`}
      >
        <ul className="flex flex-col space-y-6 text-6xl text-center justify-center h-full">
          {menuItems.map((item, index) => (
            <li
                key={index}
                className={`menu-item ${index === activeIndex ? "active-scroll" : ""}`}
                onMouseEnter={() => {
                  setActiveIndex(index);
                  playSound(index);
                  if (item.name === "PROJECTS") {
                    setShowProjectList(true); // Показываем проекты при наведении
                  }
                }}
                onMouseLeave={() => {
                  if (item.name !== "PROJECTS") {
                    setShowProjectList(false);
                  }
                }}
              >
                <Link
                  href={item.link}
                  target={item.link.startsWith("http") ? "_blank" : "_self"}
                  rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}
                  onClick={() => setIsOpen(false)}
                >
                {item.name}
              </Link>
              {/* Audio element */}
              <audio
                ref={(el) => {
                  if (el) audioRefs.current[index] = el;
                }}
                src={item.audio}
                preload="auto"
              />
            </li>
          ))}
        </ul>
        {showProjectList && (
          <div
            className="absolute bottom-[250px] left-1/2 transform -translate-x-1/2 w-full bg-[#0a0a0a] bg-opacity-95 p-4 text-white rounded-lg hidden md:block"
            onMouseEnter={() => setShowProjectList(true)} // Keep visible when hovering
            onMouseLeave={() => setShowProjectList(false)} // Hide when leaving the container
          >
            <ul className="space-y-2 text-center">
              {projects.map((project) => (
                <li key={project.id} className="hover:underline">
                  <Link href={project.link}>{project.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}


        {!isMobile && <CanvasAnimation activeIndex={activeIndex} />}

          <div className="fixed bottom-0 left-0 w-full text-white py-4">
            <div className="flex flex-col md:flex-row items-center justify-between max-w-4xl mx-auto px-4 gap-4">
              <div className="flex gap-6 items-center">
                <a
                  href="https://github.com/your-username"
                  target="_blank"
                  className="text-lg font-medium flex items-center gap-2 hover: hover:text-gray-400 transition"
                >
                  <FaGithub size={38} className="icon hover:rotate" /> 
                </a>
                <a
                  href="https://linkedin.com/in/your-profile"
                  target="_blank"
                  className="text-lg font-medium flex items-center gap-2 hover:text-gray-400 transition"
                >
                  <FaLinkedin size={38} className="icon hover:rotate" /> 
                </a>
              </div>
              <button
                onClick={() => window.open('/cv.pdf', '_blank')}
                className="px-6 py-3 border text-white font-semibold rounded hover:bg-white  hover:text-black transition"
              >
                Download CV
              </button>
            </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;