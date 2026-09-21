import { useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { Button } from "../../ui/Button";
import { Card } from "../../ui/Card";
import { SunIcon, MoonIcon } from "../../ui/Icons";
import { LoginBackground } from "../../ui/LoginBackground";
import logo from "../../assets/logo.png";

export function LoginPage() {
    const { login } = useAuth();
    const location = useLocation();
    const { darkMode, toggleDarkMode } = useTheme();

    const showExpiredNotice = location.state?.sessionExpired === true;

    function handleMicrosoftLogin() {
    login(); 
    }

    return (
        <div className="rex-login-page">
            <button type="button" onClick={toggleDarkMode} className="rex-login-page__dark-toggle">
                {darkMode ? <SunIcon size={14} /> : <MoonIcon size={14} />}
                <span>{darkMode ? "Modo claro" : "Modo oscuro"}</span>
            </button>

            <LoginBackground />

            {showExpiredNotice && (
            <div className="rex-login-card__expired-notice">
                Tu sesión anterior expiró por inactividad. Inicia sesión nuevamente.
            </div>
            )}

            <Card padding="lg" className="rex-login-card">
                <div className="rex-login-card__header">
                    <img src={logo} alt="Rutas Express" className="rex-login-card__logo" />
                </div>

                <h1 className="rex-login-card__title">¡Bienvenido de vuelta!</h1>
                <p className="rex-login-card__subtitle">
                    Gestiona tus envíos, rutas y entregas desde un solo lugar.
                </p>

                <Button variant="primary" fullWidth size="lg" icon={<MicrosoftIcon />} onClick={handleMicrosoftLogin}>
                    Iniciar sesión con Microsoft
                </Button>
            </Card>
        </div>
    );
}

function MicrosoftIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 21 21" aria-hidden="true">
            <rect x="1" y="1" width="9" height="9" fill="#f25022" />
            <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
            <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
            <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
        </svg>
    );
}