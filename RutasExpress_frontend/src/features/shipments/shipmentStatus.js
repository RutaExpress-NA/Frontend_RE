export const STATUS_LABEL = {
    CREADO: "Creado",
    ACEPTADO: "Aceptado",
    EN_BODEGA: "En bodega",
    EN_RUTA: "En ruta",
    ENTREGADO: "Entregado",
    CANCELADO: "Cancelado",
};

export const STATUS_TONE = {
    CREADO: "neutral",
    ACEPTADO: "info",
    EN_BODEGA: "warning",
    EN_RUTA: "info",
    ENTREGADO: "success",
    CANCELADO: "danger",
};

export const STATUS_STEPS = [
    "CREADO",
    "ACEPTADO",
    "EN_BODEGA",
    "EN_RUTA",
    "ENTREGADO",
];

export function getNextStatuses(currentStatus) {
    const isFinal = currentStatus === "ENTREGADO" || currentStatus === "CANCELADO";
    if (isFinal) return [];

    const currentIndex = STATUS_STEPS.indexOf(currentStatus);
    const nextInFlow = STATUS_STEPS[currentIndex + 1];

    const options = [];
    if (nextInFlow) options.push(nextInFlow);
    options.push("CANCELADO");
    return options;
}