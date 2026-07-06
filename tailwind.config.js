/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0D4A8B',
        'primary-dark': '#0A3A6E',
        secondary: '#1E6FB9',
        accent: '#F26C21',
        'accent-dark': '#D4580F',
        warm: '#D84B2A',
        bg: '#F8FAFC',
        surface: '#FFFFFF',
        'text-primary': '#1B263B',
        'text-secondary': '#475569',
        border: '#E2E8F0',
        success: '#16A34A',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '20px',
        '3xl': '28px',
      },
      boxShadow: {
        'soft': '0 4px 24px rgba(13, 74, 139, 0.08)',
        'medium': '0 8px 40px rgba(13, 74, 139, 0.14)',
        'strong': '0 16px 60px rgba(13, 74, 139, 0.20)',
        'card': '0 2px 16px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 12px 40px rgba(13, 74, 139, 0.18)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #0D4A8B 0%, #1E6FB9 100%)',
        'gradient-accent': 'linear-gradient(135deg, #F26C21 0%, #D84B2A 100%)',
        'gradient-hero': 'linear-gradient(135deg, rgba(13,74,139,0.92) 0%, rgba(30,111,185,0.78) 100%)',
        'gradient-surface': 'linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
}
