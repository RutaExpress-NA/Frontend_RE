import { PackageIcon, CheckIcon, ClockIcon, TruckIcon, XIcon } from "../../ui/Icons";

export const STATUS_ICON = {
    CREADO: <PackageIcon size={16} />,
    ACEPTADO: <CheckIcon size={16} />,
    EN_BODEGA: <ClockIcon size={16} />,
    EN_RUTA: <TruckIcon size={16} />,
    ENTREGADO: <CheckIcon size={16} />,
    CANCELADO: <XIcon size={16} />,
};