import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Strict 60-30-10 Palette
        cream: {
          DEFAULT: "#FAF5EB",
          light: "#FFFDF9",
          border: "#E3DCCB",
        },
        navy: {
          DEFAULT: "#0A1F44",
          deep: "#0B2340",
          surface: "#0e2a52",
          muted: "#354B70",
          sub: "#4A6085",
        },
        coral: {
          DEFAULT: "#FF6B4A",
          hover: "#E85635",
          muted: "rgba(255, 107, 74, 0.12)",
        },
        line: "#E3DCCB",
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Fraunces", "Georgia", "serif"],
        display: ["var(--font-fraunces)", "Fraunces", "-apple-system", "sans-serif"],
        sans: ["var(--font-archivo)", "Archivo", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["var(--font-ibm-plex-mono)", "IBM Plex Mono", "SF Mono", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.025em",
        tight: "-0.015em",
        mono: "0.12em",
      },
      boxShadow: {
        subtle: "0 8px 30px rgba(10, 31, 68, 0.06)",
        card: "0 14px 40px rgba(10, 31, 68, 0.08)",
        floating: "0 24px 60px rgba(10, 31, 68, 0.14)",
      },
    },
  },
  plugins: [],
};
export default config;
