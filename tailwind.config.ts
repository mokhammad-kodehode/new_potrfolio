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
        borderExpand: {
          "0%": { width: "0" },
          "100%": { width: "100%" },
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
          "100%": { height: "100%", top: "0", opacity: "1" },
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
        border: "borderExpand 1s ease-out forwards",
        textWipe: "textWipe .5s ease-in-out forwards",
        textReturn: "textReturn 1s ease-in-out forwards",
        fillBackground: "fillBackground 0.6s ease-out 0.6s forwards",
        fadeIn: "textFadeIn 0.6s ease-out 0.6s forwards",
        fadeInout: "textFadeInProjects 0.5s ease-out 0.5s forwards",
        "marquee-left": "marqueeLeft 30s linear infinite",
        "marquee-right": "marqueeRight 10s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
