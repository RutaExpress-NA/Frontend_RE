/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";
import { useDarkMode } from "../hooks/useDarkMode";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
    const [darkMode, toggleDark] = useDarkMode();

    return (
        <ThemeContext.Provider value={{ darkMode, toggleDark }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error("<ThemeProvider>");
    return ctx;
}