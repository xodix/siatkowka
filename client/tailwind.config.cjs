/** @type {import('tailwindcss').Config} */
const production = !process.env.ROLLUP_WATCH;
module.exports = {
  content: ['./public/index.html', './src/**/*.{html,js,svelte,ts}'],
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
  plugins: [
  ],
  /*
  purge: {
    content: [
      "./src/App.svelte",
    ],
    enabled: production // disable purge in dev
  },
  */
};

