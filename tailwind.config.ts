import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        scaleOut: {
          '0%': { transform: 'scale(1.5)', opacity: '0.5' },
        '100%': { transform: 'scale(1)', opacity: '1' },
        },
        borderExpand: {
          "0%": { width: "0" },
          "100%": { width: "100%" },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px) scale(0.9)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        textFadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        textFadeInProjects: {
          "0%": { opacity: "0", transform: "translateY(0px)" },
          "50%": { opacity: ".5", transform: "translateY(0px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fillBackground: {
          "0%": { height: "2px", top: "100%", opacity: "1" },
          "100%": { height: "50%", top: "0", opacity: "1" },
        },
        marqueeLeft: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-140%)" },
        },
        marqueeRight: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        textWipe: {
          "0%": {opacity: "0", clipPath: "inset(100% 100% 0 0)" },
          "50%": { clipPath: "inset(0  100% 100% 100%)" },
          "100%": { opacity: "1", clipPath: "inset(0 0 0 0)" },
        },
        textReturn: {
          "0%": { opacity: "0", clipPath: "inset(0 100% 0 0)" },
          "50%": { clipPath: "inset(0 0 0 0)", opacity: "0" },
          "100%": { opacity: "1", clipPath: "inset(0 0 0 0)" },
        },
      },
      animation: {
        scaleOut: 'scaleOut 1s ease-out forwards',
        border: "borderExpand 1s ease-out forwards",
        fadeInUp: 'fadeInUp 0.8s ease-out forwards',
        textWipe: "textWipe .5s ease-in-out forwards",
        textReturn: "textReturn 1s ease-in-out forwards",
        fillBackground: "fillBackground 0.6s ease-out 0.6s forwards",
        fadeIn: "textFadeIn 0.6s ease-out 0.6s forwards",
        fadeInout: "textFadeInProjects 0.5s ease-out 0.5s forwards",
        "marquee-left": "marqueeLeft 30s linear infinite",
        "marquee-right": "marqueeRight 10s linear infinite",
      },
      colors: {
        // Define custom colors for themes
        light: {
          background: "#ededed",
          text: "#171717",
        },
        dark: {
          background: "#0a0a0a",
          text: "#ededed",
        },
        customColor: {
          gradientStart: "#4f46e5", // Blue
          gradientEnd: "#ec4899",  // Pink
          text: "#ffffff",
        },
      },
      backgroundImage: {
        // Add custom gradient for the color theme
        "custom-gradient": "linear-gradient(to right, #4f46e5, #ec4899)",
      },
    },
  },
  plugins: [],
  darkMode: "class", // Use class-based dark mode
} satisfies Config;
