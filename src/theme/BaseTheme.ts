import { extendTheme } from "native-base";

export const BASETHEME = extendTheme({
  colors: {
    primary: {
      100: '#E6E8F6',
      200: '#C0C4E2',
      300: '#D4D8F0',
      400: '#A9B2E4',
      500: '#6873B1',
      600: '#1C2238',
      700: '#121629',
      800: '#0D1021',
      900: '#080B16',
    },
    secondary: {
      100: '#fffffc',
      200: '#fceeee',
      300: '#FDEBED',
      400: '#F9D9C2',
      500: '#F4BE8D',
      600: '#EFA5A5',
      700: '#EEBBC3',
      800: '#D98E8A',
      900: '#d4939d',
    },
    text: {
      primary: 'black',
      secondary: 'white',
    },

  },
  fonts: {
    body: 'Signika_400Regular',
    bold: 'Signika_600SemiBold'
  }
})