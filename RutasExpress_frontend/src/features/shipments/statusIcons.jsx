import { PackageIcon, CheckIcon, ClockIcon, TruckIcon, XIcon } from "../../ui/Icons";

export const STATUS_ICON = {
    CREADO: <PackageIcon size={18} />,
    ACEPTADO: <CheckIcon size={18} />,
    EN_BODEGA: <ClockIcon size={18} />,
    EN_RUTA: <TruckIcon size={18} />,
    ENTREGADO: <CheckIcon size={18} />,
    CANCELADO: <XIcon size={18} />,
};