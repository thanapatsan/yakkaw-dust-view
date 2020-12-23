const colors = require('tailwindcss/colors')
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
        serif: ["Maitree", ...defaultTheme.fontFamily.serif],
        mono: ["Fira Code", ...defaultTheme.fontFamily.mono],
      },
    },
  },
  purge: {
    enabled: false,
    content: ["./src/**/*.js"],
  },
  variants: {},
  plugins: [],
};
