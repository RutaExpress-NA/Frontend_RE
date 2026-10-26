import { useState } from "react";
import { STATUS_ICON } from "./statusIcons";

const STATUS_ICON_FILES = {
    CREADO: "creado",
    ACEPTADO: "aceptado",
    EN_BODEGA: "bodega",
    EN_RUTA: "ruta",
    ENTREGADO: "entregado",
    CANCELADO: "cancelado",
};

const STATUS_ICON_ASSETS = import.meta.glob("../../assets/icons/*.svg", {
    eager: true,
    import: "default",
    query: "?url",
});

export function ShipmentStatusIcon({ status, size = 34 }) {
    const [failed, setFailed] = useState(false);
    const fileName = STATUS_ICON_FILES[status];
    const iconUrl = STATUS_ICON_ASSETS[`../../assets/icons/${fileName}.svg`];

    if (!iconUrl || failed) return STATUS_ICON[status];

    return (
        <img src={iconUrl} alt="" aria-hidden="true"
            width={size} height={size} style={{ objectFit: "contain" }}
            onError={() => setFailed(true)}/>
    );
}
