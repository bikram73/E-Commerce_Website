/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#111111',
          secondary: '#6B7280',
          surface: '#F9FAFB',
          border: '#E5E7EB',
          accent: '#2563EB',
        },
      },
      boxShadow: {
        soft: '0 10px 40px rgba(0, 0, 0, 0.08)',
      },
      borderRadius: {
        xl2: '1rem',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

