import { extendTheme } from "native-base";

export const BASETHEME = extendTheme({
  colors: {
    primary: {
      300: '#D4D8F0',
      500: '#232946',
      700: '#121629'
    },
    secondary: {
      100: '#fffffc',
      300: "#FDEBED",
      700: '#EEBBC3',
      900: '#d4939d'
    },
  },
  fonts: {
    body: 'Roboto_400Regular',
    bold: 'Roboto_700Bold'
  }

})