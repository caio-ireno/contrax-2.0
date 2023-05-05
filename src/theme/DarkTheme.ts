import { extendTheme } from "native-base";

export const DARKTHEME = extendTheme({
  colors: {
    secondary: {
      100: '#E6E8F6',
      200: '#C0C4E2',
      300: '#D4D8F0',
      400: '#A9B2E4',
      500: '#6873B1',
      600: '#1C2238',
      700: '#A9B2E4',
      800: '#0D1021',
      900: '#080B16',
    },
    primary: {
      100: '#fffffc',
      200: '#F8F0E3',
      300: '#EEBBC3',
      400: '#F9D9C2',
      500: '#d4939d',
      600: '#EFA5A5',
      700: '#EEBBC3',
      800: '#D98E8A',
      900: '#d4939d',
    },

  },
  fonts: {
    body: 'Roboto'
  }

})