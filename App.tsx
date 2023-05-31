import {
  Signika_400Regular,
  Signika_500Medium,
  Signika_600SemiBold,
  useFonts,
} from '@expo-google-fonts/signika'

import { Loading } from './src/components/Loading'
import { AppThemeProvider } from './src/context/ThemeContext'
import { Routes } from './src/routes'

export default function App() {
  const [fontsLoaded] = useFonts({
    Signika_400Regular,
    Signika_500Medium,
    Signika_600SemiBold,
  })
  return (
    <AppThemeProvider>
      {fontsLoaded ? <Routes /> : <Loading />}
    </AppThemeProvider>
  )
}
