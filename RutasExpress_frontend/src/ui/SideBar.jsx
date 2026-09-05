import { NavLink } from "react-router-dom";
import { useAuth } from "../features/auth/AuthContext";
import { getInitials } from "../utils/getInitials";
import logo from "../assets/logo.png";
import {
    HomeIcon,
    PackageIcon,
    TruckIcon,
    ClipboardIcon,
    LayersIcon,
    UserIcon,
    SunIcon,
    MoonIcon,
    LogOutIcon,
} from "./Icons";

const navItems = [
    { to: "/dashboard", label: "Dashboard", Icon: HomeIcon, roles: null },
    { to: "/shipments", label: "Envíos", Icon: PackageIcon, roles: ["Admin", "Despachador", "Cliente"] },
    { to: "/catalog", label: "Catálogo", Icon: TruckIcon, roles: ["Admin", "Despachador"] },
    { to: "/reports", label: "Reportería", Icon: LayersIcon, roles: ["Admin"] },
    { to: "/audit", label: "Auditoría", Icon: ClipboardIcon, roles: ["Admin", "Auditor"] },
];

export function Sidebar({ darkMode, onToggleDark }) {
    const { user, hasAnyRole, logout } = useAuth();

    const linkClass = ({ isActive }) =>
        `rex-sidebar__link${isActive ? " rex-sidebar__link--active" : ""}`;

    return (
        <aside className="rex-sidebar">
            <div className="rex-sidebar__logo">
                <img src={logo} alt="Rutas Express"/>
            </div>

            <nav className="rex-sidebar__nav">
                {navItems.map(({ to, label, Icon, roles }) => {
                    if (roles && !hasAnyRole(roles)) return null;
                    return (
                        <NavLink key={to} to={to} className={linkClass}>
                            <Icon size={18} className="rex-sidebar__link-icon" />
                            <span className="rex-sidebar__link-label">{label}</span>
                        </NavLink>
                    );
                })}

                <div className="rex-sidebar__divider" />

                <NavLink to="/profile" className={linkClass}>
                    <UserIcon size={18} className="rex-sidebar__link-icon" />
                    <span className="rex-sidebar__link-label">Perfil</span>
                </NavLink>
            </nav>

            <div className="rex-sidebar__footer">
                <button type="button" onClick={onToggleDark} className="rex-sidebar__toggle">
                    <span className="rex-sidebar__toggle-label">
                        {darkMode ? <SunIcon size={16} /> : <MoonIcon size={16} />}
                        <span>{darkMode ? "Modo claro" : "Modo oscuro"}</span>
                    </span>
                    <span className={`rex-sidebar__toggle-track${darkMode ? " rex-sidebar__toggle-track--on" : ""}`}>
                        <span className="rex-sidebar__toggle-thumb" />
                    </span>
                </button>

                <NavLink to="/profile" className="rex-sidebar__profile">
                    <span className="rex-sidebar__avatar">{getInitials(user?.name)}</span>
                    <span className="rex-sidebar__profile-info">
                        <span className="rex-sidebar__profile-name">{user?.name}</span>
                        <span className="rex-sidebar__profile-role">{user?.roles?.join(", ")}</span>
                    </span>
                </NavLink>

                <button type="button" onClick={logout} className="rex-sidebar__logout">
                    <LogOutIcon size={14} />
                    <span>Cerrar sesión</span>
                </button>
            </div>
        </aside>
    );
}