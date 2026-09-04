export function formatDateTime(isoString) {
    const date = new Date(isoString);
    const datePart = date.toLocaleDateString("es-CL", {
        day: "2-digit",
        month: "2-digit",
    });
    const timePart = date.toLocaleTimeString("es-CL", {
        hour: "2-digit",
        minute: "2-digit",
    });
    return `${datePart} · ${timePart}`;
}