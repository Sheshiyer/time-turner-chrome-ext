/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        physical: '#FF6B6B',
        emotional: '#4ECDC4',
        intellectual: '#45B7D1',
      },
    },
  },
  plugins: [],
}
