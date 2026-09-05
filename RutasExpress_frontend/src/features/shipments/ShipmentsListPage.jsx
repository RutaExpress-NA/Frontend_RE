import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { getVisibleShipments } from "./shipmentsScope";
import { Card } from "../../ui/Card";
import { Button } from "../../ui/Button";
import { SearchInput } from "../../ui/SearchInput";
import { FilterTabs } from "../../ui/FilterTabs";
import { PlusIcon } from "../../ui/Icons";
import { ShipmentRow } from "./ShipmentRow";
import { STATUS_LABEL } from "./shipmentStatus";

// REEMPLAZAR CUANDO BACKEND
import shipmentsData from "../../mocks/shipments.json";

const FILTER_OPTIONS = [
    { value: "ALL", label: "Todos" },
    ...Object.entries(STATUS_LABEL).map(([value, label]) => ({ value, label })),
];

export function ShipmentsListPage() {
    const navigate = useNavigate();
    const { user, hasRole } = useAuth();
    const [query, setQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");

    const scopedShipments = useMemo(
        () => getVisibleShipments(shipmentsData, user, hasRole),
        [user, hasRole]
    );

    const filtered = useMemo(() => {
        return scopedShipments.filter((s) => {
            const matchesStatus = statusFilter === "ALL" || s.status === statusFilter;

            const q = query.trim().toLowerCase();
            const matchesQuery = q === "" ||
                                s.trackingCode.toLowerCase().includes(q) ||
                                s.recipient.name.toLowerCase().includes(q) ||
                                s.recipient.address.toLowerCase().includes(q);
            return matchesStatus && matchesQuery;
        });
    }, [scopedShipments, query, statusFilter]);

    return (
        <div className="rex-shipments-page">
            <header className="rex-shipments-page__header">
                <div>
                    <h1 className="rex-shipments-page__title">Envíos</h1>
                    <p className="rex-shipments-page__count">
                    {filtered.length} resultados
                    {hasRole("Cliente") && !hasRole("Admin") && !hasRole("Despachador")
                    ? " · Tus envíos"
                    : ""}
                    </p>
                </div>
                <Button variant="primary" icon={<PlusIcon size={16} />}
                    onClick={() => {
                        console.log("Crear nuevo envío"); // CAMBIAR FUTURP
                    }}> Nuevo Envío
                </Button>
            </header>

            <div className="rex-shipments-page__controls">
                <SearchInput value={query} onChange={setQuery} 
                placeholder="Buscar por código, destinatario o dirección..."/>
                <FilterTabs options={FILTER_OPTIONS} active={statusFilter} onChange={setStatusFilter}/>
            </div>

            <Card padding="none">
                <div className="rex-shipment-list">
                    {filtered.length === 0 && (
                        <p className="rex-shipments-page__empty">
                            No se encontraron envíos.
                        </p>
                    )}
                    {filtered.map((s) => (
                        <ShipmentRow key={s.id} shipment={s}
                            onClick={() => navigate(`/shipments/${s.id}`)}/>
                    ))}
                </div>
            </Card>
        </div>
    );
}