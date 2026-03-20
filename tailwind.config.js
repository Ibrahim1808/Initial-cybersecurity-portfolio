/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,mdx}",
    "./components/**/*.{js,jsx,mdx}",
    "./lib/**/*.{js,jsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          base: "#05070d",
          panel: "#0b1020",
          muted: "#94a3b8",
          line: "rgba(148, 163, 184, 0.14)",
          neon: "#38bdf8",
          acid: "#22c55e",
          violet: "#8b5cf6",
        },
      },
      boxShadow: {
        glow: "0 0 40px rgba(56, 189, 248, 0.18)",
        acid: "0 0 30px rgba(34, 197, 94, 0.18)",
      },
      backgroundImage: {
        "cyber-grid":
          "linear-gradient(rgba(56,189,248,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.08) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
