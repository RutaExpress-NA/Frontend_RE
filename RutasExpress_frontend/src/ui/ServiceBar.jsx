export function ServiceBar({ name, count, max }) {
    const pct = Math.round((count / max) * 100);
    return (
        <div className="rex-service-bar">
            <span className="rex-service-bar__label">{name}</span>
            <div className="rex-service-bar__track">
                <div className="rex-service-bar__fill" style={{ width: `${pct}%` }} />
            </div>
            <span className="rex-service-bar__count">{count} env.</span>
        </div>
    );
}