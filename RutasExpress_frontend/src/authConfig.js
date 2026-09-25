export const msalConfig = {
    auth: {
        clientId: import.meta.env.VITE_AZURE_CLIENT_ID,
        authority: `https://login.microsoftonline.com/${import.meta.env.VITE_AZURE_TENANT_ID}`,
        redirectUri: import.meta.env.VITE_AZURE_REDIRECT_URI,
        postLogoutRedirectUri: `${window.location.origin}/login`,
        navigateToLoginRequestUrl: false,
    },
    cache: {
        cacheLocation: "localStorage",
    },
}

export const loginRequest = {
    scopes: [import.meta.env.VITE_API_SCOPE],
};

export const apiConfig = {
    baseUrl: import.meta.env.VITE_API_BASE_URL,
};

export const graphScopes = {
    photo: ["https://graph.microsoft.com/User.Read"],
};