import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { Card } from "../../ui/Card";
import { Button } from "../../ui/Button";
import { StatCard } from "../../ui/StatCard";
import { ProgressBar } from "../../ui/ProgressBar";
import { ShipmentRow } from "../shipments/ShipmentRow";
import { ActivityRow } from "../audit/ActivityRow";
import { CoverageMap } from "../../ui/CoverageMap";
import { getVisibleShipments } from "../shipments/shipmentsScope";
import { PackageIcon, CheckIcon, ClockIcon, AlertIcon, MapPinIcon, BellIcon, RefreshIcon } from "../../ui/Icons";

// BACKEND
import reportData from "../../mocks/report.json";
import shipmentsData from "../../mocks/shipments.json";
import auditData from "../../mocks/audit.json";

export function AdminDashboardView() {
    const navigate = useNavigate();
    const { user, hasRole } = useAuth();
    const { activeByStatus, topServices } = reportData;

    const enProceso =
        activeByStatus.CREADO + activeByStatus.ACEPTADO + activeByStatus.EN_BODEGA + activeByStatus.EN_RUTA;

    const stats = [
        { icon: <PackageIcon size={20} />, value: enProceso, label: "En Proceso", sublabel: "Creado a en ruta", tone: "primary" },
        { icon: <CheckIcon size={20} />, value: activeByStatus.ENTREGADO, label: "Entregados", sublabel: "Total histórico", tone: "success" },
        { icon: <ClockIcon size={20} />, value: activeByStatus.EN_RUTA, label: "En Tránsito", sublabel: "Actualmente en ruta", tone: "warning" },
        { icon: <AlertIcon size={20} />, value: activeByStatus.CANCELADO, label: "Cancelados", sublabel: "Total histórico", tone: "danger" },
    ];

    const visibleShipments = getVisibleShipments(shipmentsData, user, hasRole);

    const recentShipments = [...visibleShipments]
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        .slice(0, 5);

    const recentActivity = [...auditData]
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, 5);

    const maxServiceCount = Math.max(...topServices.map((s) => s.count));

    return (
        <>
            <div className="rex-dashboard__stats">
                {stats.map((s) => (
                    <StatCard key={s.label} {...s} />
                ))}
            </div>

            <div className="rex-dashboard__grid">
                <Card padding="lg" className="rex-dashboard__panel">
                    <div className="rex-panel__header">
                        <h2 className="rex-panel__title">Envíos Recientes</h2>
                    </div>
                    <div className="rex-shipment-list">
                        {recentShipments.map((s) => (
                            <ShipmentRow
                                key={s.id}
                                shipment={s}
                                onClick={() => navigate(`/shipments/${s.id}`)}
                            />
                        ))}
                    </div>
                </Card>

                <div className="rex-dashboard__side">
                    <Card padding="lg">
                        <div className="rex-panel__header">
                            <h2 className="rex-panel__title">
                                <MapPinIcon size={16} className="rex-panel__title-icon" />
                                Cobertura
                            </h2>
                        </div>
                        <CoverageMap />
                    </Card>

                    <Card padding="lg">
                        <div className="rex-panel__header">
                            <h2 className="rex-panel__title">
                                <BellIcon size={16} className="rex-panel__title-icon" />
                                Actividad
                            </h2>
                        </div>
                        <div className="rex-activity-list">
                            {recentActivity.map((a) => (
                                <ActivityRow key={a.id} event={a} />
                            ))}
                        </div>
                    </Card>
                </div>
            </div>

            <Card padding="lg" className="rex-dashboard__panel">
                <div className="rex-panel__header">
                    <h2 className="rex-panel__title">Servicios más usados</h2>
                    <Button variant="outline" size="sm" icon={<RefreshIcon size={14} />}>
                        Actualizar
                    </Button>
                </div>
                <div className="rex-service-performance">
                    {topServices.map((s) => (
                        <ProgressBar key={s.serviceId} label={s.name} value={s.count}
                            max={maxServiceCount} countLabel={`${s.count} env.`}/>
                    ))}
                </div>
            </Card>
        </>
    );
}