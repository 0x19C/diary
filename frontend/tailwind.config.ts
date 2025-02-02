import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "black-default": "#333333",
        "gray-default": "#bbbbbb",
        "gray-dark": "#aaaaaa",
        "gray-light": "#cccccc",
        "blue-default": "#00a0e9",
        "green-default": "#00B050",
        "green-light": "#99FF33",
        "yellow-default": "#fff65a",
        "orange-default": "#f39801",
        "orange-dark": "#fea920",
      },
    },
  },
  plugins: [],
} satisfies Config;
