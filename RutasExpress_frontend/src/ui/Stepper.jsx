export function Stepper({ steps, currentIndex, cancelled = false }) {
    const progressTone = cancelled ? "danger" : steps[currentIndex]?.tone || "neutral";

    return (
        <div className="rex-stepper">
            {steps.map((step, index) => {
                const state = cancelled
                    ? index <= currentIndex ? "cancelled" : "pending"
                    : index < currentIndex
                        ? "completed"
                        : index === currentIndex
                            ? "active"
                            : "pending";
                const connectorState = cancelled
                    ? index < currentIndex ? "cancelled" : "pending"
                    : state;
                const labelTone = state === "pending" ? "pending" : progressTone;

                return (
                    <div key={step.key} className="rex-stepper__step">
                        <div className={`rex-stepper__node rex-stepper__node--${state}`}>
                            {step.icon}
                        </div>
                        <span className={`rex-stepper__label rex-stepper__label--${state} rex-stepper__label--${labelTone}`}>
                            {step.label}
                        </span>
                        {index < steps.length - 1 && (
                            <div className={`rex-stepper__connector rex-stepper__connector--${connectorState} rex-stepper__connector--${progressTone}`} />
                        )}
                    </div>
                );
            })}
        </div>
    );
}