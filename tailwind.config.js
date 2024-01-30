module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      barlow: ["Barlow Condensed"],
      bellefair: ["Bellefair"],
      lato: ["Lato"],
      primary: "Orbitron",
      secondary: "Rajdhani",
      tertiary: "Aldrich",
    },
    container: {
      padding: {
        DEFAULT: "15px",
      },
    },
    screens: {
      sm: "380px",
      md: "620px",
      lg: "880px",
      xl: "1100px",
    },
    extend: {
      colors: {
        primaryColor: "#01974B",
        primaryColorVar: "#4db681",
        secondaryColor: "#F5E6CD",
        secondaryColorVar: "#f7ebd7",
        viaColor: '#FDFBF8'
      },

      animation: {
        "spin-slow": "spin 9000ms linear infinite",
      },
    },
  },
  plugins: [
    // require('@tailwindcss/forms'),
  ],
};
