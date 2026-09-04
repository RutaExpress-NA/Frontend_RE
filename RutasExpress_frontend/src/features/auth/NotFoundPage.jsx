import { ErrorPage } from "../../ui/ErrorPage";

export function NotFoundPage() {
    return (
        <ErrorPage code="404" title="Esta página no existe" message="Revisa la dirección o vuelve al inicio."
                    linkTo="/" linkLabel="Volver al inicio"/>
    );
}