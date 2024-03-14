/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    // "./client/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: '4rem'
    }
    
  },
  plugins: [],
}
