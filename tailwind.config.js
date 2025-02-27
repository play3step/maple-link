/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        large: '2rem',
        medium: '1.5rem',
        small: '1rem'
      },
      padding: {
        large: '1rem 2rem',
        medium: '0.5rem 1rem',
        small: '0.25rem 0.5rem'
      },
      colors: {
        primary: '#283EFF',
        secondary: 'lightgray',
        text: 'black',
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
      }
    }
  },
  plugins: []
}
