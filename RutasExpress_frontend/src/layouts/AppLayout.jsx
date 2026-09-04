import { Outlet } from "react-router-dom";
import { Sidebar } from "../ui/Sidebar";
import { useDarkMode } from "../hooks/useDarkMode";

export function AppLayout() {
    const [darkMode, toggleDarkMode] = useDarkMode();

    return (
        <div className="rex-app-layout">
            <Sidebar darkMode={darkMode} onToggleDark={toggleDarkMode} />
            <main className="rex-app-layout__main">
                <Outlet />
            </main>
        </div>
    );
}