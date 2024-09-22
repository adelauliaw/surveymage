/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        'cool-blue': {
          50: '#F0F7FF',
          100: '#E0EFFE',
          200: '#BAD9FB',
          300: '#94C2F9',
          400: '#6EABF7',
          500: '#4894F5',
          600: '#2272D4',
          700: '#1A56A3',
          800: '#123B72',
          900: '#0A1F41',
        },
      },
    },
  },
  plugins: [],
}

