import { extendTheme } from "native-base";

export const BASETHEME = extendTheme({
  colors: {
    primary: {
      200: '#C0C4E2', //cor da barra de configuração
      300: '#D4D8F0', //cor do background
      400: '#7FB3D5',
      500: '#6873B1', //cor do botão
      700: '#121629', //cor login page

    },
    secondary: {
      100: '#fffffc', //cor de fundo do texto e alguns textos e background do login
      300: '#FDEBED', // on hover login
      700: '#EEBBC3', //cor dos botões
      800: '#080B16', // logo pagina ajuda
      900: '#EFA5A5', // on hover button
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