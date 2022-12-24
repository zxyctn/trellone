module.exports = {
  content: ['./src/**/*.{html,js,svelte}', '.{html}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['cmyk', 'dark'],
  },
};
