module.exports = {
  content: ['./src/**/*.html', './src/**/*.js', './src/*.html'],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#292D32',
        'primary-lighten': '#E6EFFF',
        'primary-blue': '#21ADFD',
        'primary-light': '#DBE8FF',
        'primary-red': '#DB2952',
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(135deg, #21D4FD 0%, #2152FF 100%)',
      },
      borderRadius: {
        primary: '1.25rem /* 20px */',
      },
      boxShadow: {
        primary: '0px 8px 16px rgba(41, 45, 50, 0.1)',
      },

      animation: {
        rotate: 'rotate 1500ms ease-in-out infinite',
      },
      keyframes: {
        rotate: {
          '0%': { transform: 'rotate(0)' },
          '100%': { transform: 'rotate(-1turn)' },
        },
      },
    },

    screens: {
      '2xl': { max: '1535px' },
      xl: { max: '1279px' },
      '2lg': { max: '1140px' },
      lg: { max: '1023px' },
      md: { max: '767px' },
      sm: { max: '639px' },
      xs: { max: '536px' },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
