import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backdropBlur: {
        xs: "2px",
        sm: "4px",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0, 0, 0, 0.1)",
      },
      colors: {
        black: {
          1: "#000319",
          2: "#0B0B0B",
        },
        white: {
          1: "#FAF0E6",
        },
        yellow: {
          1: "#FFD700",
          2: "#FFEB3B",
        },
        red: {
          1: "#FF4C4C",
          2: "#ff5e57",
        },
        green: {
          1: "#d4edda",
          2: "#4cd964",
        },
      },
      animation: {
        "meteor-effect": "meteor 5s linear infinite",
        bounce: "bounce 0.6s infinite",
        spin: "spin 1s linear infinite",
        fade: "fade 1s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
        scaleUp: "scaleUp 1.5s ease-in-out infinite",
        wave: "wave 1s ease-in-out infinite",
      },
      keyframes: {
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" },
          "70%": { opacity: "1" },
          "100%": {
            transform: "rotate(215deg) translateX(-500px)",
            opacity: "0",
          },
        },
        bounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" },
        },
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        fade: {
          "0%, 100%": { opacity: "0" },
          "50%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        scaleUp: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
        },
        wave: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
