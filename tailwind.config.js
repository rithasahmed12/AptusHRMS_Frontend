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
      }
    },
  },
  plugins: [],
}