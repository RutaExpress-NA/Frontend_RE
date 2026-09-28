/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "../../ui/Card";
import { Button } from "../../ui/Button";
import { Chip } from "../../ui/Chip";
import { StatusBadge } from "../../ui/StatusBadge";
import { ProgressBar } from "../../ui/ProgressBar";
import { ChevronLeftIcon, PackageIcon, TruckIcon, CheckIcon, MapPinIcon } from "../../ui/Icons";
import { getCatalogServiceById } from "../../services/catalogService";
import vehiclesData from "../../mocks/vehicles.json";

const VEHICLE_ICON = {
    MOTO: <PackageIcon size={40} />,
    FURGON: <TruckIcon size={40} />,
    CAMION: <TruckIcon size={40} />,
};

export function CatalogDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [service, setService] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        setIsLoading(true);
        getCatalogServiceById(id).then((data) => {
            if (!cancelled) {
                setService(data);
                setIsLoading(false);
            }
        });
        return () => {
            cancelled = true;
        };
    }, [id]);

    if (isLoading) {
        return (
            <div className="rex-catalog-detail">
                <p>Cargando servicio...</p>
            </div>
        );
    }

    if (!service) {
        return (
            <div className="rex-catalog-detail">
                <p>No se encontró el servicio {id}.</p>
                <Button variant="ghost" onClick={() => navigate("/catalog")}>
                    Volver a Catálogo
                </Button>
            </div>
        );
    }

    const vehicle = vehiclesData.find((v) => v.vehicleType === service.vehicleTypeRequired);

    return (
        <div className="rex-catalog-detail">
            <header className="rex-catalog-detail__breadcrumb">
                <button type="button" className="rex-shipment-detail__back"
                    onClick={() => navigate("/catalog")}>
                    <ChevronLeftIcon size={16} /> Catálogo
                </button>
                <span className="rex-shipment-detail__separator">·</span>
                <span>{service.name}</span>
            </header>

            <Card padding="lg" className="rex-catalog-hero">
                <div className="rex-catalog-hero__icon">{VEHICLE_ICON[service.vehicleTypeRequired]}</div>
                <div className="rex-catalog-hero__main">
                    <div className="rex-catalog-hero__top">
                        <h1 className="rex-catalog-hero__name">{service.name}</h1>
                        <div className="rex-catalog-hero__price">
                            ${service.price.toLocaleString("es-CL")}
                            <span className="rex-catalog-hero__price-suffix">por envío</span>
                        </div>
                    </div>
                    <p className="rex-catalog-hero__description">{service.description}</p>
                    <div className="rex-service-card__badges">
                        <Chip>hasta {service.weightLimitKg} kg</Chip>
                            <Chip>{service.etaWindowLabel}</Chip>
                        <Chip>{service.vehicleTypeRequired}</Chip>
                            <Chip>SLA {service.slaPercent}%</Chip>
                    </div>
                    {!service.active && (
                        <StatusBadge label="Este servicio ya no está disponible" tone="danger" />
                    )}
                </div>
            </Card>

            <div className="rex-shipment-detail__grid">
                <Card padding="lg">
                    <h2 className="rex-panel__title">Características</h2>
                    {service.features?.length ? (
                        <ul className="rex-feature-list">
                            {service.features.map((feature) => (
                                <li key={feature} className="rex-feature-list__item">
                                    <CheckIcon size={16} className="rex-feature-list__icon" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="rex-catalog-detail__empty">
                            Este servicio no tiene características registradas.
                        </p>
                    )}
                </Card>

                <Card padding="lg">
                    <h2 className="rex-panel__title">
                        <MapPinIcon size={16} className="rex-panel__title-icon" /> Cobertura
                    </h2>
                    <div className="rex-service-card__badges">
                        {service.coverageCities?.map((city) => (
                            <Chip key={city}>{city}</Chip>
                        ))}
                    </div>
                    {vehicle && (
                        <div className="rex-catalog-detail__capacity">
                            <ProgressBar label={`Capacidad ${vehicle.vehicleType.toLowerCase()}`}
                                value={vehicle.currentAvailable} max={vehicle.totalCapacity}
                                countLabel={`${vehicle.currentAvailable} disp.`}/>
                        </div>
                    )}
                </Card>
            </div>

            {service.active && (
                <Card padding="lg" className="rex-catalog-cta">
                    <div>
                        <h3 className="rex-catalog-cta__title">¿Listo para enviar?</h3>
                        <p className="rex-catalog-cta__subtitle">
                            Crea tu envío con {service.name} ahora mismo
                        </p>
                    </div>
                    <Button variant="primary" onClick={() => console.log("Crear envío con", service.id)}>
                        Crear envío
                    </Button>
                </Card>
            )}
        </div>
    );
}