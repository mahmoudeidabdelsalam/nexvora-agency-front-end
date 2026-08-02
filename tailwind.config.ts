import type { Config } from "tailwindcss";

// Design tokens for a software/tech agency homepage.
// Palette: graphite ink base, off-white panels, a single cobalt signal color
// used sparingly (status-light metaphor — the one thing "on" on the page).
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#12151C",       // near-black graphite, not pure black
        panel: "#F7F7F5",     // off-white section background
        signal: "#3B6CF6",    // cobalt accent — the "status light"
        signalDim: "#1E2A55", // dark cobalt for hover/borders on ink bg
        line: "#22262F",      // hairline borders on dark sections
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
