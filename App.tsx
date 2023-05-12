import { Loading } from "./src/components/Loading";
import { AppThemeProvider } from "./src/context/ThemeContext";
import { Login } from "./src/screens/Login";
import {
  useFonts,
  Signika_400Regular,
  Signika_500Medium,
  Signika_600SemiBold,
} from "@expo-google-fonts/signika";
import { Routes } from "./src/routes";

export default function App() {
  const [fontsLoaded] = useFonts({
    Signika_400Regular,
    Signika_500Medium,
    Signika_600SemiBold,
  });
  return (
    <AppThemeProvider>
      {fontsLoaded ? <Routes /> : <Loading />}
    </AppThemeProvider>
  );
}
