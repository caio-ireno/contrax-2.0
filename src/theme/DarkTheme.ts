import { extendTheme } from "native-base";

export const DARKTHEME = extendTheme({
  colors: {
    primary: {
      300: '#232946',
      500: '#D4D8F0',
      700: '#fffff0'
    },
    secondary: {
      700: '#EEBBC3'
    },
  },
  fonts: {
    body: 'Roboto'
  }

})