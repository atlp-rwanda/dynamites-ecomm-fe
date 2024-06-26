// tailwind.config.js

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: '320px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
    },
    extend: {
      colors: {
        footerGray: '#FAFAFB',
        yellowBg: '#F3C63F',
        white: '#FFFFFF',
        violeteBg: '#F5F1FE',
        blueBg: '#15ABFF',
        primary: '#6D31ED',
        grayDark: '#CCD0D8',
        grayLight: '#F3F4F6',
        redBg: '#DC2627',
        textBlack: '#171A1F',
        lightGrey: '#DEE1E6',
        grey: '#565D6D',
      },
      fontFamily: {
        Lexend: ['Lexend'],
      },
      animation: {
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
