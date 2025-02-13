/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' }
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-out forwards',
        slideUp: 'slideUp 0.3s ease-out forwards'
      },
      colors: {
        body: 'var(--body)',
        secondPrimaryColor: 'var(--secondPrimaryColor)',
        placeholderText: 'var(--placeholderText)',
        primary: 'var(--primary)',
        altPrimary: 'var(--altPrimary)',
        text: 'var(--text)',
        hoverText: 'var(--hoverText)',
        borderColor: 'var(--borderColor)',
        background: 'var(--background)',
      },
    },
  },
  plugins: [],
};
