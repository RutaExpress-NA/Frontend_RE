export function Tabs({ options, active, onChange }) {
    return (
        <div className="rex-tabs">
            {options.map((opt) => (
                <button key={opt.value} type="button" onClick={() => onChange(opt.value)}
                    className={`rex-tabs__tab ${active === opt.value ? "rex-tabs__tab--active" : ""}`}>
                    {opt.label}
                </button>
            ))}
        </div>
    );
}