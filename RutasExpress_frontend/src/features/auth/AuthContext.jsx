/* eslint-disable react-hooks/purity */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
import { createContext, useContext, useState, useEffect, useRef} from "react";
import mockUsers from "../../mocks/users.json";
/**
 * AuthContext (MOCK)
 * ------------------
 * Este contexto imita a propósito la forma final que va a tener
 * @azure/msal-react cuando conectemos Azure AD de verdad
 */

const AuthContext = createContext(null);

const MOCK_SESSION_KEY = "rutaexpress_mock_user_id";

const MOCK_TOKEN_LIFETIME_SECONDS = 20 * 60; // 20 minutos
const SESSION_WARNING_SECONDS = 60; // avisa 1 minuto antes de expirar
const RENEWED_MESSAGE_SECONDS = 2.5; // cuánto dura el mensaje "renovado"

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // 'hidden' | 'warning' | 'expired' | 'renewed'
    const [sessionState, setSessionState] = useState("hidden");
    const [expiresOn, setExpiresOn] = useState(null);
    const [expiredNotice, setExpiredNotice] = useState(false);

    const warningTimerRef = useRef(null);
    const expiryTimerRef = useRef(null);
    const renewedTimerRef = useRef(null);

    function clearAllTimers() {
        clearTimeout(warningTimerRef.current);
        clearTimeout(expiryTimerRef.current);
        clearTimeout(renewedTimerRef.current);
    }

    function scheduleTimers(expiryDate) {
        clearAllTimers();

        const msUntilExpiry = expiryDate.getTime() - Date.now();
        const msUntilWarning = msUntilExpiry - SESSION_WARNING_SECONDS * 1000;

        if (msUntilWarning > 0) {
        warningTimerRef.current = setTimeout(() => {
            setSessionState("warning");
        }, msUntilWarning);
        } else {
            // Por si acaso el tiempo configurado es menor al margen de aviso
            setSessionState("warning");
        }

        expiryTimerRef.current = setTimeout(() => {
            handleExpiry();
        }, Math.max(msUntilExpiry, 0));
    }

    function handleExpiry() {
        clearAllTimers();
        localStorage.removeItem(MOCK_SESSION_KEY);
        setUser(null);
        setExpiresOn(null);
        setSessionState("hidden");
        setExpiredNotice(true);
    }

    useEffect(() => {
        const savedUserId = localStorage.getItem(MOCK_SESSION_KEY);
        if (savedUserId) {
            const found = mockUsers.find((u) => u.id === savedUserId);
            if (found) {
                setUser(found);
                const newExpiresOn = new Date(Date.now() + MOCK_TOKEN_LIFETIME_SECONDS * 1000);
                setExpiresOn(newExpiresOn);
                scheduleTimers(newExpiresOn);
            }
        }
        setIsLoading(false);
        return () => clearAllTimers();
    }, []);

    /**
     * login(userId)
     * En la versión real, esto dispararía msalInstance.loginRedirect() o
     * loginPopup(). Por ahora, simplemente "activa" a un usuario del mock.
     *
     * Si no se pasa userId, inicia sesión con el primer usuario del JSON.
     */
    function login(userId) {
        const target = userId
                    ? mockUsers.find((u) => u.id === userId)
                    : mockUsers[0];

        if (!target) {
            console.warn(`AuthContext (mock): no existe un usuario con id "${userId}"`);
            return;
        }

        localStorage.setItem(MOCK_SESSION_KEY, target.id);
        setUser(target);
        setSessionState("hidden");

        const newExpiresOn = new Date(Date.now() + MOCK_TOKEN_LIFETIME_SECONDS * 1000);
        setExpiresOn(newExpiresOn);
        scheduleTimers(newExpiresOn);
    }

    /**
     * logout()
     * En la versión real, esto llamaría msalInstance.logoutRedirect().
     */
    function logout() {
        localStorage.removeItem(MOCK_SESSION_KEY);
        setUser(null);
        setExpiresOn(null);
        setSessionState("hidden");
    }

    function hasRole(role) {
        if (!user) return false;
        return user.roles.includes(role);
    }

    function renewSession() {
        const newExpiresOn = new Date(Date.now() + MOCK_TOKEN_LIFETIME_SECONDS * 1000);
        setExpiresOn(newExpiresOn);
        scheduleTimers(newExpiresOn);
        setSessionState("renewed");

        renewedTimerRef.current = setTimeout(() => {
        setSessionState("hidden");
        }, RENEWED_MESSAGE_SECONDS * 1000);
    }

    function clearExpiredNotice() {
        setExpiredNotice(false);
    }

    function hideSessionModal() {
        clearTimeout(renewedTimerRef.current);
        setSessionState("hidden");
    }
    /**
     * forceExpireSoon()
     * SOLO PARA DESARROLLO: fuerza que la sesión expire en unos
     * segundos, para poder probar el modal sin esperar 20 minutos.
     */
    function forceExpireSoon() {
        const soon = new Date(Date.now() + (SESSION_WARNING_SECONDS + 5) * 1000);
        setExpiresOn(soon);
        scheduleTimers(soon);
    }

    function hasAnyRole(roles = []) {
        if (!user) return false;
        return roles.some((role) => user.roles.includes(role));
    }

    const value = {
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        hasRole,
        hasAnyRole,
        // Lista completa de usuarios mock, útil solo para un selector de
        // pruebas en desarrollo (ver DevRoleSwitcher). Se puede quitar
        // cuando conectemos Azure
        __mockUsers: mockUsers,
        // Expiración de sesión
        sessionState,
        expiresOn,
        renewSession,
        expiredNotice,
        clearExpiredNotice,
        hideSessionModal,
        forceExpireSoon,
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("<AuthProvider>");
    }
    return context;
}