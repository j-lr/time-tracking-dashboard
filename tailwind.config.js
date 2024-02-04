/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    fontFamily: {
      rubik: ["Rubik", "sans-serif"],
    },
    screens: {
      laptop: "800px",
      // => @media (min-width: 800px) { ... }
      grid_col_2_breakpoint: "1000px",
      grid_col_3_breakpoint: "1200px",
    },
    extend: {
      colors: {
        //### Primary
        blue: "hsl(246, 80%, 60%)",
        //### Neutral
        "very-dark-blue": "hsl(226, 43%, 10%)",
        "dark-blue": "hsl(235, 46%, 20%)",
        "desaturated-blue": "hsl(235, 45%, 61%)",
        "pale-blue": "hsl(236, 100%, 87%)",
      },
    },
  },
  plugins: [],
};
