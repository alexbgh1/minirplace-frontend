/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        bold: 700,
      },
      colors: {
        "black-pearl": "#0A0A0A",
        "smooth-black": "#1e1919",
      },
    },
  },
  plugins: [],
};
