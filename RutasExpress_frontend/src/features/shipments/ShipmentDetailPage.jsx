/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { Card } from "../../ui/Card";
import { Button } from "../../ui/Button";
import { Stepper } from "../../ui/Stepper";
import { StatusBadge } from "../../ui/StatusBadge";
import { ChevronLeftIcon, PackageIcon, CheckIcon, ClockIcon, TruckIcon } from "../../ui/Icons";
import { ShipmentTimeline } from "./ShipmentTimeline";
import { STATUS_LABEL, STATUS_TONE, STATUS_STEPS, getNextStatuses } from "./shipmentStatus";
import { getShipmentById, updateShipmentStatus } from "../../services/shipmentsService";

const STEP_ICONS = {
    CREADO: <PackageIcon size={16} />,
    ACEPTADO: <CheckIcon size={16} />,
    EN_BODEGA: <ClockIcon size={16} />,
    EN_RUTA: <TruckIcon size={16} />,
    ENTREGADO: <CheckIcon size={16} />,
};

export function ShipmentDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, hasAnyRole } = useAuth();

    const [shipment, setShipment] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedStatus, setSelectedStatus] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);

    function loadShipment() {
        setIsLoading(true);
        getShipmentById(id).then((data) => {
            setShipment(data);
            setSelectedStatus("");
            setIsLoading(false);
        });
    }

    useEffect(() => {
        loadShipment();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    async function handleUpdateStatus() {
        if (!selectedStatus) return;
        setIsUpdating(true);
        try {
            await updateShipmentStatus(id, selectedStatus, user.id);
            loadShipment();
        } catch (err) {
            console.error(err);
            alert("No se pudo actualizar el estado. Intenta de nuevo.");
        } finally {
            setIsUpdating(false);
        }
    }

    if (isLoading) {
        return (
            <div className="rex-shipment-detail">
                <p>Cargando envío...</p>
            </div>
        );
    }

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

    const canManage = hasAnyRole(["Admin", "Despachador"]);
    const nextStatuses = getNextStatuses(shipment.status);

    return (
        <div className="rex-shipment-detail">
            <header className="rex-shipment-detail__header">
                <button type="button" className="rex-shipment-detail__back"
                        onClick={() => navigate("/shipments")}>
                    <ChevronLeftIcon size={16} /> Envíos
                </button>
                <span className="rex-shipment-detail__separator">·</span>
                <h1 className="rex-shipment-detail__code">{shipment.trackingCode}</h1>
                <StatusBadge label={STATUS_LABEL[shipment.status]} tone={STATUS_TONE[shipment.status]} />
            </header>

            <Card padding="lg">
                <Stepper steps={steps} currentIndex={currentIndex} cancelled={isCancelled} />
            </Card>

            {/* Solo Admin/Despachador pueden avanzar el estado(ENTREGADO/CANCELADO) */}
            {canManage && nextStatuses.length > 0 && (
                <Card padding="lg">
                    <h2 className="rex-panel__title">Actualizar estado</h2>
                    <div className="rex-status-update">
                        <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}
                            className="rex-status-update__select" >
                            <option value="">Selecciona el nuevo estado...</option>
                            {nextStatuses.map((status) => (
                                <option key={status} value={status}>
                                    {STATUS_LABEL[status]}
                                </option>
                            ))}
                        </select>
                        <Button variant="primary"
                            disabled={!selectedStatus || isUpdating}
                            onClick={handleUpdateStatus} >
                            {isUpdating ? "Actualizando..." : "Confirmar"}
                        </Button>
                    </div>
                </Card>
            )}

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
                            <dd>
                                {shipment.recipient.phone} · {shipment.recipient.email}
                            </dd>
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
                {shipment.statusHistory?.length ? (
                    <ShipmentTimeline history={shipment.statusHistory} />
                ) : (
                    <p className="rex-catalog-detail__empty">Sin historial de eventos.</p>
                )}
            </Card>
        </div>
    );
}