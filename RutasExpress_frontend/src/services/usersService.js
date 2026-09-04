import mockUsers from "../mocks/users.json";

export function getUserName(userId) {
    if (!userId) return "Desconocido";

    const found = mockUsers.find((u) => u.id === userId);
    return found ? found.name : userId; // muestra el ID si no se encuentra
}
