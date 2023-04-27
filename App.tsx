import { Box } from "native-base";
import { AppThemeProvider } from "./src/context/ThemeContext";

export default function App() {
  return (
    <AppThemeProvider>
      <Box>olá</Box>
    </AppThemeProvider>
  );
}
