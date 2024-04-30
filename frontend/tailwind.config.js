/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    colors: {
      black: "#000",
      white: "#fff",
      transparent: "transparent",
      blue: {
        300: "#93c5fd",
        400: "#60a5fa",
      },
      slate: {
        800: "#1e293b",
        900: "#0f172a",
      },
      red: {
        500: "#ef4444",
      },
      emerald: {
        500: "#10b981",
      },
      orange: "orange",
    },
    extend: {},
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    require("@tailwindcss/line-clamp"),
  ],
};
