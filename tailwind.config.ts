import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0f172a",
        panel: "#f7fbfc",
        signal: "#0997AA",
        signalDim: "#262263",
        line: "#dcebf0",
        primary: "#0997AA",
        secondary: "#262263",
      },
      fontFamily: {
        display: ["var(--font-geist-sans)", "sans-serif"],
        body: ["var(--font-geist-sans)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
