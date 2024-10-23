/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#C7FFD8', // Lightest primary color
          DEFAULT: '#98DED9', // Default primary color
          dark: '#0B2F9F', // Darker primary color
          darkest: '#161D6F', // Darkest primary color
        },
      },
    },
  },
  plugins: [],
}