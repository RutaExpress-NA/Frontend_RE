import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./features/auth/AuthContext";
import { AppRoutes } from "./routes/AppRoutes";
import { ThemeProvider } from "./context/ThemeContext";
import { SessionExpiryModal } from "./features/auth/SessionExpiryModal";
import { ErrorBoundary } from "./ui/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <AppRoutes />
          <SessionExpiryModal />
        </AuthProvider>
      </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App
