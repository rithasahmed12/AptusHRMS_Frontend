/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'brown-dark':"#462C2C",
        'brown-light':"#734c4c",
        'snow':"#FFFAFA",
        'snow-dark':'#DDC4C4',
        'admin-orange':'#FF8B6A',
        
      },
      backgroundImage: {
        'gradient-brown':'linear-gradient(271deg, #AC6C6C 0%, #462C2C 45%)'
      },
      keyframes: {
        slideDown: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        slideDown: 'slideDown 0.5s ease-out',
      },
    },
  },
  plugins: [],
}