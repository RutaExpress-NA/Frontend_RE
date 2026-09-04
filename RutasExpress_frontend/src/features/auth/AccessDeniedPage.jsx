import { ErrorPage } from "../../ui/ErrorPage";

export function AccessDeniedPage() {
    return (
        <ErrorPage code="403" title="Acceso denegado" message="Tu rol no tiene permiso para ver esta sección."
                        linkTo="/dashboard" linkLabel="Volver al dashboard"/>
    );
}