/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // dark chocolate + black brand palette
        cocoa: {
          950: '#0a0605',
          900: '#120c0a',
          800: '#1b120d',
          700: '#2b1d17',
          600: '#3d2a20',
        },
      },
      fontFamily: {
        sans: ['"Readex Pro"', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
