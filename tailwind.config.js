/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{jsx,js}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        'lay': 'repeat(auto-fit, minmax(300px, 1fr))'
      }
    },
  },
  plugins: [],
}

