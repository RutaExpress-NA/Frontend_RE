import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { Button } from "../../ui/Button";
import { Card } from "../../ui/Card";
import { SunIcon, MoonIcon } from "../../ui/Icons";
import { LoginBackground } from "../../ui/LoginBackground";
import logo from "../../assets/logo.png";

export function LoginPage() {
    const { login, __mockUsers } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const { darkMode, toggleDarkMode } = useTheme();

    function handleMicrosoftLogin() {
        login(__mockUsers[0].id);
        const from = location.state?.from?.pathname || "/dashboard";
        navigate(from, { replace: true });
    }

    return (
        <div className="rex-login-page">
            <button type="button" onClick={toggleDarkMode} className="rex-login-page__dark-toggle">
                {darkMode ? <SunIcon size={14} /> : <MoonIcon size={14} />}
                <span>{darkMode ? "Modo claro" : "Modo oscuro"}</span>
            </button>

            <LoginBackground />

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

                <div className="rex-login-card__divider">
                    <span>o</span>
                </div>

                <fieldset disabled className="rex-login-card__fieldset">
                    <input type="email" placeholder="correo@empresa.com" className="rex-login-card__input" />
                    <input type="password" placeholder="Contraseña" className="rex-login-card__input" />
                    <Button variant="danger" fullWidth size="lg" iconRight="→">
                        Entrar
                    </Button>
                </fieldset>
                <p className="rex-login-card__disabled-note">Disponible próximamente o no nose si pasa edito aca</p>
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