/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      ...colors,
      bug: "#26de81",
      dragon: "#ffeaa7",
      electric: "#fed330",
      fairy: "#FF0069",
      fighting: "#30336b",
      fire: "#f0932b",
      flying: "#81ecec",
      grass: "#00b894",
      ground: "#EFB549",
      ghost: "#a55eea",
      ice: "#74b9ff",
      normal: "#95afc0",
      poison: "#6c5ce7",
      psychic: "#a29bfe",
      rock: "#2d3436",
      water: "#0190FF",
      dark: "#292d30",
      steel: "#c0c0c0"
    },
    extend: {
      backgroundImage: {
        'avatar-radial': 'radial-gradient(circle at 50% 125%, var(--tw-gradient-stops))',
      },
      animation: {
        'bounce-x': 'bounce-x 0.8s linear infinite',
      },
      keyframes: {
        'bounce-x': {
          '0%': {
            transform: 'translateX(0)',
          },
          '50%': {
            transform: 'translateX(-1%)',
          },
          '100%': {
            transform: 'translateX(0)',
          },
        }
      }
    },
  },
  plugins: [],
}

