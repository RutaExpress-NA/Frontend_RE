/* eslint-disable react-hooks/set-state-in-effect */
import { createContext, useContext, useState, useEffect } from "react";
import mockUsers from "../../mocks/users.json";

/**
 * AuthContext (MOCK)
 * ------------------
 * Este contexto imita a propósito la forma final que va a tener
 * @azure/msal-react cuando conectemos Azure AD de verdad
 */

const AuthContext = createContext(null);

const MOCK_SESSION_KEY = "rutaexpress_mock_user_id";

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const savedUserId = localStorage.getItem(MOCK_SESSION_KEY);
        if (savedUserId) {
            const found = mockUsers.find((u) => u.id === savedUserId);
            if (found) setUser(found);
        }
        setIsLoading(false);
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
    }

    /**
     * logout()
     * En la versión real, esto llamaría msalInstance.logoutRedirect().
     */
    function logout() {
        localStorage.removeItem(MOCK_SESSION_KEY);
        setUser(null);
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
        // Lista completa de usuarios mock, útil solo para un selector de
        // pruebas en desarrollo (ver DevRoleSwitcher). Se puede quitar
        // cuando conectemos Azure real.
        __mockUsers: mockUsers,
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