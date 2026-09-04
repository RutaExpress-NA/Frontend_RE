export function Button({
    children,
    variant = "primary",
    size = "md",
    fullWidth = false,
    disabled = false,
    loading = false,
    icon = null,
    iconRight = null,
    as = "button",
    className = "",
    ...rest
}) {
    const Tag = as;

    const classes = [
        "rex-button",
        `rex-button--${variant}`,
        `rex-button--${size}`,
        fullWidth ? "rex-button--full" : "",
        loading ? "rex-button--loading" : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <Tag className={classes} disabled={as === "button" ? disabled || loading : undefined}
            aria-busy={loading || undefined} {...rest}>
            {loading ? (
                <span className="rex-button__spinner" aria-hidden="true" />
            ) : (
                icon && <span className="rex-button__icon">{icon}</span>
            )}
            <span className="rex-button__label">{children}</span>
            {!loading && iconRight && (
                <span className="rex-button__icon rex-button__icon--right">
                    {iconRight}
                </span>
            )}
        </Tag>
    );
}