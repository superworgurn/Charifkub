module.exports = {
   darkMode: 'class',

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        pulse: 'pulse 3s ease-in-out infinite',
        rotate: 'rotate 15s linear infinite',
        bounce: 'bounce 2s ease-in-out infinite',
        slideUp: 'slideUp 1s ease-out both',
        fadeIn: 'fadeIn 1.5s ease-in-out both',
        glow: 'glow 3s ease-in-out infinite',
        float: 'float 10s infinite linear',
        typing: 'typing 3.5s steps(40, end)',
        spinslow: 'spin 3s linear infinite',
        pulseslow: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'

      },
      keyframes: {
        pulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' }
        },
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(59, 130, 246, 0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.6)' }
        },
        float: {
          '0%': { transform: 'translateY(0) translateX(0) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(-100vh) translateX(100px) rotate(360deg)', opacity: '0' }
        },
        typing: {
          from: { width: '0' },
          to: { width: '100%' }
        }
      }
    },
  },
  plugins: [],
}