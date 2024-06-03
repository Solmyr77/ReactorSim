/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        "ui-background": "#09090B",
        "ui-ring": "#27272A",
        "ui-primary": "#818CF8",
        "ui-card": "#18181b",
        "ui-stone": "#1A181A",
        custom: {
          'bg-dark': 'rgb(32, 26, 23)',
          'custom-elevation-1': 'rgba(255, 255, 255, 0.08)',
          'custom-elevation-2': 'rgba(255, 255, 255, 0.12)',
          'custom-elevation-3': 'rgba(255, 255, 255, 0.16)',
          'custom-elevation-4': 'rgba(255, 255, 255, 0.24)',
          'custom-elevation-5': 'rgba(255, 255, 255, 0.32)',
          'custom-elevation-6': 'rgba(255, 255, 255, 0.4)',
          'custom-elevation-7': 'rgba(255, 255, 255, 0.48)',
          'custom-elevation-8': 'rgba(255, 255, 255, 0.56)',
          'custom-elevation-9': 'rgba(255, 255, 255, 0.64)',
          'custom-elevation-10': 'rgba(255, 255, 255, 0.72)',
          'custom-elevation-11': 'rgba(255, 255, 255, 0.8)',
          'custom-elevation-12': 'rgba(255, 255, 255, 0.88)',
        }
      },
      aspectRatio: {
        '3/2': '3 / 2',
        '16/6': '16 / 6'
      },
      keyframes: {
        messagePing: {
          '0%, 25%': { transform: 'scale(1.0)', opacity: '1'},
          '25%, 50%': { transform: 'scale(1.02)', opacity: '1'},
          '50%, 75%': { transform: 'scale(1.02)', opacity: '1'},
          '75%, 100%': { transform: 'scale(1.0)', opacity: '1'},
        },
      },
      animation: {
        'messagePing': 'messagePing 1s linear infinite'
      }
    },
  },
  plugins: [require('tailwindcss-elevation')({
    customClasses: {
      'elevation-custom': 'box-shadow: 0px 3px 3px -2px rgba(0,0,0,0.20), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12);',
    },
  }),],
}