import { STATUS_LABEL, STATUS_TONE } from "./shipmentStatus";
import { STATUS_ICON } from "./statusIcons";
import { formatDateTime } from "../../utils/formatDateTime";
import { getUserName } from "../../services/usersService";

export function ShipmentTimeline({ history }) {
    return (
        <div className="rex-timeline">
            {history.map((event, i) => (
                <div key={i} className="rex-timeline__item">
                    <div className="rex-timeline__marker" data-tone={STATUS_TONE[event.status]}>
                        {STATUS_ICON[event.status]}
                    </div>
                    <div className="rex-timeline__content">
                        <div className="rex-timeline__top">
                            <span className="rex-timeline__title">{STATUS_LABEL[event.status]}</span>
                                <span className="rex-timeline__time">{formatDateTime(event.timestamp)}</span>
                        </div>
                        <span className="rex-timeline__by" data-tone={STATUS_TONE[event.status]}>
                            {getUserName(event.byUserId)}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}