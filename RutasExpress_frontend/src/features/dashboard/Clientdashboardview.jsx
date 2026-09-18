import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { Card } from "../../ui/Card";
import { StatCard } from "../../ui/StatCard";
import { ShipmentRow } from "../shipments/ShipmentRow";
import { getVisibleShipments } from "../shipments/shipmentsScope";
import { PackageIcon, CheckIcon, ClockIcon } from "../../ui/Icons";

// backend
import shipmentsData from "../../mocks/shipments.json";

const IN_PROGRESS_STATUSES = ["CREADO", "ACEPTADO", "EN_BODEGA", "EN_RUTA"];

export function ClientDashboardView() {
    const navigate = useNavigate();
    const { user, hasRole } = useAuth();
    const myShipments = getVisibleShipments(shipmentsData, user, hasRole);

    const delivered = myShipments.filter((s) => s.status === "ENTREGADO").length;
    const inProgress = myShipments.filter((s) =>
        IN_PROGRESS_STATUSES.includes(s.status)).length;

    const stats = [
        {
            icon: <PackageIcon size={20} />,
            value: myShipments.length,
            label: "Mis envíos",
            sublabel: "Histórico",
            tone: "primary",
        },
        {
            icon: <CheckIcon size={20} />,
            value: delivered,
            label: "Entregados",
            sublabel: "Histórico",
            tone: "success",
        },
        {
            icon: <ClockIcon size={20} />,
            value: inProgress,
            label: "En curso",
            sublabel: "Actualmente",
            tone: "warning",
        },
    ];

    const recentShipments = [...myShipments]
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        .slice(0, 5);

    return (
        <>
            <div className="rex-dashboard__stats rex-dashboard__stats--3col">
                {stats.map((s) => (
                    <StatCard key={s.label} {...s} />
                ))}
            </div>

            <Card padding="lg">
                <h2 className="rex-panel__title">Tus envíos recientes</h2>
                <div className="rex-shipment-list">
                    {recentShipments.length === 0 && (
                        <p className="rex-shipments-page__empty">
                            Aún no has creado ningún envío.
                        </p>
                    )}
                    {recentShipments.map((s) => (
                        <ShipmentRow key={s.id} shipment={s}
                            onClick={() => navigate(`/shipments/${s.id}`)}/>
                    ))}
                </div>
            </Card>
        </>
    );
}