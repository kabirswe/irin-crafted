import Img from './Img';

/**
 * Guest avatar.
 *
 * Renders a portrait when one is available and otherwise falls back to a gold
 * monogram on the espresso surface — so the trust rows and testimonial cards
 * read as a deliberate design choice rather than a missing asset.
 */
export default function Avatar({ src, name = '', size = 48, className = '', ring = true }) {
    const initials = name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0])
        .join('')
        .toUpperCase();

    return (
        <span
            className={`relative grid shrink-0 place-items-center overflow-hidden rounded-full bg-[linear-gradient(150deg,#2c2721,#141210)] ${
                ring ? 'border border-gold-400/55' : ''
            } ${className}`}
            style={{ width: size, height: size }}
        >
            {src ? (
                <Img
                    src={src}
                    alt={name}
                    fallbackLabel=""
                    className="absolute inset-0 h-full w-full rounded-full"
                />
            ) : null}
            <span
                className="pointer-events-none select-none font-display font-semibold leading-none tracking-wide text-gold-200"
                style={{ fontSize: Math.max(12, size * 0.38) }}
                aria-hidden="true"
            >
                {initials || '★'}
            </span>
        </span>
    );
}
