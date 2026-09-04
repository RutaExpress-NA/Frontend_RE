import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../features/auth/AuthContext";
import { RoleGuard } from "./RoleGuard";

// Layout general (sidebar + header) que envuelve las páginas protegidas.
import { AppLayout } from "../layouts/AppLayout";

// Páginas — reemplaza estos imports por tus componentes reales
// a medida que los vayas construyendo. Por ahora pueden ser
// placeholders simples (ver PageStub más abajo) para probar
// el enrutamiento y los guards sin bloquearte.
import { LoginPage } from "../features/auth/LoginPage";
import { AccessDeniedPage } from "../features/auth/AccessDeniedPage";
import { NotFoundPage } from "../features/auth/NotFoundPage";
import { DashboardPage } from "../features/dashboard/DashboardPage";
import { ShipmentsListPage } from "../features/shipments/ShipmentsListPage";
import { ShipmentDetailPage } from "../features/shipments/ShipmentDetailPage";
import { CatalogListPage } from "../features/catalog/CatalogListPage";
import { CatalogDetailPage } from "../features/catalog/CatalogDetailPage";
import { ReportsPage } from "../features/reports/ReportsPage";
import { AuditPage } from "../features/audit/AuditPage";
import { ProfilePage } from "../features/profile/ProfilePage";

export function AppRoutes() {
    return (
        <Routes>
            {/* Raíz: redirige según si hay sesión activa o no */}
            <Route path="/" element={<RootRedirect />} />

            {/* Pública */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/access-denied" element={<AccessDeniedPage />} />

            {/* Protegidas, todas comparten el mismo layout (sidebar/header) */}
            <Route
                element={
                    <RoleGuard>
                        <AppLayout />
                    </RoleGuard>
                }
            >
                {/* Todos los autenticados, sin importar el rol */}
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/profile" element={<ProfilePage />} />

                {/* Admin, Despachador, Cliente */}
                <Route
                    path="/shipments"
                    element={
                        <RoleGuard roles={["Admin", "Despachador", "Cliente"]}>
                            <ShipmentsListPage />
                        </RoleGuard>
                    }
                />
                <Route
                    path="/shipments/:id"
                    element={
                        <RoleGuard roles={["Admin", "Despachador", "Cliente"]}>
                            <ShipmentDetailPage />
                        </RoleGuard>
                    }
                />

                {/* Admin, Despachador */}
                <Route
                    path="/catalog"
                    element={
                        <RoleGuard roles={["Admin", "Despachador"]}>
                            <CatalogListPage />
                        </RoleGuard>
                    }
                />
                <Route
                    path="/catalog/:id"
                    element={
                        <RoleGuard roles={["Admin", "Despachador"]}>
                            <CatalogDetailPage />
                        </RoleGuard>
                    }
                />

                {/* Solo Admin */}
                <Route
                    path="/reports"
                    element={
                        <RoleGuard roles={["Admin"]}>
                            <ReportsPage />
                        </RoleGuard>
                    }
                />

                {/* Admin y Auditor */}
                <Route
                    path="/audit"
                    element={
                        <RoleGuard roles={["Admin", "Auditor"]}>
                            <AuditPage />
                        </RoleGuard>
                    }
                />
            </Route>

            {/* 404 — cualquier ruta no definida */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

/**
 * RootRedirect
 * ------------
 * La ruta "/" no tiene diseño propio: solo decide a dónde mandar
 * al usuario según si ya inició sesión o no.
 */
function RootRedirect() {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) return null; // evita parpadeo mientras se resuelve la sesión

    return (
        <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
    );
}