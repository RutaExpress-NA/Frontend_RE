import { Blobatar } from "@blobatar/react";
import { useGaze } from "@blobatar/react/gaze";
import "blobatar/motion.css";
import "blobatar/gaze.css";

export function UserAvatar({ name, size = 100, className = "" }) {
    const { ref } = useGaze({ travel: 3, lookAt: "pointer" });

    return (
        <span className={`rex-user-avatar ${className}`}>
            <Blobatar ref={ref} name={name} animate="always" size={size} />
        </span>
    );
}