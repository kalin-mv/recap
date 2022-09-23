/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
    backgroundImage: {
      none: 'none',
      city: 'url(/static/city.jpg)',
    },
  },
  plugins: [],
};
