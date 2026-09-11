/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        kirei: {
          bg: '#0B0F19',
          surface: '#111827',
          panel: '#151D2E',
          card: '#1B2438',
          cardHover: '#222E46',
          border: '#27344D',
          borderSubtle: '#1C263A',
          borderHighlight: '#3B4B6A',
          purple: {
            DEFAULT: '#8B5CF6',
            light: '#A78BFA',
            dark: '#6D28D9',
            glow: '#8B5CF680',
          },
          pink: {
            DEFAULT: '#EC4899',
            light: '#F472B6',
            dark: '#DB2777',
            glow: '#EC489980',
          },
          yellow: {
            DEFAULT: '#FBBF24',
            light: '#FDE68A',
            dark: '#D97706',
            glow: '#FBBF2480',
          },
          cyan: {
            DEFAULT: '#06B6D4',
            light: '#67E8F9',
            dark: '#0891B2',
          },
          green: {
            DEFAULT: '#10B981',
            light: '#6EE7B7',
            dark: '#059669',
          },
          text: {
            primary: '#F8FAFC',
            secondary: '#94A3B8',
            muted: '#64748B',
            dim: '#475569',
          }
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'Consolas', 'monospace'],
        pixel: ['"Silkscreen"', '"Press Start 2P"', 'monospace'],
        retro: ['"DotGothic16"', 'sans-serif'],
      },
      boxShadow: {
        'glow-purple': '0 0 25px -5px rgba(139, 92, 246, 0.4)',
        'glow-pink': '0 0 25px -5px rgba(236, 72, 153, 0.4)',
        'glow-yellow': '0 0 25px -5px rgba(251, 191, 36, 0.4)',
        'glow-cyan': '0 0 25px -5px rgba(6, 182, 212, 0.4)',
        'pixel-solid': '3px 3px 0px 0px rgba(0, 0, 0, 0.7)',
        'pixel-accent': '3px 3px 0px 0px #8B5CF6',
        'pixel-pink': '3px 3px 0px 0px #EC4899',
        'pixel-yellow': '3px 3px 0px 0px #FBBF24',
        'panel': '0 10px 30px -10px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)',
      },
      animation: {
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'sweep': 'sweep 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'pulse-subtle': 'pulseSubtle 2.5s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        sparkle: {
          '0%, 100%': { transform: 'scale(0.8) rotate(0deg)', opacity: '0.4' },
          '50%': { transform: 'scale(1.2) rotate(15deg)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        sweep: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '50%': { opacity: '0.8' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
