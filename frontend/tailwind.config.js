/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'primary': ["Plus Jakarta Sans", "sans-serif"],
        'secondary': ['Inter', "sans-serif"],
      },

      colors: {
        'sidebar-grey': '#F7F8FA',
        'line': '#EAEAEA',
        'header-bg': '#FAFAFA',
        'border-color': '#DADDDD',
        'gmail': '#787486',
        'search-icon': '#78828A',
        'error': '#ED544E',
        'error-gradient':'#ED544E1F',
        'success': '#66C87B',
        'purp': '#6160DC',
        'blu': '#54C5EB',
        'orang': '#FFB74A',
        'trends': '#525252',
        'heading': '#26282C',
        'platform-black': '#22242C',
        'grn': '#34CAA5',
        'previous-month': '#606060',
        'grn-gradient': '#34CAA51F',
        'total-order': '#898989',
        'trend-value': '#3A3F51',
        'date': '#737373',
        'amount': '#0D062D',
        'table-head': '#9CA4AB'
      },

      spacing: {
        'schedulePage': ' 500px',
        'btn': '120px',
        'prescription': '178px'
      },

      gridTemplateColumns: {
        'layout': '30% auto',
        'dashboard': '1fr 1fr',
        'homepage': '180px auto',
        'dash': 'auto auto',
        'dash-table': '2fr 1fr 1fr',
        'table': '2fr 1fr 1fr 1fr 1fr',
        'dash-appointments': '26px auto'
      }, 

      borderRadius: {
        'signup': '10px 10px 10px 50px',
        'login': '10px 10px 50px 10px',
      },

      gridTemplateRows: {
        'dashH': '257px 257px',
        'main': '70px auto',
      },
    },
  },
  plugins: [],
}