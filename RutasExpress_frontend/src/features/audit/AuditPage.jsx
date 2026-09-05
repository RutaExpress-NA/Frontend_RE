import { useState, useMemo } from "react";
import { Card } from "../../ui/Card";
import { Button } from "../../ui/Button";
import { StatusBadge } from "../../ui/StatusBadge";
import { SearchInput } from "../../ui/SearchInput";
import { PackageIcon, FilterIcon, DownloadIcon, CheckIcon, ClockIcon } from "../../ui/Icons";
import { AuditEventCard } from "./AuditEventCard";
import { STATUS_LABEL } from "../shipments/shipmentStatus";
import { formatDateTime } from "../../utils/formatDateTime";
import { formatDateLabel, dayKey } from "../../utils/formatDateLabel";

// REMPLAZAR BACKEND
import auditData from "../../mocks/audit.json";
import shipmentsData from "../../mocks/shipments.json";

//REDUCIR FUNCIONES A UNA UTILIDAD PARA OBTENER EL CÓDIGO DE SEGUIMIENTO (O GENERAL)
function getTrackingCode(shipmentId) {
    const shipment = shipmentsData.find((s) => s.id === shipmentId);
    return shipment ? shipment.trackingCode : shipmentId;
}

export function AuditPage() {
    const uniqueShipmentIds = useMemo(
        () => [...new Set(auditData.map((e) => e.shipmentId))],
        []
    );

    const [query, setQuery] = useState("");
    const [selectedId, setSelectedId] = useState(uniqueShipmentIds[0] ?? null);
    const [verifiedShipmentIds, setVerifiedShipmentIds] = useState(() => new Set());

    function toggleVerifyShipment() {
        setVerifiedShipmentIds((prev) => {
            const next = new Set(prev);
            next.has(selectedId) ? next.delete(selectedId) : next.add(selectedId);
            return next;
        });
    }

    const filteredIds = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (q === "") return uniqueShipmentIds;
        return uniqueShipmentIds.filter((id) =>
            getTrackingCode(id).toLowerCase().includes(q)
        );
    }, [query, uniqueShipmentIds]);

    const events = useMemo(() => {
        return auditData
            .filter((e) => e.shipmentId === selectedId)
            .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    }, [selectedId]);

    const groupedByDay = useMemo(() => {
        const groups = [];
        for (const event of events) {
            const key = dayKey(event.timestamp);
            let group = groups.find((g) => g.key === key);
            if (!group) {
                group = { key, label: formatDateLabel(event.timestamp), events: [] };
                groups.push(group);
            }
            group.events.push(event);
        }
        return groups;
    }, [events]);

    const lastEvent = events[events.length - 1];
    const isDelivered = events.some((e) => e.toStatus === "ENTREGADO");
    const isCancelled = events.some((e) => e.toStatus === "CANCELADO");
    const isFinal = isDelivered || isCancelled;
    const isVerified = verifiedShipmentIds.has(selectedId);

    return (
        <div className="rex-audit-page">
            <header className="rex-audit-page__header">
                <div>
                    <h1 className="rex-audit-page__title">Auditoría</h1>
                    <p className="rex-audit-page__subtitle">
                        Historial completo de eventos por envío
                    </p>
                </div>
                <div className="rex-audit-page__actions">
                    <Button variant="outline" size="sm" icon={<FilterIcon size={14} />}>
                        Filtrar
                    </Button>
                    <Button variant="outline" size="sm" icon={<DownloadIcon size={14} />}>
                        Exportar auditoría
                    </Button>
                </div>
            </header>

            <Card padding="lg">
                <div className="rex-audit-selector__label">SELECCIONAR ENVÍO</div>
                <SearchInput value={query} onChange={setQuery} placeholder="Buscar por código de envío..."/>
                <div className="rex-audit-selector__pills">
                    {filteredIds.length === 0 && (
                        <p className="rex-audit-selector__empty">Sin resultados.</p>
                    )}
                    {filteredIds.map((id) => (
                        <button key={id} type="button" onClick={() => setSelectedId(id)}
                            className={`rex-audit-selector__pill ${selectedId === id ? "rex-audit-selector__pill--active" : ""}`}>
                            {getTrackingCode(id)}
                        </button>
                    ))}
                </div>
            </Card>

            {selectedId && (
                <>
                    <div className="rex-audit-summary">
                        <div className="rex-audit-summary__icon">
                            <PackageIcon size={22} />
                        </div>
                        <div className="rex-audit-summary__main">
                            <div className="rex-audit-summary__code">
                                {getTrackingCode(selectedId)}
                            </div>
                            <div className="rex-audit-summary__count">
                                {events.length} eventos registrados ·{" "}
                                {lastEvent ? STATUS_LABEL[lastEvent.toStatus] : "Sin eventos"}
                            </div>
                        </div>
                        {lastEvent && (
                            <div className="rex-audit-summary__last">
                                <div className="rex-audit-summary__last-label">Último evento</div>
                                <div className="rex-audit-summary__last-time">
                                    {formatDateTime(lastEvent.timestamp)}
                                </div>
                            </div>
                        )}

                        {/* solo disponible en estado(s) final */}
                        {isFinal && (
                            <div className="rex-audit-summary__verify">
                                {isVerified ? (
                                    <StatusBadge label="✓ Auditoría verificada" tone="success" />
                                ) : (
                                    <Button variant="primary" size="sm" onClick={toggleVerifyShipment}>
                                        Verificar auditoría
                                    </Button>
                                )}
                            </div>
                        )}
                    </div>

                    {!isFinal && (
                        <p className="rex-audit-verify-hint">
                            La verificación estará disponible cuando el envío llegue a un estado final (Entregado o Cancelado).
                        </p>
                    )}

                    <div className="rex-audit-timeline">
                        {groupedByDay.map((group) => (
                            <div key={group.key} className="rex-audit-day-group">
                                <div className="rex-audit-day-group__label">{group.label}</div>
                                {group.events.map((event) => (
                                    <AuditEventCard key={event.id} event={event} isLast={event.id === lastEvent?.id}/>
                                ))}
                            </div>
                        ))}

                        <div className="rex-audit-end-marker">
                            <div
                                className={`rex-audit-end-marker__icon ${isDelivered
                                        ? "rex-audit-end-marker__icon--done"
                                        : isCancelled
                                            ? "rex-audit-end-marker__icon--cancelled"
                                            : ""}`}>
                                {isDelivered ? <CheckIcon size={16} /> : <ClockIcon size={16} />}
                            </div>
                            <span className="rex-audit-end-marker__text">
                                {isDelivered
                                    ? "Envío completado ✓"
                                    : isCancelled
                                        ? "Envío cancelado"
                                        : "Envío en curso…"}
                            </span>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}