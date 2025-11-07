import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#E3F2FD",
          100: "#BBDEFB",
          200: "#90CAF9",
          500: "#0070C0",
          600: "#005A99",
          900: "#003366",
        },
        success: {
          50: "#D1FAE5",
          500: "#10B981",
          600: "#059669",
        },
        warning: {
          50: "#FEF3C7",
          500: "#F59E0B",
          600: "#D97706",
        },
        error: {
          50: "#FEE2E2",
          500: "#DC2626",
          600: "#B91C1C",
        },
      },
    },
  },
  plugins: [],
};

export default config;
