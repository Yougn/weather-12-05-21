module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      grey: "#999999",
      darkGrey: "#666666",
      blue: "#0da0ea",
      black: "#000000",
    },
    backgroundColor: (theme) => ({
      ...theme("colors"),
      bgImg: "#8bccfb",
      bgWhite: "#ffffff",
    }),
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
