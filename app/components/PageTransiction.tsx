"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

    useEffect(() => {
    // Отключаем скролл при начале анимации
    document.body.style.overflow = "hidden";

    const timeoutId = setTimeout(() => {
      document.body.style.overflow = "";
    }, 600); // Делаем задержку чуть больше, чем длительность анимации (500ms)

    return () => {
      clearTimeout(timeoutId);
      document.body.style.overflow = "";
    };
  }, [pathname]);


  return (
    <AnimatePresence
      mode="wait"
      /** когда анимация “ухода” закончилась — возвращаем скролл */
      onExitComplete={() => {
        document.body.style.overflow = "";
      }}
    >
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        /** на старте анимации блокируем скролл */
        onAnimationStart={() => {
          document.body.style.overflow = "hidden";
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
