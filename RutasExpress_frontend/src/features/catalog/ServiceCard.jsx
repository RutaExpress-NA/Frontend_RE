import { Card } from "../../ui/Card";
import { Button } from "../../ui/Button";
import { StatusBadge } from "../../ui/StatusBadge";
import { Chip } from "../../ui/Chip";
import { PackageIcon, TruckIcon, ChevronRightIcon } from "../../ui/Icons";
import { getCatalogImage } from "./catalogImages";

//HACER OTROS
const VEHICLE_ICON = {
    MOTO: <PackageIcon size={28} />,
    FURGON: <TruckIcon size={28} />,
    CAMION: <TruckIcon size={28} />,
};

export function ServiceCard({ service, onClick }) {
    const image = getCatalogImage(service);

    return (
        <Card padding="none" className="rex-service-card">
            <div className="rex-service-card__image">
                {image ? (
                    <img src={image} alt={service.name} loading="lazy" />
                ) : (
                    <div className="rex-service-card__image-fallback">
                        {VEHICLE_ICON[service.vehicleTypeRequired]}
                    </div>
                )}
                {service.popular && (
                    <span className="rex-service-card__popular">MÁS POPULAR</span>
                )}
            </div>

            <div className="rex-service-card__body">
                <div className="rex-service-card__top">
                    <h3 className="rex-service-card__name">{service.name}</h3>
                    <div className="rex-service-card__price">
                        {service.price == null
                            ? "Cotizar"
                            : `$${service.price.toLocaleString("es-CL")}`}
                        {service.price != null && (
                            <span className="rex-service-card__price-suffix">desde</span>
                        )}
                    </div>
                </div>

                <div className="rex-service-card__badges">
                    {service.weightLimitKg != null && (
                        <Chip>hasta {service.weightLimitKg} kg</Chip>
                    )}
                    {service.etaWindowLabel && <Chip>{service.etaWindowLabel}</Chip>}
                    {service.slaPercent != null && <Chip>SLA {service.slaPercent}%</Chip>}
                </div>

                {service.coverageCities?.length > 0 && (
                    <div className="rex-service-card__badges">
                        <Chip>{service.coverageCities[0]}</Chip>
                        {service.coverageCities.length > 1 && (
                            <Chip>+{service.coverageCities.length - 1} más</Chip>
                        )}
                    </div>
                )}

                {!service.active && (
                    <StatusBadge label="Descontinuado" tone="danger" />
                )}

                <Button
                    variant={service.active ? "primary" : "ghost"}
                    fullWidth
                    disabled={!service.active}
                    className="rex-service-card__details-button"
                    iconRight={<ChevronRightIcon size={18} />}
                    onClick={onClick}
                >
                    Ver detalles
                </Button>
            </div>
        </Card>
    );
}