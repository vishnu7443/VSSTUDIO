/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: '#FFFFFF',
        paper: '#F6F8F5',
        mint: '#E4F7EB',
        sage: '#9EDBB3',
        green: {
          DEFAULT: '#1DB954',
          dark: '#179C45',
          light: '#38E077',
        },
        forest: '#0D2B1F',
        ink: '#0B1E16',
      },
      fontFamily: {
        serif: ['"Young Serif"', 'serif'],
        sans: ['"Schibsted Grotesk"', 'sans-serif'],
      },
      animation: {
        'drift-slow-1': 'driftOne 18s ease-in-out infinite alternate',
        'drift-slow-2': 'driftTwo 22s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pop-tick': 'popTick 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
      },
      keyframes: {
        driftOne: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '50%': { transform: 'translate(25px, -35px) scale(1.08)' },
          '100%': { transform: 'translate(-20px, 20px) scale(0.95)' },
        },
        driftTwo: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '50%': { transform: 'translate(-30px, 25px) scale(1.05)' },
          '100%': { transform: 'translate(20px, -20px) scale(0.96)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        popTick: {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '70%': { transform: 'scale(1.15)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
