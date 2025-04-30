/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Pretendard',
          'Apple SD Gothic Neo',
          'Noto Sans KR',
          'sans-serif'
        ]
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        float: 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'hover-bounce': 'hover-bounce 0.5s ease-out'
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'hover-bounce': {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
          '100%': { transform: 'translateY(-8px)' }
        }
      },
      fontSize: {
        large: '2rem',
        medium: '1.5rem',
        small: '1rem'
      },
      padding: {
        large: '1rem 2rem',
        medium: '0.5rem 1rem',
        small: '0.38rem 0.5rem'
      },
      colors: {
        primary: '#283EFF',
        secondary: 'lightgray',
        text: 'black',
        maple: {
          blue: '#283EFF',
          indigo: '#6366F1',
          purple: '#8B5CF6',
          pink: '#EC4899',
          red: '#EF4444',
          orange: '#F97316',
          yellow: '#EAB308',
          green: '#22C55E',
          teal: '#14B8A6',
          cyan: '#06B6D4'
        },
        button: {
          solid: {
            bg: '#283EFF',
            text: '#ffffff'
          },
          outlined: {
            border: '#283EFF',
            text: '#283EFF',
            bg: 'transparent'
          },
          subtle: {
            text: '#283EFF'
          }
        }
      },
      boxShadow: {
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover':
          '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        button:
          '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'button-hover':
          '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem'
      }
    }
  },
  plugins: []
}
