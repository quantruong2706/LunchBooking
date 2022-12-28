/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-color': '#2DA027',
        'secondary-color': '#5BD76F',
        'light-color': '#BDF7A5',
      },
      fontFamily: {
        'bellota': ['"Bellota"', 'cursive'],
      },
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: /(bg|text|border|from)-primary-color/,
    },
    {
      pattern: /(bg|text|border|from)-secondary-color/,
    },
    {
      pattern: /(bg|text|border|to)-light-color/,
    },
  ],
}
