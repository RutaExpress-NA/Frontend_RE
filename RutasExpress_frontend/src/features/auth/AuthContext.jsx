/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";
import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";
import { loginRequest } from "../../authConfig";

const AuthContext = createContext(null);

//avisa 1 minuto antes
const SESSION_WARNING_SECONDS = 60;
const RENEWED_MESSAGE_SECONDS = 4;

//Decodifica el payload de un JWT sin librerías externas
function decodeJwt(token) {
    try {
        const payload = token.split(".")[1];
        const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
        return JSON.parse(json);
    } catch {
        return {};
    }
}

export function AuthProvider({ children }) {
    const { instance, accounts, inProgress } = useMsal();
    const isMsalAuthenticated = useIsAuthenticated();

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [expiresOn, setExpiresOn] = useState(null);
    const [sessionState, setSessionState] = useState("hidden"); // 'hidden' | 'warning' | 'renewed'

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
            warningTimerRef.current = setTimeout(() => setSessionState("warning"), msUntilWarning);
        } else {
            setSessionState("warning");
        }

        expiryTimerRef.current = setTimeout(() => {
            handleExpiry();
        }, Math.max(msUntilExpiry, 0));
    }

    function applyTokenResult(result) {
        const claims = decodeJwt(result.accessToken);
        setUser({
            id: result.account.homeAccountId,
            name: result.account.name,
            email: result.account.username,
            roles: claims.roles || [],
        });
        setExpiresOn(result.expiresOn);
        scheduleTimers(result.expiresOn);
        setSessionState("hidden");
    }

    // pedir otkrn
    const syncFromMsal = useCallback(async () => {
        const account = instance.getActiveAccount() || accounts[0];
        if (!account) {
            setUser(null);
            setIsLoading(false);
            return;
        }

        try {
            const result = await instance.acquireTokenSilent({ ...loginRequest, account });
            applyTokenResult(result);
        } catch (err) {
            console.warn("No se pudo obtener el token en silencio:", err);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [instance, accounts]);

    useEffect(() => {
        if (inProgress !== InteractionStatus.None) return;
        syncFromMsal();
        return () => clearAllTimers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inProgress, isMsalAuthenticated]);

    // El "session timer" propio de la app (no de MSAL) llegó a 0
    function handleExpiry() {
        clearAllTimers();
        setUser(null);
        setExpiresOn(null);
        setSessionState("hidden");
        instance.logoutRedirect().catch(() => { });
    }

    function login() {
        instance.loginRedirect(loginRequest);
    }

    function logout() {
        clearAllTimers();
        instance.logoutRedirect();
    }

    //pide token
    async function renewSession() {
        const account = instance.getActiveAccount();
        try {
            const result = await instance.acquireTokenSilent({ ...loginRequest, account });
            applyTokenResult(result);
            setSessionState("renewed");
            renewedTimerRef.current = setTimeout(() => setSessionState("hidden"), RENEWED_MESSAGE_SECONDS * 1000);
        } catch (err) {
            console.warn("Renovación silenciosa falló, se requiere login interactivo.", err);
            handleExpiry();
        }
    }

    function hideSessionModal() {
        clearTimeout(renewedTimerRef.current);
        setSessionState("hidden");
    }

    // Solo para probar el modal sin esperar el tiempo real de expiración
    function forceExpireSoon() {
        if (!expiresOn) return;
        const soon = new Date(Date.now() + (SESSION_WARNING_SECONDS + 5) * 1000);
        scheduleTimers(soon);
    }

    function hasRole(role) {
        if (!user) return false;
        return user.roles.includes(role);
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
        sessionState,
        expiresOn,
        renewSession,
        hideSessionModal,
        forceExpireSoon,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe usarse dentro de un <AuthProvider>");
    }
    return context;
}