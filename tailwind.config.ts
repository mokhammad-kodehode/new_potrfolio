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
            "0%":  { transform: "scaleX(0)" },
            "100%":{ transform: "scaleX(1)" },
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
            "0%": { transform: "scaleY(0)", transformOrigin: "bottom", opacity: "1" },
            "50%": { transform: "scaleY(1)", transformOrigin: "bottom", opacity: "1" },
            "75%": { transform: "scaleY(1)", transformOrigin: "top", opacity: "1" },
            "100%": { transform: "scaleY(0.02)", transformOrigin: "top", opacity: "1" },
          },
          marqueeLeft: {
            "0%": { transform: "translateX(100%)"  },
            "100%":{ transform: "translateX(-100%)" },
          },
          marqueeRight: {
            "0%": { transform: "translateX(-100%)" },
            "100%":{ transform: "translateX(100%)"  },
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
              revealText: {
        '0%': { 'clip-path': 'inset(100% 0 0 0)' },
        '100%': { 'clip-path': 'inset(0 0 0 0)' },
      },
          growX: {
          '0%': { transform: 'scaleX(0)', transformOrigin: 'left' },
          '100%': { transform: 'scaleX(1)', transformOrigin: 'left' },
        },
        shrinkX: {
          '0%': { transform: 'scaleX(1)', transformOrigin: 'left' },
          '100%': { transform: 'scaleX(0)', transformOrigin: 'left' },
        },
      },
      animation: {
        scaleOut: 'scaleOut 1s ease-out forwards',
        border: "borderExpand .5s ease-out forwards",
        fadeInUp: 'fadeInUp 0.8s ease-out forwards',
        textWipe: "textWipe .5s ease-in-out forwards",
        textReturn: "textReturn .5s ease-in-out forwards",
        'reveal-text': 'revealText 1.5s cubic-bezier(.8,0,.2,1) forwards',
        fillBackground: "fillBackground .5s ease-out .5s forwards",
        fadeIn: "textFadeIn 1s ease-out 1s forwards",
        fadeInout: "textFadeInProjects 0.5s ease-out 0.5s forwards",
        "marquee-left": "marqueeLeft 30s linear infinite",
        "marquee-right": "marqueeRight 10s linear infinite",
        growX: 'growX 0.35s ease-out forwards',
        shrinkX: 'shrinkX 0.35s ease-in forwards',
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

            fontFamily: {
        // теперь доступно через класс font-quicksand
        quicksand: ['var(--font-quicksand)'],
        geistMono: ['Geist Mono', 'monospace'],
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