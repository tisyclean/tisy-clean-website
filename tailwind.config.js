/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        "accent-red": "#CD291E",
        "accent-yellow": "#FDB912",
        "light-white": "#FFF9EE",
        "custom-grey": "#231F20",
        "dark-green": "#316131",
      },
      fontFamily: {
        lilita: ["Lilita One", "cursive"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        apple: "cubic-bezier(0.25, 0.1, 0.25, 1)",
      },
      transitionDuration: {
        motion: "1100ms",
        "motion-fast": "550ms",
      },
    },
  },
  plugins: [],
};
