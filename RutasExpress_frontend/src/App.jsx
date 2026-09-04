import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./features/auth/AuthContext";
import { DevRoleSwitcher } from "./features/auth/DevRoleSwitcher";
import { AppRoutes } from "./routes/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
        <DevRoleSwitcher />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App
