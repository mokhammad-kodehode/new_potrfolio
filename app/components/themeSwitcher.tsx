"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type ThemeType = "light" | "dark" | "color";

const ThemeContext = createContext<{ theme: ThemeType; toggleTheme: () => void }>({
  theme: "light",
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>("light");

  const themes: Record<ThemeType, string> = {
    light: "whiteBlack",
    dark: "blackWhite",
    color: "customColor",
  };

  useEffect(() => {
    const savedTheme = (localStorage.getItem("theme") as ThemeType) || "light";
    setTheme(savedTheme);
    document.documentElement.className = themes[savedTheme];
  }, []);

  const toggleTheme = () => {
    const newTheme: ThemeType = theme === "light" ? "dark" : theme === "dark" ? "color" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.className = themes[newTheme];
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <button
        onClick={toggleTheme}
        className="fixed h-12 w-8    top-4 right-4 z-[1002] p-2 rounded-full border-2 border-gray-300 dark:border-gray-600 bg-[--switch-color] dark:bg-gray-800 hover:scale-110 transition"
      >
        {theme === "light" }
        {theme === "dark" }
        {theme === "color" }
      </button>
      {children}
    </ThemeContext.Provider>
  );
};
