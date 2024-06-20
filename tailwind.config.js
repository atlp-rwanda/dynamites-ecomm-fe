export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: '320px',
      sm: '640px',
      md: '768px',
      lg: '1440px',
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
        black: '#171A1F',
      },
      fontFamily: {
        Lexend: ['Lexend'],
      },
    },
  },
  plugins: [],
};
