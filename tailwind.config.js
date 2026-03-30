/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "brand-bg": "#FAF9F6",
        "brand-dark": "#1A1A1A",
        "brand-gold": "#D4AF37",
      },
    },
  },
  plugins: [],
};
