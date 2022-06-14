/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        primary: "#49CD5E",
        primaryHover: "#B5D9BB",
        secondary: "#223CC7",
        tertiary: "#6581A3",
        dark: "#000000",
        fontSecondary: "#565656",
        neutral: "#E1E8ED",
        neutral2: "#EEEEEE",
        neutral3: "#9C9C9C",
        disabled: "#AAB8C2"
      },
      boxShadow: {
        "3xl": "0px 8px 30px rgba(0, 0, 0, 0.08)"
      }
    }
  },
  plugins: [require("@tailwindcss/forms")]
};
