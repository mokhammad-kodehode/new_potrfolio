"use client";

import { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";


/* ──────────────────────────────  Lazy-Canvas  ────────────────────────────── */

const InteractiveImageCanvas = dynamic(
  () => import("../components/canvas/InterImage"),
  { ssr: false, loading: () => <span className="sr-only">Loading…</span> }
);

function LazyCanvas() {
  const holderRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = holderRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return <div ref={holderRef}>{show && <InteractiveImageCanvas />}</div>;
}


/* ──────────────────────────────  Page  ───────────────────────────────────── */

export default function About() {
  return (
    <>
      {/* внешний контейнер: одинаковый для всех брейк-поинтов */}
      <div className="min-h-screen flex flex-col items-center justify-center px-4 md:px-0 text-white">
        {/* две колонки: на mob сверху/снизу, на desktop — слева/справа */}
        <div className="flex flex-col md:flex-row items-center justify-center w-full">
          {/* Canvas: показываем ТОЛЬКО ≥ md → hidden до 768 px */}
          <div className="hidden md:block w-1/3">
            <LazyCanvas />
          </div>

          {/* Текст / заголовок */}
          <div className="w-full md:w-[680px] px-2 text-center">
            <span className="relative inline-block px-1 ml-2 overflow-hidden">
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[--border-color] origin-lef animate-border  " />
              <span className="absolute inset-0 bg-[--border-color] opacity-0 animate-border " />
              <span className="absolute inset-0 bg-[--border-color] opacity-0 animate-fillBackground" />
              <span className="block  text-5xl md:text-7xl font-bold leading-tight text-[--border-color]  animate-reveal-text ">
                ABOUT&nbsp;ME
              </span>
            </span>

            <p className="mt-4 text-[--text-color] opacity-70 text-sm md:text-xl">
              My name is Mohammad, and I am a passionate front-end developer. Since early&nbsp;2023&nbsp;I’ve
              been part of an intensive Kodehode course, where I quickly mastered full-stack
              development. Coding has become more than a profession for me — it’s a way of life.
            </p>

            <p className="mt-4 text-[--text-color] opacity-70 text-sm md:text-xl">
              Previously, I was an entrepreneur with several successful projects in the service and
              entertainment industries, gaining valuable experience in marketing and business
              management. Now, I aim to combine my technical and entrepreneurial skills to create
              impactful projects.
            </p>

            <p className="mt-4 text-[--text-color] opacity-70 text-sm md:text-xl">
              Outside of work, I love traveling, playing video games, spending time with my family,
              and cycling. I’m honest, responsible, and always motivated to grow and learn.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
