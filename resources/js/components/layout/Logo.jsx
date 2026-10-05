import { AppLink } from '../../lib/router';

/** Brand mark — a hand drawn gold flourish inside a lozenge. */
export function BrandMark({ size = 40, className = '' }) {
    return (
        <svg width={size} height={size} viewBox="0 0 44 44" fill="none" className={className} aria-hidden="true">
            <path
                d="M22 2.5 40.5 22 22 41.5 3.5 22 22 2.5Z"
                stroke="currentColor"
                strokeWidth="0.9"
                opacity="0.55"
            />
            <path d="M22 8.5 35.5 22 22 35.5 8.5 22 22 8.5Z" stroke="currentColor" strokeWidth="0.6" opacity="0.35" />
            <path
                d="M22 13c2.6 2.5 4 4.7 4 6.7 0 1.8-1.2 3-2.7 3.3 2.4.5 3.9 2 3.9 4.2 0 2.6-2.2 4.3-5.2 4.3s-5.2-1.7-5.2-4.3c0-2.2 1.5-3.7 3.9-4.2C19.2 22.7 18 21.5 18 19.7c0-2 1.4-4.2 4-6.7Z"
                fill="currentColor"
                opacity="0.9"
            />
            <path d="M22 6.5v4M22 33.5v4" stroke="currentColor" strokeWidth="0.8" />
        </svg>
    );
}

export default function Logo({ className = '', compact = false }) {
    return (
        <AppLink
            href="/"
            aria-label="Irin Crafted home"
            className={`group inline-flex items-center gap-3 text-cream-50 transition-colors duration-500 hover:text-gold-200 ${className}`}
        >
            <span className="text-gold-500 transition-transform duration-700 group-hover:rotate-180">
                <BrandMark size={compact ? 32 : 40} />
            </span>
            <span className="flex flex-col leading-none">
                <span className={`font-display tracking-[0.2em] ${compact ? 'text-lg' : 'text-xl sm:text-2xl'}`}>
                    IRIN&nbsp;CRAFTED
                </span>
                {!compact && (
                    <span className="mt-1 hidden text-[0.55rem] uppercase tracking-[0.42em] text-cream-500 sm:block">
                        Personal Chef Experiences
                    </span>
                )}
            </span>
        </AppLink>
    );
}
