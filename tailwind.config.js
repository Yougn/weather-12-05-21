module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      "primary-color": "var(--primary-color)",
      "secondary-color": "var(--secondary-color)",
      black: "var(--black-color)",
      grey: "var(--grey-color)",
      "dark-grey": "var(--dark-grey-color)",
    },
    boxShadow: {
      sm: "0px -16px 40px rgba(0, 0, 0, 0.2)",
      md: "0 8px 24px rgba(0, 0, 0, 0.1)",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
