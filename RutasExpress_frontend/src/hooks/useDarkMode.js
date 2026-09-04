import { useEffect, useState } from "react";

export function useDarkMode() {
    const [darkMode, setDarkMode] = useState(
        () => window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false
    );

    useEffect(() => {
        document.documentElement.classList.toggle("dark", darkMode);
    }, [darkMode]);

    return [darkMode, () => setDarkMode((v) => !v)];
}