import { ClientDashboardView } from "./Clientdashboardview";
import { DispatcherDashboardView } from "./Dispatcherdashboardview";
import { AdminDashboardView } from "./Admindashboardview";
import { useAuth } from "../auth/AuthContext";
import { DashboardGreeting } from "./Dashboardgreeting";

export function DashboardPage() {
    const { user } = useAuth();

    if (!user) return null;

    const dashboardsByRole = {
        Admin: AdminDashboardView,
        Despachador: DispatcherDashboardView,
        Cliente: ClientDashboardView,
        Auditor: AdminDashboardView,
    };

    const userRole = user.roles[0];
    const DashboardComponent = dashboardsByRole[userRole];

    if (!DashboardComponent) {
        return (
            <div className="rex-dashboard-wrapper">
                <DashboardGreeting userName={user.name} />
                <div style={{ padding: "20px", color: "#c0392b" }}>
                    <p>Rol no reconocido: <strong>{userRole}</strong></p>
                </div>
            </div>
        );
    }

    return (
        <div className="rex-dashboard-wrapper">
            <DashboardGreeting userName={user.name} showPeriodTabs={userRole === "Admin"} />
            <div className="rex-dashboard">
                <DashboardComponent />
            </div>
        </div>
    );
}