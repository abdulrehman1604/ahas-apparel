/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs", "./public/js/**/*.js"],
  theme: {
    extend: {
      colors: {
        paper: '#FAFAF6',
        'paper-dim': '#F1EEE5',
        ink: '#151F2B',
        'ink-soft': '#54606D',
        denim: {
          DEFAULT: '#22406A',
          deep: '#101B2D',
          700: '#1B3357'
        },
        orange: {
          DEFAULT: '#E85C33',
          deep: '#C7451F',
          light: '#FCE4DA'
        },
        tan: '#CBB68C',
        line: '#DFDACB'
      },
      fontFamily: {
        display: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'ui-monospace', 'monospace']
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'ken-burns': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.12)' }
        },
        'slide-fade': {
          '0%, 100%': { opacity: '0' },
          '8%, 28%': { opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'draw-line': {
          '0%': { width: '0%' },
          '100%': { width: '100%' }
        }
      },
      animation: {
        'fade-up': 'fade-up 0.8s ease-out forwards',
        'fade-in': 'fade-in 1s ease-out forwards',
        'ken-burns': 'ken-burns 12s ease-out forwards',
        marquee: 'marquee 28s linear infinite',
        float: 'float 4s ease-in-out infinite',
        'draw-line': 'draw-line 1.2s ease-out forwards'
      }
    },
  },
  plugins: [],
}
