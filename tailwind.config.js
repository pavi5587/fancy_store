/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#2B1320",      // deep plum-black, primary text/bg
        plum: {
          50: "#F7EEF1",
          100: "#EBD8DF",
          400: "#8C4A63",
          600: "#5C2338",
          900: "#2B1320",
        },
        gold: {
          200: "#EAD9BE",
          400: "#C68B59",
          500: "#B8763F",
          600: "#96602F",
        },
        ivory: "#FBF5EC",
        blush: "#F1DED6",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      letterSpacing: {
        wideish: "0.02em",
      },
      boxShadow: {
        soft: "0 12px 30px -18px rgba(43,19,32,0.35)",
      },
    },
  },
  plugins: [],
};
