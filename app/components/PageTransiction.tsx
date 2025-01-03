"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Блокируем скроллинг при загрузке страницы
    document.body.style.overflow = "hidden";

    return () => {
      // Включаем скроллинг после завершения анимации
      document.body.style.overflow = "";
    };
  }, [pathname]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 0 }} // Анимация снизу вверх
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 0 }} // Анимация при выходе
        transition={{ duration: 0.5, ease: "easeInOut" }}
        onAnimationComplete={() => {
          // Сбрасываем overflow после завершения анимации
          document.body.style.overflow = "";
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}