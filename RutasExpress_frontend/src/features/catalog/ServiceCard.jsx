import { Card } from "../../ui/Card";
import { Button } from "../../ui/Button";
import { StatusBadge } from "../../ui/StatusBadge";
import { Chip } from "../../ui/Chip";
import { PackageIcon, TruckIcon, ChevronRightIcon } from "../../ui/Icons";

//HACER OTROS
const VEHICLE_ICON = {
    MOTO: <PackageIcon size={28} />,
    FURGON: <TruckIcon size={28} />,
    CAMION: <TruckIcon size={28} />,
};

export function ServiceCard({ service, onClick }) {
    return (
        <Card padding="lg" className="rex-service-card">
            {service.popular && (
                <span className="rex-service-card__popular">MÁS POPULAR</span>
            )}

            <div className="rex-service-card__icon">
                {VEHICLE_ICON[service.vehicleTypeRequired]}
            </div>

            <div className="rex-service-card__top">
                <h3 className="rex-service-card__name">{service.name}</h3>
                <div className="rex-service-card__price">
                    ${service.price.toLocaleString("es-CL")}
                    <span className="rex-service-card__price-suffix">desde</span>
                </div>
            </div>

            <div className="rex-service-card__badges">
                <Chip>hasta {service.weightLimitKg} kg</Chip>
                    <Chip>{service.etaWindowLabel}</Chip>
                <Chip>SLA {service.slaPercent}%</Chip>
            </div>

            <div className="rex-service-card__badges">
                <Chip>{service.coverageCities[0]}</Chip>
                {service.coverageCities.length > 1 && (
                    <Chip>+{service.coverageCities.length - 1} más</Chip>
                )}
            </div>

            {!service.active && (
                <StatusBadge label="Descontinuado" tone="danger" />
            )}

            <Button variant={service.active ? "primary" : "ghost"} 
                    fullWidth disabled={!service.active} 
                    iconRight={<ChevronRightIcon size={16} />} onClick={onClick}>
                Ver detalles
            </Button>
        </Card>
    );
}