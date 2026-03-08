/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C9963F',
          light: '#E8C97A',
          pale: '#FBF3E0',
        },
        deep: '#1A0D00',
        warm: '#3D1F00',
        cream: '#FDF8F0',
        rose: '#B5454B',
        sage: '#6B7C5C',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['Jost', 'sans-serif'],
      },
    },
  },
  plugins: [],
}