/* eslint-disable no-unused-vars */
import { msalInstance } from "../msalInstance";
const GRAPH_READ_SCOPE = "https://graph.microsoft.com/User.Read";
const GRAPH_WRITE_SCOPE = "https://graph.microsoft.com/Directory.AccessAsUser.All"; // ← Más permisivo

async function getGraphToken(isInteractive = false, needsWrite = false) {
    const account = msalInstance.getActiveAccount();
    if (!account) return null;

    const scopes = needsWrite ? [GRAPH_WRITE_SCOPE] : [GRAPH_READ_SCOPE];

    try {
        const result = await msalInstance.acquireTokenSilent({
            scopes,
            account,
        });
        return result.accessToken;
    } catch (err) {
        if (!isInteractive) {
            return null;
        }

        try {
            const result = await msalInstance.acquireTokenPopup({
                scopes,
            });
            return result.accessToken;
        } catch (popupErr) {
            console.error("Error:", popupErr);
            return null;
        }
    }
}

export async function getGraphProfile() {
    const token = await getGraphToken(false);
    if (!token) return null;

    try {
        const response = await fetch(
            "https://graph.microsoft.com/v1.0/me?$select=createdDateTime,jobTitle,officeLocation,mail",
            { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!response.ok) return null;
        return await response.json();
    } catch (err) {
        return null;
    }
}
