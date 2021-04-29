module.exports = {
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
      'main': '#EDF2F7',
     }),
    extend: {
      fontSize: {
        base: ['18px', '24px'],
      },
      gridTemplateRows: {
       'layout': '200px 1fr 32px',
      },
      gridTemplateColumns: {
       'index-contents': '2.6fr 1fr',
      },
      textColor: {
        'light-black': 'rgba(0, 0, 0, 0.82)'
      },
    },
  },
  plugins: [],
}
