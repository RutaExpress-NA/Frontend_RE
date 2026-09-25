import axios from "axios";
import { msalInstance } from "../msalInstance";
import { loginRequest } from "../authConfig";

export function createApiClient(baseURL) {
    const client = axios.create({ baseURL });

    client.interceptors.request.use(async (config) => {
        const account = msalInstance.getActiveAccount();
        if (account) {
            try {
                const result = await msalInstance.acquireTokenSilent({
                    ...loginRequest,
                    account,
                });
                config.headers.Authorization = `Bearer ${result.accessToken}`;
            } catch (err) {
                console.warn("No se pudo adjuntar el token a la petición:", err);
            }
        }
        return config;
    });

    return client;
}