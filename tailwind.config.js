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
    },

    screens: {
      '2xl': { max: '1535px' },
      xl: { max: '1279px' },
      lg: { max: '1023px' },
      md: { max: '767px' },
      sm: { max: '639px' },
      xs: { max: '479px' },
    },
  },
  plugins: [],
};
