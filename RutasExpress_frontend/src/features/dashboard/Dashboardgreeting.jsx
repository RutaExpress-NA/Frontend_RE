/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";

export function DashboardGreeting({ userName, showPeriodTabs = false }) {
  const [greeting, setGreeting] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const fullGreeting = `¡Buenos días, ${userName}!`;

  // Efecto de escritura
  useEffect(() => {
    if (isTyping && greeting.length < fullGreeting.length) {
      const timer = setTimeout(() => {
        setGreeting(fullGreeting.slice(0, greeting.length + 1));
      }, 50);
      return () => clearTimeout(timer);
    } else if (greeting.length === fullGreeting.length) {
      setIsTyping(false);
    }
  }, [greeting, isTyping, fullGreeting]);

  // cambian según la hora (agregar más y aleatorias si se quiere)
  const getMotivationalPhrase = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Todo bajo control";
    if (hour < 18) return "Mantén el ritmo";
    return "Casi listos para cerrar";
  };

  const today = new Date().toLocaleDateString("es-CL", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  const capitalizedToday = today.charAt(0).toUpperCase() + today.slice(1);

  return (
    <header className="rex-dashboard__header">
      <div className="rex-dashboard__greeting-section">
        <h1 className="rex-dashboard__title">
          {greeting}
          {isTyping && <span className="rex-dashboard__cursor">|</span>}
        </h1>
        <p className="rex-dashboard__subtitle">
          <span className="rex-dashboard__date">{capitalizedToday}</span>
            <span className="rex-dashboard__separator">·</span>
          <span className="rex-dashboard__phrase">{getMotivationalPhrase()}</span>
        </p>
      </div>
      {showPeriodTabs && (
        <div className="rex-dashboard__period-tabs" role="tablist">
          <button className="rex-dashboard__period-tab rex-dashboard__period-tab--active">
            Hoy
          </button>
            <button className="rex-dashboard__period-tab">Semana</button>
          <button className="rex-dashboard__period-tab">Mes</button>
        </div>
      )}
    </header>
  );
}