/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-color': '#2DA027',
      },
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: /(bg|text|border|from)-primary-color/,
    },
  ],
}
