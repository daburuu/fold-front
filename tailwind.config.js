/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      color: {
        'primary-purple': '#200E32',
        'primary-pink': '#8E71AC',
      }
    },
  },
  plugins: [],
}
