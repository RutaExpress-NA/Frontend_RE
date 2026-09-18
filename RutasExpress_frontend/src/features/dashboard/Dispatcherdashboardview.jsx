import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { Card } from "../../ui/Card";
import { StatCard } from "../../ui/StatCard";
import { ShipmentRow } from "../shipments/ShipmentRow";
import { getVisibleShipments } from "../shipments/shipmentsScope";
import { PackageIcon, ClockIcon, TruckIcon } from "../../ui/Icons";

// bCKEDN
import shipmentsData from "../../mocks/shipments.json";

export function DispatcherDashboardView() {
    const navigate = useNavigate();
    const { user, hasRole } = useAuth();

    const visibleShipments = getVisibleShipments(shipmentsData, user, hasRole);

    const creado = visibleShipments.filter((s) => s.status === "CREADO");
    const enBodega = visibleShipments.filter((s) => s.status === "EN_BODEGA");
    const enRuta = visibleShipments.filter((s) => s.status === "EN_RUTA");
    const needsAction = [...creado, ...enBodega].sort(
        (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt)
    );

    const stats = [
        {
            icon: <PackageIcon size={20} />,
            value: creado.length,
            label: "Por aceptar",
            sublabel: "Esperando tu acción",
            tone: "warning",
        },
        {
            icon: <ClockIcon size={20} />,
            value: enBodega.length,
            label: "En bodega",
            sublabel: "Listos para despachar",
            tone: "primary",
        },
        {
            icon: <TruckIcon size={20} />,
            value: enRuta.length,
            label: "En ruta",
            sublabel: "Actualmente",
            tone: "success",
        },
    ];

    return (
        <>
            <div className="rex-dashboard__stats rex-dashboard__stats--3col">
                {stats.map((s) => (
                    <StatCard key={s.label} {...s} />
                ))}
            </div>

            <Card padding="lg">
                <h2 className="rex-panel__title">Requieren tu acción</h2>
                <div className="rex-shipment-list">
                    {needsAction.length === 0 && (
                        <p className="rex-shipments-page__empty">
                            No hay envíos pendientes de acción por ahora.
                        </p>
                    )}
                    {needsAction.slice(0, 8).map((s) => (
                        <ShipmentRow key={s.id} shipment={s}
                            onClick={() => navigate(`/shipments/${s.id}`)}/>
                    ))}
                </div>
            </Card>
        </>
    );
}