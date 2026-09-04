export function StatusBadge({ label, tone = "neutral" }) {
    return (
        <span className={`rex-status-pill rex-status-pill--${tone}`}>
            {label}
        </span>
    );
}