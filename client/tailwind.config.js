/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#F5C542',
          dark: '#D4A017',
          light: '#FEF3C7',
          xlight: '#FFFBEB',
        },
        accent: {
          DEFAULT: '#F59E0B',
          dark: '#D97706',
        },
        beige: '#FDF6E3',
        ivory: '#FFFDF7',
        'warm-100': '#F5EED8',
        'warm-200': '#E8DFC6',
        'warm-300': '#D6CEB5',
        ink: {
          DEFAULT: '#3A3A3A',
          sub: '#6B6B6B',
          muted: '#9CA3AF',
        },
        'warm-border': '#E8E2D9',
        'warm-border-strong': '#D0C9BC',
        'footer-dark': '#2C2416',
        'footer-text': '#D1C9B8',
        'footer-muted': '#8A7D6B',
      },
      boxShadow: {
        'warm-xs': '0 1px 2px 0 rgba(60,40,10,0.04)',
        'warm-sm': '0 1px 4px 0 rgba(60,40,10,0.06), 0 1px 2px -1px rgba(60,40,10,0.04)',
        'warm-md': '0 4px 12px 0 rgba(60,40,10,0.09), 0 2px 4px -2px rgba(60,40,10,0.05)',
        'warm-lg': '0 8px 24px 0 rgba(60,40,10,0.12), 0 4px 8px -4px rgba(60,40,10,0.06)',
        'warm-glow': '0 0 0 3px rgba(245,197,66,0.35)',
      },
      fontFamily: {
        sans: ["'Noto Sans KR'", 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

