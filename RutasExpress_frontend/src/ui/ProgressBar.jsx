export function ProgressBar({ label, value, max, countLabel }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="rex-service-bar">
      <span className="rex-service-bar__label">{label}</span>
      <div className="rex-service-bar__track">
        <div className="rex-service-bar__fill" style={{ width: `${pct}%` }} />
      </div>
      <span className="rex-service-bar__count">
        {countLabel ?? `${value}/${max}`}
      </span>
    </div>
  );
}