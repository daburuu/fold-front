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
      },
      backgroundImage: {
        'radial-bg': 'radial-gradient(at 40% 20%, hsla(240,61%,17%,1) 0px, transparent 50%), radial-gradient(at 0% 0%, hsla(260,100%,76%,0.24) 0px, transparent 50%);'
      }
    },
  },
  plugins: [],
}
