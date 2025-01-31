"use client"

import React, { useState, useEffect } from "react";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Define a union type for theme keys
  type ThemeType = "light" | "dark" | "color";

  const [theme, setTheme] = useState<ThemeType>("light");

  const themes: Record<ThemeType, string> = {
    light: "whiteBlack",
    dark: "blackWhite",
    color: "customColor",
  };

  useEffect(() => {
    try {
      // Narrow the type of savedTheme to ThemeType
      const savedTheme = (localStorage.getItem("theme") as ThemeType) || "light";
      setTheme(savedTheme);
      document.documentElement.className = themes[savedTheme];
    } catch {
      console.warn("LocalStorage is not available.");
    }

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "theme") {
        const newTheme = (event.newValue as ThemeType) || "light";
        setTheme(newTheme);
        document.documentElement.className = themes[newTheme];
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const toggleTheme = () => {
    const newTheme: ThemeType = theme === "light" ? "dark" : theme === "dark" ? "color" : "light";
    setTheme(newTheme);
    document.documentElement.className = themes[newTheme];
    localStorage.setItem("theme", newTheme);
  };

  return (
    <>
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 z-[1002] p-2 rounded-full border-2 border-gray-300 dark:border-gray-600 bg-black dark:bg-gray-800 hover:scale-105 transition"
      >
        {theme === "light" && "L"}
        {theme === "dark" && "B"}
        {theme === "color" && "C"}
      </button>
      {children}
    </>
  );
}
