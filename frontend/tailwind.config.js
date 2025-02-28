/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",  // Correct key name for enabling dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [require("tailwind-scrollbar"),
    require('flowbite/plugin')
  ],
};
