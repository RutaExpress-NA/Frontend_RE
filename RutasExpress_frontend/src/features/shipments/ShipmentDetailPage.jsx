import { useParams, useNavigate } from "react-router-dom";
import { Card } from "../../ui/Card";
import { Button } from "../../ui/Button";
import { Stepper } from "../../ui/Stepper";
import { StatusBadge } from "../../ui/StatusBadge";
import { ChevronLeftIcon, PackageIcon, CheckIcon, ClockIcon, TruckIcon } from "../../ui/Icons";
import { ShipmentTimeline } from "./ShipmentTimeline";
import { STATUS_LABEL, STATUS_TONE, STATUS_STEPS } from "./shipmentStatus";

// REEMPLAZAR BACKEND
import shipmentsData from "../../mocks/shipments.json";

const STEP_ICONS = {
    CREADO: <PackageIcon size={18} />,
    ACEPTADO: <CheckIcon size={18} />,
    EN_BODEGA: <ClockIcon size={18} />,
    EN_RUTA: <TruckIcon size={18} />,
    ENTREGADO: <CheckIcon size={18} />,
};

export function ShipmentDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const shipment = shipmentsData.find((s) => s.id === id);

    if (!shipment) {
        return (
            <div className="rex-shipment-detail">
                <p>No se encontró el envío {id}.</p>
                <Button variant="ghost" onClick={() => navigate("/shipments")}>
                    Volver a Envíos
                </Button>
            </div>
        );
    }

    const isCancelled = shipment.status === "CANCELADO";
    const currentIndex = STATUS_STEPS.indexOf(shipment.status);

    const steps = STATUS_STEPS.map((key) => ({
        key,
        label: STATUS_LABEL[key],
        icon: STEP_ICONS[key],
    }));

    return (
        <div className="rex-shipment-detail">
            <header className="rex-shipment-detail__header">
                <button type="button" className="rex-shipment-detail__back"
                        onClick={() => navigate("/shipments")}>
                    <ChevronLeftIcon size={16} /> Envíos
                </button>
                <span className="rex-shipment-detail__separator">⁕</span>
                <h1 className="rex-shipment-detail__code">{shipment.trackingCode}</h1>
                <StatusBadge label={STATUS_LABEL[shipment.status]} tone={STATUS_TONE[shipment.status]} />
            </header>

            <Card padding="lg">
                <Stepper steps={steps} currentIndex={currentIndex} cancelled={isCancelled} />
            </Card>

            <div className="rex-shipment-detail__grid">
                <Card padding="lg">
                    <h2 className="rex-panel__title">Destinatario</h2>
                    <dl className="rex-detail-list">
                        <div>
                            <dt>Nombre</dt>
                            <dd>{shipment.recipient.name}</dd>
                        </div>
                        <div>
                            <dt>Dirección</dt>
                            <dd>{shipment.recipient.address}</dd>
                        </div>
                        <div>
                            <dt>Contacto</dt>
                            <dd>{shipment.recipient.phone} ⁕ {shipment.recipient.email}</dd>
                        </div>
                    </dl>
                </Card>

                <Card padding="lg">
                    <h2 className="rex-panel__title">Detalles del paquete</h2>
                    <dl className="rex-detail-list">
                        <div>
                            <dt>Peso</dt>
                            <dd>{shipment.weightKg} kg</dd>
                        </div>
                        <div>
                            <dt>Servicio</dt>
                            <dd>{shipment.serviceId}</dd>
                        </div>
                        <div>
                            <dt>Creado</dt>
                            <dd>{new Date(shipment.createdAt).toLocaleDateString("es-CL")}</dd>
                        </div>
                    </dl>
                </Card>
            </div>

            <Card padding="lg">
                <h2 className="rex-panel__title">Historial de eventos</h2>
                <ShipmentTimeline history={shipment.statusHistory} />
            </Card>
        </div>
    );
}