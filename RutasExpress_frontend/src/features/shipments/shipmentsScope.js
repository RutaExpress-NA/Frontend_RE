export function getVisibleShipments(allShipments, user, hasRole) {
    if (hasRole("Cliente")) {
        return allShipments.filter((s) => s.createdByUserId === user.id);
    }
    return allShipments;
}