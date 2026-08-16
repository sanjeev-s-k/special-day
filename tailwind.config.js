/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FAF6F0',
          100: '#F5EFEB',
          200: '#EFE7DE',
          300: '#E4D8CA',
          400: '#D5C4B1',
          500: '#9E8B76',
        },
        romance: {
          50: '#FFF1F2',
          100: '#FFE4E6',
          200: '#FECDD3',
          300: '#FDA4AF',
          400: '#FB7185',
          500: '#F43F5E',
          600: '#E11D48',
          700: '#BE123C',
          800: '#9F1239',
          900: '#881337',
          950: '#4C0519',
        },
        lavender: {
          50: '#FAF5FF',
          100: '#F3E8FF',
          200: '#E9D5FF',
          300: '#D8B4FE',
          400: '#C084FC',
          500: '#A855F7',
          600: '#9333EA',
          700: '#7E22CE',
          800: '#6B21A8',
          900: '#581C87',
        },
        vintage: {
          ink: '#1F1818',
          charcoal: '#322728',
          muted: '#615253',
          paper: '#FDFBF7',
          card: '#FFFDF9',
          tape: 'rgba(245, 235, 215, 0.75)',
          gold: '#C59B27',
          wine: '#72142B',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        handwriting: ['"Caveat"', '"Reenie Beanie"', 'cursive'],
        script: ['"Reenie Beanie"', '"Caveat"', 'cursive'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'polaroid': '0 10px 25px -5px rgba(44, 25, 25, 0.12), 0 8px 10px -6px rgba(44, 25, 25, 0.08)',
        'polaroid-hover': '0 25px 40px -10px rgba(76, 5, 25, 0.22), 0 15px 20px -8px rgba(76, 5, 25, 0.12)',
        'polaroid-deep': '0 20px 35px -8px rgba(76, 5, 25, 0.18), 0 1px 3px 0 rgba(0, 0, 0, 0.05)',
        'scrapbook-tape': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'letter': '0 15px 35px -5px rgba(50, 20, 25, 0.18), 0 5px 15px rgba(0,0,0,0.05)',
      },
      animation: {
        'float-slow': 'float 7s ease-in-out infinite',
        'float-reverse': 'floatReverse 8s ease-in-out infinite',
        'gentle-pulse': 'gentlePulse 3s ease-in-out infinite',
        'flame-flicker': 'flicker 1.8s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(1.5deg)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(10px) rotate(-1.5deg)' },
        },
        gentlePulse: {
          '0%, 100%': { opacity: '0.85', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.03)' },
        },
        flicker: {
          '0%': { transform: 'scale(1) rotate(-1deg)', opacity: '0.9' },
          '25%': { transform: 'scale(1.08, 0.95) rotate(2deg)', opacity: '1' },
          '50%': { transform: 'scale(0.96, 1.05) rotate(-2deg)', opacity: '0.85' },
          '75%': { transform: 'scale(1.05, 1) rotate(1deg)', opacity: '0.95' },
          '100%': { transform: 'scale(1.02, 1.02) rotate(0deg)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
