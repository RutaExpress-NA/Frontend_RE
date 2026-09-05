export function BarChart({ data, height = 160 }) {
    const max = Math.max(...data.map((d) => d.value), 1);
    const barWidth = 100 / data.length;

    return (
        <div className="rex-bar-chart" style={{ height }}>
            {data.map((point) => {
                const pct = (point.value / max) * 100;
                return (
                    <div key={point.label} className="rex-bar-chart__col" style={{ width: `${barWidth}%` }}>
                        <span className="rex-bar-chart__value">{point.value}</span>
                        <div className="rex-bar-chart__track">
                            <div className="rex-bar-chart__bar" style={{ height: `${pct}%` }}/>
                        </div>
                        <span className="rex-bar-chart__label">{point.label}</span>
                    </div>
                );
            })}
        </div>
    );
}

//BUSCAR LIBRERIAS PARA MEJORAR