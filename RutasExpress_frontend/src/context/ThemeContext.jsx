/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";
import { useDarkMode } from "../hooks/useDarkMode";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
    const [darkMode, toggleDarkMode] = useDarkMode();

    return (
        <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error("useTheme debe usarse dentro de un <ThemeProvider>");
    return ctx;
}