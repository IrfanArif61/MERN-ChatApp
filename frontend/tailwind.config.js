/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 3s linear infinite", // Define a custom animation called 'spin-slow'
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
};
