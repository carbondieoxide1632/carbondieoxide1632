/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // dark chocolate + black brand palette
        cocoa: {
          950: '#0A0605',
          900: '#120C0A',
          800: '#1B120D',
          700: '#2B1D17',
          600: '#3D2A20',
          500: '#6F4E37',
        },
      },
      fontFamily: {
        sans: ['"Readex Pro"', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
