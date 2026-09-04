export function CoverageMap({ zones = ["Santiago", "Providencia", "Maipú", "Ñuñoa"] }) {
    return (
        <div className="rex-coverage-map">
            <svg viewBox="0 0 260 130" className="rex-coverage-map__svg">
                <path d="M20 90 Q 90 40 140 70 T 230 40" className="rex-coverage-map__path" />
                    <circle cx="20" cy="90" r="6" className="rex-coverage-map__dot rex-coverage-map__dot--info" />
                <circle cx="140" cy="70" r="6" className="rex-coverage-map__dot rex-coverage-map__dot--danger" />
                    <circle cx="230" cy="40" r="6" className="rex-coverage-map__dot rex-coverage-map__dot--success" />
            </svg>
            <div className="rex-coverage-map__chips">
                {zones.map((z) => (
                    <span key={z} className="rex-chip">{z}</span>
                ))}
            </div>
        </div>
    );
}