import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0097a7",
        background: "#f5f9fc",
      },
    },
  },
  plugins: [],
};
export default config;
