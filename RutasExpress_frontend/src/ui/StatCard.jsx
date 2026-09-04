export function StatCard({ icon, value, label, sublabel, tone = "primary" }) {
    return (
        <div className="rex-statcard">
            <div className={`rex-statcard__icon rex-statcard__icon--${tone}`}>{icon}</div>
                <div className="rex-statcard__value">{value}</div>
            <div className="rex-statcard__label">{label}</div>
            {sublabel && <div className="rex-statcard__sublabel">{sublabel}</div>}
        </div>
    );
}