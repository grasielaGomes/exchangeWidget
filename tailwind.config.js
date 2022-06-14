/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        primary: "#49CD5E",
        secondary: "#223CC7",
        tertiary: "#6581A3",
        dark: "#000000",
        grey: "#9C9C9C",
        neutral: "#E1E8ED"
      },
      borderRadius: {
        md: "4px"
      }
    }
  },
  plugins: [require("@tailwindcss/forms")]
};
