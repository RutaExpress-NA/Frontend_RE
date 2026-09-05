import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./features/auth/AuthContext";
import { DevRoleSwitcher } from "./features/auth/DevRoleSwitcher";
import { AppRoutes } from "./routes/AppRoutes";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <BrowserRouter>
    <ThemeProvider>
      <AuthProvider>
        <AppRoutes />
        <DevRoleSwitcher />
      </AuthProvider>
    </ThemeProvider>
    </BrowserRouter>
  );
}

export default App
