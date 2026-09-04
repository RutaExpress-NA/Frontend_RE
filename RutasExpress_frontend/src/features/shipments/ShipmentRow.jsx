import { PackageIcon, ChevronRightIcon } from "../../ui/Icons";
import { StatusBadge } from "../../ui/StatusBadge";
import { STATUS_LABEL, STATUS_TONE } from "./shipmentStatus";

export function ShipmentRow({ shipment, onClick }) {
    const tone = STATUS_TONE[shipment.status];
    return (
        <button type="button" className="rex-shipment-row" onClick={onClick}>
            <div className={`rex-shipment-row__icon rex-shipment-row__icon--${tone}`}>
                <PackageIcon size={16} />
            </div>
            <div className="rex-shipment-row__main">
                <div className="rex-shipment-row__top">
                    <span className="rex-shipment-row__code">{shipment.trackingCode}</span>
                    <StatusBadge label={STATUS_LABEL[shipment.status]} tone={tone} />
                </div>
                <div className="rex-shipment-row__meta">
                    {shipment.recipient.name} · {shipment.recipient.address}
                </div>
            </div>
            <ChevronRightIcon size={16} className="rex-shipment-row__chevron" />
        </button>
    );
}