import { EnvelopeIllustration, PostmarkIllustration, CloudIllustration } from "./LoginIllustrations";

export function LoginBackground() {
    return (
        <div className="rex-login-bg" aria-hidden="true">
            <div className="rex-login-bg__cloud rex-login-bg__cloud--1"><CloudIllustration /></div>
            <div className="rex-login-bg__cloud rex-login-bg__cloud--2"><CloudIllustration /></div>
            <div className="rex-login-bg__cloud rex-login-bg__cloud--3"><CloudIllustration /></div>
            <div className="rex-login-bg__cloud rex-login-bg__cloud--4"><CloudIllustration /></div>

            <div className="rex-login-bg__envelope rex-login-bg__envelope--1">
                <EnvelopeIllustration size={52} />
            </div>
            <div className="rex-login-bg__envelope rex-login-bg__envelope--2">
                <EnvelopeIllustration size={36} />
            </div>

            <div className="rex-login-bg__postmark rex-login-bg__postmark--1">
                <PostmarkIllustration text="RUTA" />
            </div>
            <div className="rex-login-bg__postmark rex-login-bg__postmark--2">
                <PostmarkIllustration text="EXPRESS" />
            </div>

<svg
    viewBox="0 0 1440 120"
    preserveAspectRatio="none"
    className="rex-login-bg__wave"
    width="100%"
    height="112"
>
    <path d="M0 80 Q360 20 720 60 Q1080 100 1440 40 L1440 120 L0 120 Z" />
            </svg>

            <div className="rex-login-bg__dots">
                {Array.from({ length: 10 }).map((_, i) => (
                    <span key={i} className={`rex-login-bg__dot rex-login-bg__dot--${i + 1}`} />
                ))}
            </div>
        </div>
    );
}