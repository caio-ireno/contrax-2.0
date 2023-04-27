import { Loading } from "./src/components/Loading";
import { AppThemeProvider } from "./src/context/ThemeContext";
import { Login } from "./src/screens/Login";
import { useFonts, Roboto_400Regular } from "@expo-google-fonts/roboto";

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular });
  return (
    <AppThemeProvider>{fontsLoaded ? <Login /> : <Loading />}</AppThemeProvider>
  );
}
