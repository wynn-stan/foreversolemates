const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          default: '#E8E8E8',
          5: '#F0F0F0',
          10: '#E8E8E8',
          20: '#D1D1D1',
          30: '#999999',
          40: '#727272',
          50: '#585858',
          60: '#1e1e1e',
        },
        green: {
          10: '#B4DBC4',
          50: '#045223',
        },
        blue: {
          10: '#E6F2FC',
          30: '#B2D5F3',
          50: '#0074D8',
          70: '#004682',
        },
        red: {
          5: '#F4D4D4',
          10: '#EEBDBD',
          40: '#C32A2A',
          50: '#D81010',
          60: '#9B3A3A',
        },
      },
    },
  },
  plugins: [],
};
