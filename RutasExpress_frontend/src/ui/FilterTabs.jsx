export function FilterTabs({ options, active, onChange }) {
    return (
        <div className="rex-filter-tabs">
            {options.map((opt) => (
                <button key={opt.value} type="button" onClick={() => onChange(opt.value)}
                    className={`rex-filter-tabs__tab ${active === opt.value ? "rex-filter-tabs__tab--active" : ""}`}>
                    {opt.label}
                </button>
            ))}
        </div>
    );
}