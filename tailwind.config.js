module.exports = {
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
      main: '#EDF2F7',
    }),
    extend: {
      fontSize: {
        base: ['16px', '24px'],
      },
      gridTemplateRows: {
        layout: '200px 1fr 50px',
      },
      gridTemplateColumns: {
        'index-contents': '2fr 1fr',
      },
      textColor: {
        'light-black': 'rgba(0, 0, 0, 0.82)',
      },
      padding: {
        'ogp-height': '52.5%',
        'index-width': '13%',
      },
    },
  },
  plugins: [],
}
