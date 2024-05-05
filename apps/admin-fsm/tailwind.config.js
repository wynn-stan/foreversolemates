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
          default: "#E8E8E8",
          5: "#F0F0F0",
          10: "#E8E8E8",
          20: "#D1D1D1",
          30: "#999999",
          40: "#727272",
          50: "#585858"
        }, red: {
          10: "#EEBDBD",
          40: "#C32A2A",
          50: "#D81010"
        }
      }
    },  },
  plugins: [],
};
