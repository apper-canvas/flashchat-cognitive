/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FFFC00',
          light: '#FFFF66',
          dark: '#E6E300'
        },
        secondary: {
          DEFAULT: '#FF3040',
          light: '#FF6B7A',
          dark: '#E6002E'
        },
        accent: '#9B59B6',
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a'
        },
        dark: {
          50: '#0f172a',
          100: '#1e293b',
          200: '#334155',
          300: '#475569',
          400: '#64748b',
          500: '#94a3b8',
          600: '#cbd5e1',
          700: '#e2e8f0',
          800: '#f1f5f9',
          900: '#f8fafc'
        }

      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        heading: ['Inter', 'ui-sans-serif', 'system-ui']
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        'neu-light': '5px 5px 15px #d1d9e6, -5px -5px 15px #ffffff',
        'neu-dark': '5px 5px 15px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(255, 255, 255, 0.05)',
        'flash': '0 0 25px rgba(255, 252, 0, 0.3), 0 0 50px rgba(255, 252, 0, 0.1)'
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem'
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'bounce-soft': 'bounce-soft 0.6s ease-in-out',
        'slide-up': 'slide-up 0.3s ease-out',
        'slide-in': 'slide-in 0.3s ease-out',
        'fade-in': 'fade-in 0.2s ease-in-out',
        'flash': 'flash 0.1s ease-in-out'
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { 
            transform: 'scale(1)',
            boxShadow: '0 0 0 0 rgba(255, 252, 0, 0.7)'
          },
          '50%': { 
            transform: 'scale(1.05)',
            boxShadow: '0 0 0 10px rgba(255, 252, 0, 0)'
          }
        },
        'bounce-soft': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' }
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 }
        },
        'flash': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.3 }
        },
        'slide-in': {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 }
        },
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        }
      }
    }
  },
  plugins: [],
  darkMode: 'class',
}