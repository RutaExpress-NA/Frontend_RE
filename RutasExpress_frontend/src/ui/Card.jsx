export function Card({
    children,
    padding = "md",
    interactive = false,
    as = "div",
    className = "",
    ...rest
}) {
    const Tag = as;

    const classes = [
        "rex-card",
        `rex-card--padding-${padding}`,
        interactive ? "rex-card--interactive" : "",
        className,]
        .filter(Boolean)
        .join(" ");

    return (
        <Tag className={classes} {...rest}>
            {children}
        </Tag>
    );
}