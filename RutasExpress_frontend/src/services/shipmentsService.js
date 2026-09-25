import { createApiClient } from "./apiClient";
import { createMockStore } from "./mockStore";
import mockShipments from "../mocks/shipments.json";

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === "true";
const client = createApiClient(import.meta.env.VITE_API_BASE_URL);
const shipmentsStore = createMockStore("shipments", mockShipments);

export async function getShipments() {
    if (USE_MOCKS) return shipmentsStore.getAll();
    const { data } = await client.get("/api/shipments");
    return data;
}

export async function getShipmentById(id) {
    if (USE_MOCKS) return shipmentsStore.getById(id);
    const { data } = await client.get(`/api/shipments/${id}`);
    return data;
}

export async function createShipment(payload, userId) {
    if (USE_MOCKS) {
        const now = new Date().toISOString();
        const newShipment = {
            id: `shp-${Date.now()}`,
            trackingCode: `RE-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 89999)}`,
            status: "CREADO",
            serviceId: payload.serviceId,
            createdByUserId: userId,
            assignedDispatcherId: null,
            recipient: payload.recipient,
            weightKg: payload.weightKg,
            createdAt: now,
            updatedAt: now,
            statusHistory: [{ status: "CREADO", timestamp: now, byUserId: userId }],
        };
        return shipmentsStore.create(newShipment);
    }
    const { data } = await client.post("/api/shipments", payload);
    return data;
}

export async function updateShipmentStatus(id, status, byUserId) {
    if (USE_MOCKS) {
        const shipment = shipmentsStore.getById(id);
        if (!shipment) throw new Error(`Envío ${id} no encontrado`);

        const now = new Date().toISOString();
        const updatedHistory = [
            ...(shipment.statusHistory ?? []),
            { status, timestamp: now, byUserId },
        ];

        return shipmentsStore.update(id, {
            status,
            updatedAt: now,
            statusHistory: updatedHistory,
        });
    }
    const { data } = await client.put(`/api/shipments/${id}/status`, { status });
    return data;
}