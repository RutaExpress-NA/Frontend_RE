export function formatDateLabel(isoString) {
    const label = new Date(isoString).toLocaleDateString("es-CL", {
        weekday: "long",
        day: "numeric",
        month: "long",
    });
    return label.charAt(0).toUpperCase() + label.slice(1);
}

export function dayKey(isoString) {
    return new Date(isoString).toISOString().slice(0, 10);
}