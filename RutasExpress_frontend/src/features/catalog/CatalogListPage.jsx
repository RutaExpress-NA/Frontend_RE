import { useNavigate } from "react-router-dom";
import { ServiceCard } from "./ServiceCard";

// REMPLAZAR BACKEND
import catalogData from "../../mocks/catalog-services.json";

export function CatalogListPage() {
    const navigate = useNavigate();

    return (
        <div className="rex-catalog-page">
            <header className="rex-catalog-page__header">
                <h1 className="rex-catalog-page__title">Catálogo de Servicios</h1>
                <p className="rex-catalog-page__subtitle">
                    Elige el servicio ideal para cada tipo de envío
                </p>
            </header>

            <div className="rex-catalog-grid">
                {catalogData.map((service) => (
                    <ServiceCard key={service.id} service={service} onClick={() => navigate(`/catalog/${service.id}`)}/>
                ))}
            </div>
        </div>
    );
}