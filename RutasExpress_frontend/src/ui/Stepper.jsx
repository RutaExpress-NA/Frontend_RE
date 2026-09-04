export function Stepper({ steps, currentIndex, cancelled = false }) {
    return (
        <div className="rex-stepper">
            {steps.map((step, index) => {
                const state = cancelled
                    ? "cancelled"
                    : index < currentIndex
                        ? "completed"
                        : index === currentIndex
                            ? "active"
                            : "pending";

                return (
                    <div key={step.key} className="rex-stepper__step">
                        <div className={`rex-stepper__node rex-stepper__node--${state}`}>
                            {step.icon}
                        </div>
                        <span className={`rex-stepper__label rex-stepper__label--${state}`}>
                            {step.label}
                        </span>
                        {index < steps.length - 1 && (
                            <div className={`rex-stepper__connector rex-stepper__connector--${state}`} />
                        )}
                    </div>
                );
            })}
        </div>
    );
}