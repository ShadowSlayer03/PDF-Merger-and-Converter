/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite/**/*.js",
    "./*.html", // Include your HTML files for Tailwind CSS to scan.
    "./*.js",   // Include your JavaScript files for Tailwind CSS to scan.
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin'), // If you are using the Flowbite plugin, make sure it's installed.
  ],
}
