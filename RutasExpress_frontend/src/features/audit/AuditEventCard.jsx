import { STATUS_LABEL, STATUS_TONE } from "../shipments/shipmentStatus";
import { STATUS_ICON } from "../shipments/statusIcons";
import { getUserName } from "../../services/usersService";
import { formatDateTime } from "../../utils/formatDateTime";

export function AuditEventCard({ event, isLast }) {
    const isCreation = event.eventType === "SHIPMENT_CREATED";
    const tone = STATUS_TONE[event.toStatus] || "neutral";
    const icon = STATUS_ICON[event.toStatus];
    const title = isCreation ? "Envío creado" : STATUS_LABEL[event.toStatus];

    const detail = isCreation
        ? `Registrado por ${event.performedByRole}.`
        : `Cambio de estado: ${STATUS_LABEL[event.fromStatus]} → ${STATUS_LABEL[event.toStatus]}.`;

    return (
        <div className="rex-audit-event">
            <div className={`rex-audit-event__icon rex-audit-event__icon--${tone}`}>
                {icon}
            </div>
            <div className={`rex-audit-event__card ${isLast ? "rex-audit-event__card--last" : ""}`}>
                <div className="rex-audit-event__top">
                    <span className="rex-audit-event__title">{title}</span>
                    {isLast && <span className="rex-audit-event__last-tag">ÚLTIMO</span>}
                </div>
                <div className="rex-audit-event__meta">
                    <span>{formatDateTime(event.timestamp)}</span>
                        <span className="rex-audit-event__dot" />
                    <span className="rex-audit-event__actor">
                        {getUserName(event.performedByUserId)}
                    </span>
                </div>
                <div className="rex-audit-event__detail">{detail}</div>
            </div>
        </div>
    );
}