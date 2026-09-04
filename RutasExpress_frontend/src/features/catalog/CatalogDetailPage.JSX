import { useParams } from "react-router-dom";
import { PageStub } from "../../ui/PageStub";

export function CatalogDetailPage() {
    const { id } = useParams();
    return <PageStub title={`Detalle de servicio: ${id}`} />;
}