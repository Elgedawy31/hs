const { heroui} = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    container: {
      center: true,
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1440px',  // Increased from 1280px
        '2xl': '1800px',  // Increased from 1536px
      },
    },
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' }
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' }
        },
        menuEnter: {
          '0%': { 
            opacity: '0',
            transform: 'scale(0.95) translateY(-10px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'scale(1) translateY(0)'
          }
        },
        menuLeave: {
          '0%': { 
            opacity: '1',
            transform: 'scale(1) translateY(0)'
          },
          '100%': { 
            opacity: '0',
            transform: 'scale(0.95) translateY(-10px)'
          }
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-out forwards',
        fadeOut: 'fadeOut 0.3s ease-out forwards',
        slideUp: 'slideUp 0.3s ease-out forwards',
        menuEnter: 'menuEnter 0.2s ease-out forwards',
        menuLeave: 'menuLeave 0.2s ease-out forwards'
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
        barColor:'var(--barColor)'
      },
    },
  },
  plugins: [heroui()],
};
