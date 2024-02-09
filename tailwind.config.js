/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      'blue': '#270095',
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': '#13ce66',
      'yellow': '#ffc82c',
      'gray-dark': '#273444',
      'gray': '#e7e9e2',
      'gray-light': '#d3dce6',
      'white': '#ffffff',
      'sky':'#a9b4fa',
      'light-gray':'#30434e',
      'black':'#000000',
      'red':'#ff0000',
      'dark-blue':'#042264',
      'midnight':'#222b4f',
      'harmony':'#304b68',
      'highland':'#30434e',
      'redish':'#e27572',
      'greenish':'#33cc80'
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  }
}