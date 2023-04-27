import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { BASETHEME, DARKTHEME } from "../theme";
import { Box, NativeBaseProvider } from "native-base";

interface ThemeContextProps {
  themeName: "base" | "dark";
  toggleTheme: () => void;
}

interface AppThemeProviderProps {
  children: React.ReactNode;
}

const ThemeContext = createContext({} as ThemeContextProps);

export const useAppThemeContext = () => {
  return useContext(ThemeContext);
};

export const AppThemeProvider: React.FC<AppThemeProviderProps> = ({
  children,
}) => {
  const [themeName, setThemeName] = useState<"base" | "dark">("base");

  const toggleTheme = useCallback(() => {
    setThemeName((OldTheme) => (OldTheme === "base" ? "dark" : "base"));
  }, []);

  const theme = useMemo(() => {
    if (themeName === "base") return BASETHEME;
    return DARKTHEME;
  }, [themeName]);

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <NativeBaseProvider theme={theme}>
        <Box height={"100%"} backgroundColor={theme.colors.primary[300]}>
          {children}
        </Box>
      </NativeBaseProvider>
    </ThemeContext.Provider>
  );
};
