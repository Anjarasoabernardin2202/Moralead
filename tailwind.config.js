/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'star-twinkle': 'star-twinkle 3s ease-in-out infinite',
        'star-sparkle': 'star-sparkle 4s ease-in-out infinite',
        'star-brilliant': 'star-brilliant 5s ease-in-out infinite',
        'planet-orbit': 'planet-orbit 20s linear infinite',
        'planet-rotate': 'planet-rotate 10s linear infinite',
        'ring-rotate': 'ring-rotate 8s linear infinite',
        'galaxy-rotate': 'galaxy-rotate 30s linear infinite',
        'logo-pulse': 'logo-pulse 3s ease-in-out infinite',
        'float-gentle': 'float-gentle 6s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 8s ease-in-out infinite',
      },
      keyframes: {
        'star-twinkle': {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '25%': { opacity: '0.8', transform: 'scale(1.1)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
          '75%': { opacity: '0.8', transform: 'scale(1.1)' },
        },
        'star-sparkle': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1) rotate(0deg)', filter: 'hue-rotate(0deg)' },
          '25%': { opacity: '0.9', transform: 'scale(1.15) rotate(90deg)', filter: 'hue-rotate(90deg)' },
          '50%': { opacity: '1', transform: 'scale(1.3) rotate(180deg)', filter: 'hue-rotate(180deg)' },
          '75%': { opacity: '0.9', transform: 'scale(1.15) rotate(270deg)', filter: 'hue-rotate(270deg)' },
        },
        'star-brilliant': {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1) rotate(0deg)', filter: 'brightness(1)' },
          '25%': { opacity: '0.9', transform: 'scale(1.1) rotate(90deg)', filter: 'brightness(1.2)' },
          '50%': { opacity: '1', transform: 'scale(1.2) rotate(180deg)', filter: 'brightness(1.5)' },
          '75%': { opacity: '0.9', transform: 'scale(1.1) rotate(270deg)', filter: 'brightness(1.2)' },
        },
        'planet-orbit': {
          '0%': { transform: 'translateX(0) translateY(0) rotate(0deg)' },
          '25%': { transform: 'translateX(10px) translateY(-5px) rotate(90deg)' },
          '50%': { transform: 'translateX(0) translateY(-10px) rotate(180deg)' },
          '75%': { transform: 'translateX(-10px) translateY(-5px) rotate(270deg)' },
          '100%': { transform: 'translateX(0) translateY(0) rotate(360deg)' },
        },
        'planet-rotate': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'ring-rotate': {
          '0%': { transform: 'rotateX(75deg) rotateZ(0deg)' },
          '100%': { transform: 'rotateX(75deg) rotateZ(360deg)' },
        },
        'galaxy-rotate': {
          '0%': { transform: 'rotate(0deg) scale(1)', opacity: '0.3' },
          '50%': { transform: 'rotate(180deg) scale(1.1)', opacity: '0.6' },
          '100%': { transform: 'rotate(360deg) scale(1)', opacity: '0.3' },
        },
        'logo-pulse': {
          '0%, 100%': { transform: 'scale(1)', boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)' },
          '50%': { transform: 'scale(1.05)', boxShadow: '0 0 30px rgba(59, 130, 246, 0.8)' },
        },
        'float-gentle': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)', opacity: '0.7' },
          '25%': { transform: 'translateY(-10px) rotate(90deg)', opacity: '0.9' },
          '50%': { transform: 'translateY(-20px) rotate(180deg)', opacity: '1' },
          '75%': { transform: 'translateY(-10px) rotate(270deg)', opacity: '0.9' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
};