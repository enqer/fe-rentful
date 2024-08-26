/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  content: ['./src/**/*.{html,js,vue,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#18181b',
        'primary-night': '#09090b',
        secondary: '#e8e8e9',
        'secondary-night': '#fafafa',
        third: '#27272a',
      },
      fontFamily: {
        body: ['Poppins'],
      },
    },
  },
};
