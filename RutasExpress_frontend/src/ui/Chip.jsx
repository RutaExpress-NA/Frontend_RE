export function Chip({ icon, children }) {
    return (
        <span className="rex-chip">
            {icon && <span className="rex-chip__icon">{icon}</span>}
            {children}
        </span>
    );
}

//MEJORAR A NUEVO DISEÑO