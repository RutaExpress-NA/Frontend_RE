/* eslint-disable no-unused-vars */
import { useState, useMemo } from "react";
import { useAuth } from "../auth/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { Card } from "../../ui/Card";
import { StatCard } from "../../ui/StatCard";
import { Tabs } from "../../ui/Tabs";
import { getInitials } from "../../utils/getInitials";
import { PackageIcon, CheckIcon, TruckIcon, BellIcon, SettingsIcon } from "../../ui/Icons";

// CAMBIAR FUT BACKEND
import shipmentsData from "../../mocks/shipments.json";

const TABS = [
    { value: "perfil", label: "Perfil" },
    { value: "configuracion", label: "Configuración" },
];

export function ProfilePage() {
    const { user } = useAuth();
    const { darkMode, toggleDark } = useTheme();
    const [activeTab, setActiveTab] = useState("perfil");

    // decoy yet
    const [emailNotifs, setEmailNotifs] = useState(true);
    const [pushNotifs, setPushNotifs] = useState(true);
    const [sessionStart] = useState(() => new Date());

    const isAdminOrAuditor =
        user.roles.includes("Admin") || user.roles.includes("Auditor");

    const relevantShipments = useMemo(() => {
        if (isAdminOrAuditor) return shipmentsData;
        if (user.roles.includes("Despachador")) {
            return shipmentsData.filter((s) => s.assignedDispatcherId === user.id);
        }
        return shipmentsData.filter((s) => s.createdByUserId === user.id);
    }, [user, isAdminOrAuditor]);

    const total = relevantShipments.length;
    const delivered = relevantShipments.filter((s) => s.status === "ENTREGADO").length;
    const enRuta = relevantShipments.filter((s) => s.status === "EN_RUTA").length;
    const cancelled = relevantShipments.filter((s) => s.status === "CANCELADO").length;

    const memberSinceLabel = new Date(user.memberSince).toLocaleDateString("es-CL", {
        month: "long",
        year: "numeric",
    });

    return (
        <div className="rex-profile-page">
            {/* ─── Portada ──────────────────────── */}
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
                        {/* reemplazar por la foto real de Microsoft Graph
                (GET /me/photo/$value) cuando MSAL esté conectado */}
                        <span className="rex-passport__initials">
                            {getInitials(user.name)}
                        </span>
                    </div>

                    <dl className="rex-passport__fields">
                        <div>
                            <dt>Nombre</dt>
                            <dd>{user.name}</dd>
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

            {/* ─── Página: Perfil ─────────────────────────────── */}
            {activeTab === "perfil" && (
                <div className="rex-dashboard__stats">
                    <StatCard icon={<PackageIcon size={20} />} value={total}
                        label={isAdminOrAuditor ? "Envíos en la red" : "Envíos totales"}
                        sublabel="Histórico" tone="primary"/>
                    <StatCard  icon={<CheckIcon size={20} />} value={delivered}
                        label="Entregados" sublabel="Histórico" tone="success"/>
                    <StatCard icon={<TruckIcon size={20} />} value={enRuta}
                        label="En tránsito" sublabel="Actualmente" tone="warning"/>
                </div>
            )}

            {/* ─── Página: Configuración ──────────────────────── */}
            {activeTab === "configuracion" && (
                <div className="rex-profile-page__config">
                    <Card padding="lg">
                        <h2 className="rex-panel__title">
                            <BellIcon size={16} className="rex-panel__title-icon" /> Notificaciones
                        </h2>
                        <div className="rex-config-row">
                            <div>
                                <div className="rex-config-row__label">Notificaciones por email</div>
                                <div className="rex-config-row__sublabel">
                                    Recibe alertas de estado en tu correo
                                </div>
                            </div>
                            <button type="button" onClick={() => setEmailNotifs((v) => !v)}
                                className={`rex-toggle ${emailNotifs ? "rex-toggle--on" : ""}`}>
                                <span className="rex-toggle__thumb" />
                            </button>
                        </div>
                        <div className="rex-config-row">
                            <div>
                                <div className="rex-config-row__label">Notificaciones push</div>
                                <div className="rex-config-row__sublabel">
                                    Alertas en tiempo real en la app
                                </div>
                            </div>
                            <button type="button" onClick={() => setPushNotifs((v) => !v)}
                                className={`rex-toggle ${pushNotifs ? "rex-toggle--on" : ""}`}>
                                <span className="rex-toggle__thumb" />
                            </button>
                        </div>
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

                    <Card padding="lg">
                        <h2 className="rex-panel__title">Sistema</h2>
                        <div className="rex-detail-list rex-detail-list--grid">
                            <div>
                                <dt>Versión</dt>
                                <dd>0.1.1</dd>
                            </div>
                            <div>
                                <dt>Sesión iniciada</dt>
                                <dd>
                                    {sessionStart.toLocaleTimeString("es-CL", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </dd>
                            </div>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
}