import { Loading } from "./src/components/Loading";
import { AppThemeProvider } from "./src/context/ThemeContext";
import { Login } from "./src/screens/Login";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { Contractions } from "./src/screens/Contractions";

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });
  return (
    <AppThemeProvider>
      {fontsLoaded ? <Contractions /> : <Loading />}
    </AppThemeProvider>
  );
}
