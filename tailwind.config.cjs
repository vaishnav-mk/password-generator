/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,css,md,mdx,html,json,scss}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'icon-check': 'url(/src/assets/images/icon-check.svg)'
      },
      fontFamily: {
        sans: ['JetBrains Mono', 'monospace']
      },
      fontSize: {
        'heading-large': ['2rem', '2.688rem'],
        'heading-medium': ['1.5rem', '1.938rem'],
        'body-medium': ['1.125rem', '1.438rem'],
        'body-small': ['1rem', '1.32rem']
      },
      colors: {
        gray: {
          200: '#E6E5EA',
          500: '#817D92',
          800: '#24232C',
          900: '#18171F'
        },
        green: {
          500: '#A4FFAF'
        },
        red: {
          500: '#F64A4A'
        },
        orange: {
          500: '#FB7C58'
        },
        yellow: {
          500: '#F8CD65'
        }
      }
    }
  },
}