import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../features/auth/AuthContext";

/**
 * RoleGuard
 * ---------
 * Envuelve una página y decide si puede mostrarse, según 3 casos:
 *
 * 1. isLoading === true       -> muestra el loader (sesión aún resolviéndose,
 *                                 igual que pasará con MSAL al recuperar sesión).
 * 2. No autenticado            -> redirige a /login, guardando la ruta de
 *                                 origen para volver ahí después de loguearse.
 * 3. Autenticado pero sin el
 *    rol requerido             -> redirige a /access-denied.
 * 4. Todo OK                   -> muestra la página (children).
 *
 * Uso:
 *   <RoleGuard><DashboardPage /></RoleGuard>                    (solo pide login)
 *   <RoleGuard roles={["Admin"]}><ReportsPage /></RoleGuard>    (pide rol exacto)
 *   <RoleGuard roles={["Admin","Despachador"]}><CatalogPage /></RoleGuard>
 */
export function RoleGuard({ children, roles }) {
    const { isAuthenticated, isLoading, hasAnyRole } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return <FullScreenLoader />;
    }

    if (!isAuthenticated) {
        // Guardamos desde dónde venía, para poder redirigirlo de vuelta
        // tras el login (útil también cuando conectemos MSAL real).
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (roles && roles.length > 0 && !hasAnyRole(roles)) {
        return <Navigate to="/access-denied" replace />;
    }

    return children;
}

function FullScreenLoader() {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                fontSize: 14,
                color: "#666",
            }}
        >
            Verificando sesión...
        </div>
    );
}