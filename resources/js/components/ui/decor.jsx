/**
 * Decorative line art matching the reference kit's floral flourishes:
 *  - Wing       : the small symmetric divider above section titles
 *  - FloralMark : large floral watermark used behind heroes
 *  - CornerBloom: corner sprig used on cards / hero corners
 */

/** Symmetric "wing" divider that sits above section titles. */
export function Wing({ className = '', width = 86 }) {
    return (
        <svg
            width={width}
            height="18"
            viewBox="0 0 86 18"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.9"
            className={className}
            aria-hidden="true"
        >
            <path d="M43 3.2c2.1 2.3 3.2 4.3 3.2 6.1 0 2-1.4 3.4-3.2 3.4s-3.2-1.4-3.2-3.4c0-1.8 1.1-3.8 3.2-6.1Z" />
            <path d="M39.8 9.6c-4-3.6-9-4.6-15-3 4.4 1.5 7.4 3.4 9 5.7 1.1 1.6 2.8 2.4 5.1 2.4" opacity="0.75" />
            <path d="M46.2 9.6c4-3.6 9-4.6 15-3-4.4 1.5-7.4 3.4-9 5.7-1.1 1.6-2.8 2.4-5.1 2.4" opacity="0.75" />
            <circle cx="43" cy="2" r="1.1" opacity="0.8" />
        </svg>
    );
}

/** Large floral watermark (very low opacity) for hero backgrounds. */
export function FloralMark({ className = '', size = 620 }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 200 200"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.35"
            className={className}
            aria-hidden="true"
        >
            <g transform="translate(100 100)">
                {Array.from({ length: 12 }).map((_, i) => (
                    <g key={i} transform={`rotate(${i * 30})`}>
                        <path d="M0 0C0 -14 -5 -26 -3 -40 0 -52 6 -60 10 -68" />
                        <path d="M0 0c6-8 12-14 20-17" opacity="0.8" />
                        <ellipse cx="14" cy="-30" rx="6.5" ry="12" transform="rotate(18 14 -30)" opacity="0.55" />
                        <ellipse cx="-8" cy="-38" rx="5" ry="9.5" transform="rotate(-22 -8 -38)" opacity="0.45" />
                        <circle cx="6" cy="-52" r="1.4" opacity="0.7" />
                    </g>
                ))}
                <circle r="7" opacity="0.6" />
                <circle r="26" opacity="0.35" strokeDasharray="1 6" />
                <circle r="46" opacity="0.22" strokeDasharray="1 8" />
            </g>
        </svg>
    );
}

/** Small corner sprig. */
export function CornerBloom({ className = '', size = 84, flip = false }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 84 84"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.7"
            className={className}
            style={flip ? { transform: 'scaleX(-1)' } : undefined}
            aria-hidden="true"
        >
            <path d="M2 82C10 60 22 44 40 34c14-8 28-10 42-6" opacity="0.8" />
            <path d="M14 66c8-2 14-6 18-12-9 1-15 5-18 12Z" opacity="0.55" />
            <path d="M28 52c9-1 16-4 21-11-10 0-17 4-21 11Z" opacity="0.55" />
            <path d="M44 40c9 0 16-3 21-9-10-1-17 2-21 9Z" opacity="0.45" />
            <path d="M60 32c7 1 13 0 18-4-8-2-14-1-18 4Z" opacity="0.4" />
            <circle cx="40" cy="34" r="1.6" opacity="0.7" />
        </svg>
    );
}

/** Section title with the wing divider above it (reference pattern). */
export function SectionEyebrow({ children, className = '' }) {
    return (
        <span className={`inline-flex flex-col items-center gap-3 ${className}`}>
            <Wing className="text-gold-600" />
            <span className="text-[0.68rem] font-medium uppercase tracking-[0.3em] text-gold-400">{children}</span>
        </span>
    );
}

export default { Wing, FloralMark, CornerBloom, SectionEyebrow };
