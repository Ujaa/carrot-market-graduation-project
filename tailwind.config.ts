import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          50: "#FEFBFD",
          100: "#FFF2FC",
          200: "#FFD9EB",
          300: "#FFB3D7",
          400: "#FF72C6",
          500: "#F533A8",
        },
        yellow: {
          100: "#FFF2C2",
          200: "#FFDB96",
          300: "#FBC16C",
        },
        green: "#14DD89",
        blue: "#54ADFF",
        darkblue: "#1F2ADE",
        purple: "#EF8AFF",
      },
    },
  },
  plugins: [],
};
export default config;
