import { extendTheme } from 'native-base'

export const DARKTHEME = extendTheme({
  colors: {
    primary: {
      100: '#fffffc', //co
      200: '#94a1b2', //cor da barra de configuração
      300: '#72757e', //cor do background
      400: '#76D7C4',
      500: '#94a1b2', //cor do botão
      700: '#121629', //cor login page
    },
    secondary: {
      100: '#fffffc', //cor de fundo do texto e alguns textos
      300: '#A3E4D7', // on hover login
      700: '#2cb67d', //cor dos botões
      800: '#000', //logo pagina ajuda
      900: '#76D7C4', // on hover button
    },
  },
  fonts: {
    body: 'Roboto',
  },
})
