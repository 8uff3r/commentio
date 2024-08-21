/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,vue,js,ts,jsx,tsx}'],
  daisyui: {
    themes: [
      {
        cc: {
          primary: '#8500ff',
          'primary-content': '#e3d9ff',
          secondary: '#006bff',
          'secondary-content': '#d1e4ff',
          accent: '#00c778',
          'accent-content': '#000e05',
          neutral: '#2f171b',
          'neutral-content': '#d2cbcc',
          'base-100': '#1e2226',
          'base-200': '#191c20',
          'base-300': '#131619',
          'base-content': '#cdcecf',
          info: '#008dca',
          'info-content': '#00070f',
          success: '#437900',
          'success-content': '#d8e4d0',
          warning: '#ffaf20',
          'warning-content': '#160b00',
          error: '#ff606f',
          'error-content': '#160304',
        },
      },
    ],
  },
  theme: {},
  plugins: [
    'prettier-plugin-tailwindcss',
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('daisyui'),
  ],
}
