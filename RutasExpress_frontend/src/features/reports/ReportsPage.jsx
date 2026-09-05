import { Card } from "../../ui/Card";
import { StatCard } from "../../ui/StatCard";
import { BarChart } from "../../ui/BarChart";
import { ProgressBar } from "../../ui/ProgressBar";
import { StatusBadge } from "../../ui/StatusBadge";
import { ClockIcon, CheckIcon, TruckIcon, AlertIcon } from "../../ui/Icons";
import { STATUS_LABEL, STATUS_TONE, STATUS_STEPS } from "../shipments/shipmentStatus";
import { formatMinutes } from "../../utils/formatMinutes";

// CAMBIAR BACKEND
import reportData from "../../mocks/report.json";

const ALL_STATUSES = [...STATUS_STEPS, "CANCELADO"];

export function ReportsPage() {
    const { activeByStatus, topServices, shipmentsPerHour, avgLeadTimeMinutes } =
        reportData;

    const totalActive = Object.values(activeByStatus).reduce((a, b) => a + b, 0);
    const maxServiceCount = Math.max(...topServices.map((s) => s.count));

    const chartData = shipmentsPerHour.map((point) => ({
        label: point.hour.slice(11, 16),
        value: point.count,
    }));

    const stats = [
        {
            icon: <ClockIcon size={20} />,
            value: formatMinutes(avgLeadTimeMinutes),
            label: "Tiempo promedio",
            sublabel: "Lead time de entrega",
            tone: "primary",
        },
        {
            icon: <CheckIcon size={20} />,
            value: activeByStatus.ENTREGADO,
            label: "Entregados",
            sublabel: "Total histórico",
            tone: "success",
        },
        {
            icon: <TruckIcon size={20} />,
            value: activeByStatus.EN_RUTA,
            label: "En ruta",
            sublabel: "Actualmente",
            tone: "warning",
        },
        {
            icon: <AlertIcon size={20} />,
            value: activeByStatus.CANCELADO,
            label: "Cancelados",
            sublabel: "Total histórico",
            tone: "danger",
        },
    ];

    return (
        <div className="rex-reports-page">
            <header className="rex-reports-page__header">
                <h1 className="rex-reports-page__title">Reportería</h1>
                <p className="rex-reports-page__subtitle">
                    Panel de KPIs de la red · Últimas 24 horas
                </p>
            </header>

            <div className="rex-dashboard__stats">
                {stats.map((s) => (
                    <StatCard key={s.label} {...s} />
                ))}
            </div>

            <Card padding="lg">
                <h2 className="rex-panel__title">Envíos por hora</h2>
                <BarChart data={chartData} />
            </Card>

            <div className="rex-shipment-detail__grid">
                <Card padding="lg">
                    <h2 className="rex-panel__title">Estados activos</h2>
                    <div className="rex-status-breakdown">
                        {ALL_STATUSES.map((status) => {
                            const value = activeByStatus[status];
                            const pct = totalActive > 0 ? (value / totalActive) * 100 : 0;
                            const tone = STATUS_TONE[status];
                            return (
                                <div key={status} className="rex-status-breakdown__row">
                                    <StatusBadge label={STATUS_LABEL[status]} tone={tone} />
                                    <div className="rex-status-breakdown__track">
                                        <div className="rex-status-breakdown__fill"
                                            style={{
                                                width: `${pct}%`,
                                                background: `var(--tone-${tone}-text)`,
                                            }}/>
                                    </div>
                                    <span className="rex-status-breakdown__count">{value}</span>
                                </div>
                            );
                        })}
                    </div>
                </Card>

                <Card padding="lg">
                    <h2 className="rex-panel__title">Servicios más usados</h2>
                    <div className="rex-service-performance">
                        {topServices.map((s) => (
                            <ProgressBar key={s.serviceId} label={s.name}
                                value={s.count} max={maxServiceCount} countLabel={`${s.count} env.`}/>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
}