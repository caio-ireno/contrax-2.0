import { Box, NativeBaseProvider, StatusBar } from 'native-base'
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

import { BASETHEME, DARKTHEME } from '../theme'

interface ThemeContextProps {
  themeName: 'base' | 'dark'
  toggleTheme: () => void
}

interface AppThemeProviderProps {
  children: React.ReactNode
}

const ThemeContext = createContext({} as ThemeContextProps)

export const useAppThemeContext = () => {
  return useContext(ThemeContext)
}

export const AppThemeProvider: React.FC<AppThemeProviderProps> = ({
  children,
}) => {
  const [themeName, setThemeName] = useState<'base' | 'dark'>('base')

  const toggleTheme = useCallback(() => {
    setThemeName(OldTheme => (OldTheme === 'base' ? 'dark' : 'base'))
  }, [])

  const theme = useMemo(() => {
    if (themeName === 'base') return BASETHEME
    return DARKTHEME
  }, [themeName])

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <NativeBaseProvider theme={theme}>
        <StatusBar
          backgroundColor="transparent"
          barStyle="dark-content"
          translucent
        />
        <Box height={'100%'}>{children}</Box>
      </NativeBaseProvider>
    </ThemeContext.Provider>
  )
}
