import expressImage from "../../assets/catalogo/express.webp";
import standardImage from "../../assets/catalogo/estandar.webp";
import vanImage from "../../assets/catalogo/furgon.webp";
import truckImage from "../../assets/catalogo/camion.webp";
import nightImage from "../../assets/catalogo/nocturno.webp";
import coldImage from "../../assets/catalogo/cold.webp";
import foodImage from "../../assets/catalogo/hot_comida.webp";

const CATALOG_IMAGES_BY_ID = {
    "svc-001": expressImage,
    "svc-002": standardImage,
    "svc-003": vanImage,
    "svc-004": truckImage,
    "svc-005": nightImage,
    "svc-006": coldImage,
    "svc-007": foodImage,
};

export function getCatalogImage(service) {
    const byId = CATALOG_IMAGES_BY_ID[service.id];
    if (byId) return byId;

    const name = service.name?.toLowerCase() ?? "";
    if (name.includes("cold") || name.includes("frío")) return coldImage;
    if (name.includes("hot") || name.includes("comida")) return foodImage;
    if (name.includes("nocturno")) return nightImage;
    if (name.includes("express")) return expressImage;
    if (name.includes("estándar") || name.includes("estandar")) return standardImage;
    if (name.includes("furgón") || name.includes("furgon")) return vanImage;
    if (name.includes("camión") || name.includes("camion")) return truckImage;

    if (service.vehicleTypeRequired === "FURGON") return vanImage;
    if (service.vehicleTypeRequired === "CAMION") return truckImage;
    return expressImage;
}
