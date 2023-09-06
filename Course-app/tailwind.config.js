/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    
    extend: {
      colors:{
        'body':"#ffffff",
        "blue-700": "rgb(29 78 216)"
  
      },
    },
  },
  plugins: [require("daisyui")],
}

