module.exports = {
  content: [
    './pages/**/*.{html,js,tsx,ts}',
    './components/**/*.{html,js,tsx,ts}',
    './screens/**/*.{html,js,tsx,ts}'
  ],
  theme: {
    extend: {
      colors: {
        'BASE_YELLOW': '#C9FB5C',
         'black': '000',
       },
    },
  },
  plugins: [],
  corePlugins: require('tailwind-rn/unsupported-core-plugins'),
}
