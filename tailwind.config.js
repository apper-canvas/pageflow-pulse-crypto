/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Merriweather', 'serif'],
        'body': ['Lora', 'serif'],
      },
      colors: {
        primary: '#2C3E50',
        secondary: '#7F8C8D',
        accent: '#E74C3C',
        surface: '#FFFFFF',
        background: '#F8F9FA',
        success: '#27AE60',
        warning: '#F39C12',
        error: '#E74C3C',
        info: '#3498DB',
        dark: {
          primary: '#ECDBBA',
          secondary: '#BDC3C7',
          accent: '#E74C3C',
          surface: '#2C3E50',
          background: '#1A252F',
        }
      },
      transitionDuration: {
        '200': '200ms',
        '300': '300ms',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}