import { STATUS_LABEL, STATUS_TONE } from "./shipmentStatus";
import { formatDateTime } from "../../utils/formatDateTime";
import { getUserName } from "../../services/usersService";
import { PackageIcon, TruckIcon, ClipboardIcon, CheckIcon, GridIcon, CircleIcon } from "../../ui/Icons";

const statusIcon = (status) => {
    switch (status) {
        case "CREADO": return <ClipboardIcon size={18} />;
        case "ACEPTADO": return <PackageIcon size={18} />;
        case "EN_BODEGA": return <GridIcon size={18} />;
        case "EN_RUTA": return <TruckIcon size={18} />;
        case "ENTREGADO": return <CheckIcon size={18} />;
        default: return <CircleIcon size={18} />;
    }
};

export function ShipmentTimeline({ history }) {
    return (
        <div className="rex-timeline">
            {history.map((event, i) => (
                <div key={i} className="rex-timeline__item">
                    <div
                        className="rex-timeline__marker"
                        data-tone={STATUS_TONE[event.status]}
                    >
                        {statusIcon(event.status)}
                    </div>
                    <div className="rex-timeline__content">
                        <div className="rex-timeline__top">
                            <span className="rex-timeline__title">{STATUS_LABEL[event.status]}</span>
                            <span className="rex-timeline__time">{formatDateTime(event.timestamp)}</span>
                        </div>
                        <span
                            className="rex-timeline__by"
                            data-tone={STATUS_TONE[event.status]}
                        >
                            {getUserName(event.byUserId)}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}