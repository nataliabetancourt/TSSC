const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        fadeIn: "fadeIn 0.3s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      colors: {
        red: {
          100: "#D22731",
          200: "#C81E32",
        },
        grey: {
          100: "#F1F2F1",
          200: "#848487",
          300: "#42413E",
          400: "#3C3E38",
        },
        light: "#F6F6F6",
        accentBlue: "#18407C",
        textGrayColor: "#2C2C2C",
      },
    },
  },
  plugins: [],
};
