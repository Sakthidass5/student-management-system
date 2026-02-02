
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".perspective": { perspective: "1000px" },
        ".preserve-3d": { "transform-style": "preserve-3d" },
        ".backface-hidden": { "backface-visibility": "hidden" },
      }
      addUtilities(newUtilities, ["responsive", "hover"])
    },
  ],
}
