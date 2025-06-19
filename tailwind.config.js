/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // Updated color palette to purple theme
      colors: {
        brand: {
          purple: '#a855f7',      // Primary Accent - Bright purple
          'purple-dark': '#9333ea', // CTA Button Glow - Deeper electric purple
          'purple-deep': '#6b21a8', // Play Bar Purple - Deep violet-purple
          black: '#0a0a0a',       // Background - Near-black, very dark gray
          white: '#ffffff',       // Text (Headline) - Pure white
          gray: '#d1d5db',        // Secondary Text - Light gray
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        bricolage: ['"Bricolage Grotesque"', 'sans-serif'],
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'purple': '0 20px 25px -5px rgba(168, 85, 247, 0.3), 0 10px 10px -5px rgba(168, 85, 247, 0.1)',
        'purple-lg': '0 25px 50px -12px rgba(168, 85, 247, 0.4)',
      },
    },
  },
  plugins: [],
};