"use client";

import { useState, useRef, useEffect } from "react";
import "./navbar.css";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Link from "next/link";
import projects from "../data/projects";

const menuItems = [
  { name: "HOME",     audio: "/audio/Home.wav",     link: "/" },
  { name: "ABOUT",    audio: "/audio/about.wav",    link: "/about" },
  { name: "PROJECTS", audio: "/audio/projects.wav", link: "/projects" },
  { name: "CONTACT",  audio: "/audio/contact.wav",  link: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen]                   = useState(false);
  const [activeIndex, setActiveIndex]         = useState(-1);

  /* ───────── под-меню ───────── */
  const [projRender, setProjRender]           = useState(false); // присутсвие в DOM
  const [projGrow,   setProjGrow]             = useState(false); // true=grow, false=shrink

  const audioRefs = useRef<HTMLAudioElement[]>([]);

  /* сбрасываем активный пункт при закрытии сайдбара */
  useEffect(() => { if (!isOpen) setActiveIndex(-1); }, [isOpen]);

  /* скролл колёсиком внутри меню */
  const handleWheel = (e: React.WheelEvent) => {
    if (!isOpen) return;
    let idx = activeIndex;
    if (e.deltaY > 0 && idx < menuItems.length - 1) idx++;
    if (e.deltaY < 0 && idx > 0)                 idx--;
    if (idx !== activeIndex) {
      setActiveIndex(idx);
      audioRefs.current[idx]?.play();
    }
  };

  /* helpers для PROJECTS */
  const openProjects  = () => { setProjRender(true); setProjGrow(true);  };
  const closeProjects = () => {
    setProjGrow(false);
    setTimeout(() => setProjRender(false), 350);   // длительность shrinkX
  };

  return (
    <>
      {/* ───── burger ───── */}
      <button onClick={() => setIsOpen(!isOpen)}
              className="fixed top-4 left-4 z-50 flex flex-col space-y-1"
              aria-label="Toggle menu">
        <span className={`w-8 h-1 bg-[--text-color] rounded transition-transform duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
        <span className={`w-8 h-1 bg-[--text-color] rounded transition-opacity  duration-300 ${isOpen ? "opacity-0" : "opacity-100"}`} />
        <span className={`w-8 h-1 bg-[--text-color] rounded transition-transform duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
      </button>

      {/* ───── sidebar ───── */}
      <nav onWheel={handleWheel}
           className={`fixed top-0 left-0 h-full w-[400px] bg-[#0a0a0a] text-white transform ${
             isOpen ? "translate-x-0" : "-translate-x-full"
           } transition-transform duration-300 ease-in-out z-40`}>

        <ul className="flex flex-col relative space-y-6 text-6xl text-center justify-center h-full">
          {menuItems.map((item, idx) =>
            item.name === "PROJECTS" ? (
              <div key={item.name}
                   onMouseEnter={openProjects}
                   onMouseLeave={closeProjects}
                   className="relative">
                <li className={`menu-item ${idx === activeIndex ? "active-scroll" : ""}`}
                    onMouseEnter={() => {
                      setActiveIndex(idx);
                      audioRefs.current[idx]?.play().catch(()=>{});
                    }}>
                  <Link href={item.link} onClick={() => setIsOpen(false)}>
                    {item.name}
                  </Link>
                  <audio ref={el=>{ if(el) audioRefs.current[idx]=el; }} src={item.audio} preload="auto" />
                </li>

                {projRender && (
                  <div className={`absolute origin-left bg-[#0a0a0a]/95 w-60 top-[-30px] left-full -translate-x-1/9 p-4
                                   ${projGrow ? "animate-growX" : "animate-shrinkX"}`}>
                    <ul className="space-y-2 text-[22px] text-left">
                      {projects.map(pr => (
                        <li key={pr.id} className="hover:underline">
                          <Link href={pr.link}>{pr.title}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <li key={item.name}
                  className={`menu-item ${idx === activeIndex ? "active-scroll" : ""}`}
                  onMouseEnter={() => {
                    setActiveIndex(idx);
                    audioRefs.current[idx]?.play().catch(()=>{});
                  }}>
                <Link href={item.link} onClick={() => setIsOpen(false)}>
                  {item.name}
                </Link>
                <audio ref={el=>{ if(el) audioRefs.current[idx]=el; }} src={item.audio} preload="auto" />
              </li>
            )
          )}
        </ul>

        {/* низ сайдбара */}
        <div className="fixed bottom-0 left-0 w-full py-4">
          <div className="flex flex-col md:flex-row items-center justify-between max-w-4xl mx-auto px-4 gap-4">
            <div className="flex gap-6">
              <a href="https://github.com/mokhammad-kodehode?tab=repositories" target="_blank" className="hover:text-gray-400 transition">
                <FaGithub size={38} />
              </a>
              <a href="https://linkedin.com/in/mohammad-dzhabrailov-79a207275" target="_blank" className="hover:text-gray-400 transition">
                <FaLinkedin size={38} />
              </a>
            </div>
            <button onClick={() => window.open("/CV-MD.pdf", "_blank")}
                    className="px-6 py-3 border text-white font-semibold rounded hover:bg-white hover:text-black transition">
              Download CV
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
