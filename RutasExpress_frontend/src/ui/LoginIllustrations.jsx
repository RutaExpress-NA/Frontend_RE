export function EnvelopeIllustration({ size = 48 }) {
    return (
        <svg width={size} height={size * 0.7} viewBox="0 0 100 70" className="rex-illustration-envelope">
            <rect x="2" y="2" width="96" height="66" rx="10" className="rex-illustration-envelope__body" />
            <path d="M4 8 L50 42 L96 8" className="rex-illustration-envelope__flap" />
        </svg>
    );
}

export function PostmarkIllustration({ text }) {
    return (
        <div className="rex-illustration-postmark">
            <svg viewBox="0 0 90 90" className="rex-illustration-postmark__ring">
                <circle cx="45" cy="45" r="42" />
            </svg>
            <span className="rex-illustration-postmark__text">{text}</span>
        </div>
    );
}

export function CloudIllustration() {
    return (
        <svg viewBox="0 0 130 78" className="rex-illustration-cloud">
            <ellipse cx="65" cy="55" rx="55" ry="23" />
            <ellipse cx="50" cy="45" rx="28" ry="22" />
            <ellipse cx="85" cy="42" rx="22" ry="18" />
            <ellipse cx="65" cy="38" rx="20" ry="18" />
        </svg>
    );
}