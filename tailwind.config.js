/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cormorant: ['Cormorant', 'serif'],
        sarabun: ['Sarabun', 'sans-serif'],
      }
    },
    colors: {
      neonYellow: '#DBFF00',
      goGreen: '#8FFFA8',
      pipeyPurple: '#CBA3FF',
      white: colors.white,
      gray: colors.gray,
      black: colors.black
    }
  },
  plugins: [],
}

