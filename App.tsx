import { Box } from "native-base";
import { AppThemeProvider } from "./src/context/ThemeContext";
import { Login } from "./src/screens/Login";

export default function App() {
  return (
    <AppThemeProvider>
      <Login />
    </AppThemeProvider>
  );
}
