import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { Card } from "../../ui/Card";
import { StatCard } from "../../ui/StatCard";
import { Tabs } from "../../ui/Tabs";
import { UserAvatar } from "../../ui/UserAvatar";
import { getGraphProfile } from "../../services/graphService";
import { PackageIcon, CheckIcon, TruckIcon, BellIcon, SettingsIcon } from "../../ui/Icons";
import shipmentsData from "../../mocks/shipments.json";

const TABS = [
    { value: "perfil", label: "Perfil" },
    { value: "configuracion", label: "Configuración" },
];

export function ProfilePage() {
    const { user } = useAuth();
    const { darkMode, toggleDark } = useTheme();
    const [activeTab, setActiveTab] = useState("perfil");
    const [graphProfile, setGraphProfile] = useState(null);

    useEffect(() => {
        getGraphProfile().then(setGraphProfile);
    }, []);

    const isAdminOrAuditor = user.roles.includes("Admin") || user.roles.includes("Auditor");

    const relevantShipments = user.roles.includes("Despachador")
        ? shipmentsData.filter((s) => s.assignedDispatcherId === user.id)
        : isAdminOrAuditor
        ? shipmentsData
        : shipmentsData.filter((s) => s.createdByUserId === user.id);

    const total = relevantShipments.length;
    const delivered = relevantShipments.filter((s) => s.status === "ENTREGADO").length;
    const enRuta = relevantShipments.filter((s) => s.status === "EN_RUTA").length;

    const memberSinceLabel = graphProfile?.createdDateTime
        ? new Date(graphProfile.createdDateTime).toLocaleDateString("es-CL", {
            month: "long",
            year: "numeric",
        })
        : user.memberSince
        ? new Date(user.memberSince).toLocaleDateString("es-CL", {
            month: "long",
            year: "numeric",
        })
        : "—";

    return (
        <div className="rex-profile-page">
            <Card padding="none" className="rex-passport">
                <div className="rex-passport__top">
                    <div className="rex-passport__brand">
                        <span className="rex-passport__brand-name">RutaExpress</span>
                        <span className="rex-passport__brand-tag">PASSPORT</span>
                    </div>
                    <div className="rex-passport__stamp">APROBADO</div>
                </div>

                <div className="rex-passport__divider" />

                <div className="rex-passport__bottom">
                    <div className="rex-passport__photo">
                        <UserAvatar name={user.email || user.name} size={130} />
                    </div>

                    <dl className="rex-passport__fields">
                        <div>
                            <dt>Nombre</dt>
                            <dd>{user.name}</dd>
                        </div>
                        <div>
                            <dt>Email</dt>
                            <dd>{user.email}</dd>
                        </div>
                        <div>
                            <dt>Rol</dt>
                            <dd>{user.roles.join(", ")}</dd>
                        </div>
                        <div>
                            <dt>Zona asignada</dt>
                            <dd>{user.zone ?? "—"}</dd>
                        </div>
                        <div>
                            <dt>Miembro desde</dt>
                            <dd>{memberSinceLabel}</dd>
                        </div>
                    </dl>
                </div>
            </Card>

            <Tabs options={TABS} active={activeTab} onChange={setActiveTab} />

            {activeTab === "perfil" && (
                <div className="rex-dashboard__stats">
                    <StatCard icon={<PackageIcon size={20} />}
                        value={total} label={isAdminOrAuditor ? "Envíos en la red" : "Envíos totales"}
                        sublabel="Histórico" tone="primary"/>
                    <StatCard icon={<CheckIcon size={20} />}
                        value={delivered} label="Entregados"
                        sublabel="Histórico" tone="success"/>
                    <StatCard icon={<TruckIcon size={20} />}
                        value={enRuta} label="En tránsito"
                        sublabel="Actualmente" tone="warning"/>
                </div>
            )}

            {activeTab === "configuracion" && (
                <div className="rex-profile-page__config">
                    <Card padding="lg">
                        <h2 className="rex-panel__title">
                            <BellIcon size={16} className="rex-panel__title-icon" /> Notificaciones
                        </h2>
                    </Card>

                    <Card padding="lg">
                        <h2 className="rex-panel__title">
                            <SettingsIcon size={16} className="rex-panel__title-icon" /> Apariencia
                        </h2>
                        <div className="rex-config-row">
                            <div>
                                <div className="rex-config-row__label">Modo oscuro</div>
                                <div className="rex-config-row__sublabel">
                                    Cambia entre tema claro y oscuro
                                </div>
                            </div>
                            <button type="button" onClick={toggleDark}
                                className={`rex-toggle ${darkMode ? "rex-toggle--on" : ""}`}>
                                <span className="rex-toggle__thumb" />
                            </button>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
}