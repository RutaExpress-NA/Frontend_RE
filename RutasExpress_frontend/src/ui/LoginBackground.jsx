const PARTICLES = Array.from({ length: 18 }, (_, index) => index + 1);

export function LoginBackground() {
    return (
        <div className="rex-login-bg" aria-hidden="true">
            <div className="rex-login-bg__glow rex-login-bg__glow--primary" />
            <div className="rex-login-bg__glow rex-login-bg__glow--accent" />
            <div className="rex-login-bg__orbit rex-login-bg__orbit--one" />
            <div className="rex-login-bg__orbit rex-login-bg__orbit--two" />

            <div className="rex-login-bg__particles">
                {PARTICLES.map((particle) => (
                    <span key={particle} className={`rex-login-bg__particle rex-login-bg__particle--${particle}`} />
                ))}
            </div>

            <svg
                viewBox="0 0 1440 440"
                preserveAspectRatio="none"
                className="rex-login-bg__landscape"
            >
                <path className="rex-login-bg__hill rex-login-bg__hill--back"
                    d="M0 270 C190 190 330 245 480 220 S760 185 920 255 S1220 205 1440 180 V440 H0 Z" />
                <path className="rex-login-bg__hill rex-login-bg__hill--front"
                    d="M0 330 C180 280 320 315 480 285 S790 265 940 325 S1240 285 1440 245 V440 H0 Z" />
                <path className="rex-login-bg__road-edge"
                    d="M-100 390 C220 390 350 382 560 390 S930 398 1120 388 S1380 386 1540 390" />
                <path className="rex-login-bg__road"
                    d="M-100 390 C220 390 350 382 560 390 S930 398 1120 388 S1380 386 1540 390" />
                <path className="rex-login-bg__road-markings"
                    d="M-100 390 C220 390 350 382 560 390 S930 398 1120 388 S1380 386 1540 390" />
                <g className="rex-login-bg__bike-travel" transform="translate(650 0)">
                    <animateTransform
                        attributeName="transform"
                        type="translate"
                        additive="sum"
                        values="-790 0;930 0;-790 0"
                        keyTimes="0;0.5;1"
                        dur="36s"
                        repeatCount="indefinite"
                        calcMode="linear"
                    />
                    <g className="rex-login-bg__bike-direction">
                        <g className="rex-login-bg__bike" transform="translate(0 325)">
                            <circle className="rex-login-bg__bike-wheel" cx="20" cy="66" r="19" />
                            <circle className="rex-login-bg__bike-wheel" cx="91" cy="66" r="19" />
                            <path className="rex-login-bg__bike-frame" d="M20 66 L43 35 L68 66 L47 66 L34 47 M43 35 H74 L91 66 M68 66 L82 37" />
                            <path className="rex-login-bg__bike-body" d="M42 34 L50 19 L72 21 L83 38 L64 43 Z" />
                            <circle className="rex-login-bg__bike-helmet" cx="53" cy="12" r="9" />
                            <path className="rex-login-bg__bike-rider" d="M50 21 L38 39 M72 23 L83 17 L92 18" />
                            <path className="rex-login-bg__bike-light" d="M88 37 L97 37" />
                        </g>
                    </g>
                </g>
            </svg>
        </div>
    );
}
