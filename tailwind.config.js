/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        parisienne: ["Parisienne", "cursive"],
      },
      colors: {
        primary: "#7C3AED", // Jobright-like purple (similar to indigo/violet)
        secondary: "#06B6D4", // Accent cyan
        accent: "#F97316", // Warm accent for CTAs (orange)
        dark: "#0B0B0F", // Deeper background
        muted: "#A3A3A3",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "3rem",
        },
      },
    },
  },
  plugins: [],
};
