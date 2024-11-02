import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#6e54b5",
          light: "#d6d3e3",
          dark: "#2b2738",
          accent: "#3b364c",
        },
        secondary: {
          dark: "#635e75",
        }
      },
      width: {
        86: "21rem",
        88: "22rem",
        92: "23rem",
      }
    },
  },
  plugins: [],
};
export default config;
