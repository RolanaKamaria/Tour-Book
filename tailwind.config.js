/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/**/**/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      'drop-shadow-md': {
        filter: 'drop-shadow(0 4px 3px rgb(125,143,154/ 0.07)) drop-shadow(0 2px 2px rgb(125,143,154 / 0.06))'
      },
      fontFamily: {
        'sans': [
          '-apple-system',
          'BlinkMacSystemFont',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ]
      },
      'serif': ['ui-serif', 'Georgia'],
      'mono': ['ui-monospace', 'SFMono-Regular'],
      'display': ['Oswald'],
      'body': ['"Open Sans"'],
    },
    darkMode: 'selector',
    colors: {
      'text': {
        light: '#024932',
      },
      'title': {
        light: '#09855E'
      },
      'orgnizerbg': {
        light: '#ECF3FA'
      },
      'offerbg': {
        light: '#E0E8E5'
      },
      'chatbg':{
        light:'#bcbcbc'
      },
      'input-text': {
        light: '#000000'
      },
      'backOpacityBgFrom': {
        light: '#AFF1E5'
      },
      'backOpacityBgTo': {
        light: '#FFE6A6'
      },
      'add-button': {
        light: '#359C88'
      },
      'add-button-hover': {
        light: '#0F6051'
      },
      'change-button': {
        light: '#EE9C3D'
      },
      'change-button-hover': {
        light: '#E58D27'
      },
      'save-button': {
        light: '#2D9F31'
      },
      'save-button-hover': {
        light: '#117315'
      },
      'back-button': {
        light: '#6E8085'
      },
      'back-button-hover': {
        light: "#285764"
      },
      'delete-button': {
        light: '#E44B37'
      },
      'delete-button-hover': {
        light: '#AA2D1C'
      },
      'details-button': {
        light: '#CDC504'
      },
      'details-button-hover': {
        light: '#C5BD06'
      },
      'button-text': {
        light: '#ffffff'
      },
      'error': {
        light: '#F81010'
      },
      'post-bg': {
        light: '#FEFFFF'
      },
      'selected-bg': {
        light: '#B7CDC6'
      },
      'clientbg':{
        light: '#EBF6DA'
      },
      'loginButtonText': {
        light: '#503900'
      },
      'login-button-hover': {
        light: '#FFD870'
      },
      'loginBackgroundFrameTo': {
        light: '#FCFEFE'
      },
      'loginBackgroundFrameFrom': {
        light: '#CFF2EB'
      },
      'clientBackgroundTo': {
        light: '#FFDB80'
      },
      'clientBackgroundVia': {
        light: '#83FFE9'
      },
      'clientBackgroundFrom': {
        light: '#2AD6B4'
      },
      'loginButtonFrom': {
        light: '#D3A84C'
      },
      'loginButtonVia': {
        light: '#FFDD8E'
      },
      'loginButtonTo': {
        light: '#E1B453'
      },
      'inputLabel': {
        light: '#ECFCFB'
      },
      'inputLabelShadow': {
        light: '#0A2737'
      },
      'presenterbg': {
        light: '#FFF5E9'
      },
      'navItem': {
        light: '#F5DFAC'
      },
      'presenterPostDetails': {
        light: "#FFE0BA"
      },
      'offerTitle': {
        light: '#F0911D'
      },
      'clientInvite': {
        light: '#AFF4DB'
      },

    },
    fontFamily: {
      // 'footer':['"javanese-Text"'],
    }
  },
  plugins: [
    //to clamp long text
    require('@tailwindcss/line-clamp'),
  ],
}

