import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ServiceCard } from "./ServiceCard";
import { getCatalog } from "../../services/catalogService";

export function CatalogListPage() {
    const navigate = useNavigate();
    const [catalog, setCatalog] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        getCatalog().then((data) => {
            if (!cancelled) {
                setCatalog(data);
                setIsLoading(false);
            }
        });
        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <div className="rex-catalog-page">
            <header className="rex-catalog-page__header">
                <h1 className="rex-catalog-page__title">Catálogo de Servicios</h1>
                <p className="rex-catalog-page__subtitle">
                    Elige el servicio ideal para cada tipo de envío
                </p>
            </header>

            {isLoading ? (
                <p>Cargando catálogo...</p>
            ) : (
                <div className="rex-catalog-grid">
                    {catalog.map((service) => (
                        <ServiceCard key={service.id} service={service}
                            onClick={() => navigate(`/catalog/${service.id}`)}/>
                    ))}
                </div>
            )}
        </div>
    );
}