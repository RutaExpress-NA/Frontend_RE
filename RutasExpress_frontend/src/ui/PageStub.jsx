import { useAuth } from "../features/auth/AuthContext";

/**
 * PageStub
 * --------
 * Placeholder temporal para páginas que aún no están construidas.
 * Muestra el título de la página y quién está "logueado" en ese
 * momento (usuario + roles), para verificar rápidamente que el
 * RoleGuard está funcionando bien antes de invertir tiempo en el
 * diseño final de cada pantalla.
 */
export function PageStub({ title }) {
    const { user } = useAuth();

    return (
        <div style={{ padding: 24 }}>
            <h1>{title}</h1>
            <p style={{ color: "#888" }}>
                Página pendiente de construir. Usuario actual:{" "}
                <strong>{user ? `${user.name} (${user.roles.join(", ")})` : "sin sesión"}</strong>
            </p>
        </div>
    );
}