const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        orange: colors.orange,
      },
      fontFamily: {
        sans: ["Bai Jamjuree", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  purge: {
    enabled: true,
    content: ["./src/**/*.vue", "./public/**/*.html"],
  },
  variants: {},
  plugins: [],
};
