import { STATUS_LABEL, STATUS_TONE } from "../shipments/shipmentStatus";
import { relativeTime } from "../../utils/relativeTime";

export function ActivityRow({ event }) {
    const tone = STATUS_TONE[event.toStatus] || "neutral";
    const texto = event.fromStatus
                ? `${event.shipmentId}: ${STATUS_LABEL[event.fromStatus]} → ${STATUS_LABEL[event.toStatus]}`
                : `${event.shipmentId}: envío creado`;

    return (
        <div className="rex-activity-row">
            <span className={`rex-activity-row__dot rex-activity-row__dot--${tone}`} />
            <div className="rex-activity-row__text">
                <span className="font-brand">{texto}</span>
                <span className="rex-activity-row__time">{relativeTime(event.timestamp)}</span>
            </div>
        </div>
    );
}