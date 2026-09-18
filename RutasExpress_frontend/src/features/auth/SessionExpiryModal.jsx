import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { Button } from "../../ui/Button";

export function SessionExpiryModal() {
    const { sessionState, expiresOn, renewSession, logout, hideSessionModal } = useAuth();
    const navigate = useNavigate();

    const [secondsLeft, setSecondsLeft] = useState(0);

    useEffect(() => {
        if (sessionState !== "warning" || !expiresOn) return;

        function tick() {
            const remaining = Math.max(0, Math.round((expiresOn.getTime() - Date.now()) / 1000));
            setSecondsLeft(remaining);
        }

        tick();
        const interval = setInterval(tick, 1000);
        return () => clearInterval(interval);
    }, [sessionState, expiresOn]);

    if (sessionState === "hidden") return null;

    function handleLogoutNow() {
        logout();
        navigate("/login", { replace: true });
    }

    function handleOverlayClick() {
        if (sessionState === "renewed") hideSessionModal();
    }


    const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
    const seconds = String(secondsLeft % 60).padStart(2, "0");

    return (
        <div className="rex-session-modal__overlay" onClick={handleOverlayClick}>
            <div className="rex-session-modal" onClick={(e) => e.stopPropagation()}>
                {sessionState === "warning" && (
                    <>
                        <h2 className="rex-session-modal__title">¿Sigues ahí?</h2>
                        <p className="rex-session-modal__text">
                            Tu sesión está por expirar por inactividad.
                        </p>
                        <div className="rex-session-modal__countdown">
                            {minutes}:{seconds}
                        </div>
                        <div className="rex-session-modal__actions">
                            <Button variant="primary" fullWidth onClick={renewSession}>
                                Sigo aquí
                            </Button>
                            <Button variant="outline" fullWidth onClick={handleLogoutNow}>
                                Cerrar sesión
                            </Button>
                        </div>
                    </>
                )}

                {sessionState === "renewed" && (
                    <>
                        <h2 className="rex-session-modal__title rex-session-modal__title--success">
                            ✓ Sesión renovada
                        </h2>
                        <p className="rex-session-modal__text">
                            Puedes seguir donde estabas.
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}