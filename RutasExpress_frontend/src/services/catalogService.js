import { createApiClient } from "./apiClient";
import mockCatalog from "../mocks/catalog-services.json";

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === "true";
const client = createApiClient(import.meta.env.VITE_API_BASE_URL);

export async function getCatalog() {
    if (USE_MOCKS) return mockCatalog;
    const { data } = await client.get("/api/catalog/services");
    return data;
}

export async function getCatalogServiceById(id) {
    if (USE_MOCKS) {
        return mockCatalog.find((s) => s.id === id) ?? null;
    }
    const { data } = await client.get(`/api/catalog/services/${id}`);
    return data;
}