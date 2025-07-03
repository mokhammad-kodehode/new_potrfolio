"use client";

/**
 * Home page – senior-level refactor.
 *
 * - Extracted a reusable `useMediaQuery` hook.
 * - Lazy-loaded heavy Canvas with `next/dynamic` (no SSR).
 * - Memoised expensive JSX and wrapped component in `memo`.
 * - Kept all original visual elements/animations.
 */

import dynamic from "next/dynamic";
import {
  memo,
  useMemo,
  useState,
  useEffect,
  type FC,
} from "react";


import PageTransition from "./components/PageTransiction"; // сохраняем оригинальный импорт

// ────────────────────────────────────────────────────────────────────────────────
// Utils
// ────────────────────────────────────────────────────────────────────────────────

/**
 * Simple hook for responsive checks with SSR-safety.
 * @param query – media query string (e.g. "(max-width: 767px)")
 */
function useMediaQuery(query: string): boolean {
  // Helper so we don't access `window` during SSR
  const getInitial = () =>
    typeof window !== "undefined" && window.matchMedia(query).matches;

  const [matches, setMatches] = useState<boolean>(getInitial);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);

    setMatches(mql.matches); // update immediately after mount
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

// ────────────────────────────────────────────────────────────────────────────────
// Dynamic imports
// ────────────────────────────────────────────────────────────────────────────────

/**
 * Heavy WebGL / Canvas component – грузим только на клиенте,
 * показываем доступный лоадер-плейсхолдер для accessibility.
 */
const InteractiveCanvas = dynamic(
  () => import("./components/canvas/interactiveCanvas"),
  {
    ssr: false,
    loading: () => (
      <span className="sr-only">Loading interactive background…</span>
    ),
  }
);

const CanvasAnimationNew = dynamic(
  () => import("./components/canvas/canvasLines"),
  {
    ssr: false,
    loading: () => <span className="sr-only">Loading animation…</span>,
  }
);

// ────────────────────────────────────────────────────────────────────────────────
// Component
// ────────────────────────────────────────────────────────────────────────────────

const Home: FC = () => {
  const isMobile = useMediaQuery("(max-width: 767px)");

  /**
   * Expensive JSX (Canvas vs. static title) – пересчитываем только при смене `isMobile`.
   */
  const renderContent = useMemo(() => {
    return isMobile ? (
      <span className="relative px-1 inline-block ml-2 overflow-hidden">
        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[--border-color] animate-border" />
        <span className="absolute inset-0 bg-[--border-color] opacity-0 animate-fillBackground" />
        <h1 className="text-6xl  geistMono md:text-7xl font-bold mb-1 leading-tight text-[--border-color] animate-reveal-text">
          Mohammad
        </h1>
      </span>
    ) : (
      <InteractiveCanvas />
    );
  }, [isMobile]);

  return (
    <PageTransition>
      <div className="flex flex-col items-center justify-center min-h-screen text-center text-white">
        {/* Background canvas animation (always rendered) */}
        <CanvasAnimationNew />

        {/* Intro */}
        <h1 className="text-4xl font-bold mb-2 text-[--text-color]">Hi. I&apos;m</h1>

        {/* Name / Interactive Canvas */}
        <div className={`w-full ${isMobile ? "h-auto" : "h-32"} max-w-4xl`}>
          {renderContent}
        </div>

        {/* Bio */}
        <div className="max-w-3xl text-lg leading-relaxed mt-6">
          <p className="mb-6 font-quicksand  opacity-85 text-[--text-color] text-base px-2 md:text-[20px] leading-[1.8]">
            I am a passionate and innovative front-end developer, driven by creativity and
            determination to deliver exceptional digital experiences. With a sharp eye for detail
            and a commitment to excellence, I bring a unique perspective and tailored approach to
            every project. My goal is to craft user-friendly and visually stunning solutions that
            elevate your brand and exceed expectations.
          </p>

          {/* Roles */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4 text-[--text-color]">
              Front-end web
              <span className="relative px-1 inline-block ml-2 overflow-hidden">
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[--border-color]  transform scale-x-0 animate-border" />
                <span className="relative text-lg font-normal z-10  text-[--border-color] ">
                  developer
                </span>
              </span>
            </h2>

            <h2 className="text-2xl  font-semibold mb-4 text-[--text-color]">
              UI/UX
              <span className="relative px-1 inline-block ml-2 overflow-hidden">
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[--border-color]  transform scale-x-0 animate-border" />
                <span className="relative text-lg font-normal z-10 text-[--border-color]  ">
                  designer
                </span>
              </span>
            </h2>

            <h2 className="text-2xl  font-semibold text-[--text-color]">
              Programmer and
              <span className="relative px-1 inline-block ml-2 overflow-hidden">
               <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[--border-color] transform scale-x-0 animate-border" />
                <span className="relative text-lg font-normal z-10 text-[--border-color]  ">
                  friendly guy
                </span>
              </span>
              
            </h2>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default memo(Home);
