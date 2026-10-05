import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';

/* ------------------------------------------------------------------ *
 * Reveal — wraps content in a GSAP animated node
 * ------------------------------------------------------------------ */
export function Reveal({ children, as: Tag = 'div', anim = 'up', delay = 0, group, className = '', ...rest }) {
    return (
        <Tag data-anim={anim} data-delay={delay || undefined} data-stagger-group={group} className={className} {...rest}>
            {children}
        </Tag>
    );
}

/* ------------------------------------------------------------------ *
 * Eyebrow label
 * ------------------------------------------------------------------ */
export function Eyebrow({ children, center = false, className = '' }) {
    return (
        <span className={`eyebrow ${center ? 'eyebrow--center' : ''} ${className}`}>
            {children}
        </span>
    );
}

/* ------------------------------------------------------------------ *
 * Section heading block (eyebrow + title + copy)
 * ------------------------------------------------------------------ */
export function SectionHeading({
    eyebrow,
    title,
    body,
    align = 'center',
    size = 'display-2',
    className = '',
    titleClassName = '',
    bodyClassName = '',
    children,
}) {
    const centered = align === 'center';
    return (
        <div className={`${centered ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'} ${className}`}>
            {eyebrow && (
                <Reveal className={centered ? 'flex justify-center' : ''}>
                    <Eyebrow center={centered}>{eyebrow}</Eyebrow>
                </Reveal>
            )}
            {title && (
                <h2
                    data-split
                    className={`${size} mt-5 text-balance opacity-0 ${titleClassName}`}
                >
                    {title}
                </h2>
            )}
            {body && (
                <Reveal
                    className={`lede mt-6 ${centered ? 'mx-auto' : ''} ${bodyClassName}`}
                    delay={0.06}
                >
                    {body}
                </Reveal>
            )}
            {children}
        </div>
    );
}

/* ------------------------------------------------------------------ *
 * Wing divider (decorative, matches the reference motif)
 * ------------------------------------------------------------------ */
export function WingDivider({ width = 86, className = '' }) {
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

/* ------------------------------------------------------------------ *
 * Counter (animated by GSAP via data-count)
 * ------------------------------------------------------------------ */
export function Counter({ value, suffix = '', className = '' }) {
    return (
        <span data-count={value} data-suffix={suffix} className={className}>
            0{suffix}
        </span>
    );
}

/* ------------------------------------------------------------------ *
 * Rating stars
 * ------------------------------------------------------------------ */
export function Rating({ value = 5, size = 14, className = '' }) {
    return (
        <span className={`flex items-center gap-1 text-gold-400 ${className}`} aria-label={`${value} out of 5`}>
            {Array.from({ length: 5 }).map((_, i) => (
                <Icon key={i} name="star" size={size} filled={i < value} className={i < value ? '' : 'opacity-30'} />
            ))}
        </span>
    );
}

/* ------------------------------------------------------------------ *
 * Ornamental divider (inline SVG so it scales crisply)
 * ------------------------------------------------------------------ */
export function Ornament({ className = '', width = 180 }) {
    return (
        <span className={`inline-flex items-center justify-center gap-3 text-gold-600 ${className}`} aria-hidden="true">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold-700/70" />
            <svg width={width} height="18" viewBox="0 0 180 18" fill="none" stroke="currentColor" strokeWidth="0.9">
                <path d="M90 2.5 93.4 9 90 15.5 86.6 9 90 2.5Z" />
                <path d="M74 9c4.6-5.4 11-5.4 16 0-5 5.4-11.4 5.4-16 0Z" opacity="0.7" />
                <path d="M106 9c-4.6-5.4-11-5.4-16 0 5 5.4 11.4 5.4 16 0Z" opacity="0.7" />
                <path d="M8 9h58M114 9h58" opacity="0.55" />
            </svg>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold-700/70" />
        </span>
    );
}

/* ------------------------------------------------------------------ *
 * Marquee
 * ------------------------------------------------------------------ */
export function Marquee({ items, duration = 38, className = '', separator = '✦', renderItem }) {
    const row = [...items, ...items];
    return (
        <div className={`mask-fade-x overflow-hidden ${className}`}>
            <div className="marquee-track" style={{ '--marquee-duration': `${duration}s` }}>
                {row.map((item, i) => (
                    <span key={i} className="flex shrink-0 items-center gap-8 px-8">
                        {renderItem ? renderItem(item, i) : (
                            <span className="font-display text-xl tracking-[0.12em] text-cream-300/80">{item}</span>
                        )}
                        <span className="text-xs text-gold-600/70">{separator}</span>
                    </span>
                ))}
            </div>
        </div>
    );
}

/* ------------------------------------------------------------------ *
 * Accordion (GSAP height animation)
 * ------------------------------------------------------------------ */
export function Accordion({ items, defaultOpen = 0, className = '' }) {
    const [open, setOpen] = useState(defaultOpen);
    const refs = useRef([]);

    useEffect(() => {
        let cancelled = false;
        import('../../lib/anim').then(({ animateAccordion }) => {
            if (cancelled) return;
            refs.current.forEach((panel, i) => animateAccordion(panel, i === open));
        });
        return () => {
            cancelled = true;
        };
    }, [open]);

    return (
        <div className={`space-y-3 ${className}`}>
            {items.map((item, i) => {
                const isOpen = i === open;
                return (
                    <div
                        key={item.q}
                        className={`group overflow-hidden rounded-card border bg-ink-850/60 transition-colors duration-500 ${
                            isOpen ? 'border-gold-400/45' : 'border-cream-100/10 hover:border-gold-600/40'
                        }`}
                    >
                        <button
                            type="button"
                            onClick={() => setOpen(isOpen ? -1 : i)}
                            aria-expanded={isOpen}
                            className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition-colors duration-300"
                        >
                            <span className={`display-4 ${isOpen ? 'text-gold-200' : 'text-cream-100'}`}>{item.q}</span>
                            <span className={`shrink-0 transition-colors duration-500 ${isOpen ? 'text-gold-300' : 'text-cream-400'}`}>
                                <Icon name={isOpen ? 'minus' : 'plus'} size={18} />
                            </span>
                        </button>
                        <div ref={(el) => (refs.current[i] = el)} style={{ height: 0, opacity: 0, overflow: 'hidden' }}>
                            <p className="max-w-3xl px-6 pb-6 text-cream-400">{item.a}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

/* ------------------------------------------------------------------ *
 * Small presentational helpers
 * ------------------------------------------------------------------ */
export function Badge({ children, className = '' }) {
    return (
        <span
            className={`inline-flex items-center gap-2 rounded-full border border-gold-600/40 bg-gold-600/10 px-3.5 py-1.5 text-[0.68rem] uppercase tracking-[0.22em] text-gold-200 ${className}`}
        >
            {children}
        </span>
    );
}

export function StatBlock({ stats, className = '' }) {
    return (
        <dl className={`grid grid-cols-3 gap-4 ${className}`}>
            {stats.map((s, i) => (
                <Reveal key={s.label} className="border-l border-gold-700/40 pl-4 sm:pl-6">
                    <dt className="sr-only">{s.label}</dt>
                    <dd>
                        <span className="font-display text-3xl text-gold-200 sm:text-4xl">
                            <Counter value={s.value} suffix={s.suffix} />
                        </span>
                        <span className="mt-1 block text-[0.68rem] uppercase tracking-[0.2em] text-cream-500">
                            {s.label}
                        </span>
                    </dd>
                </Reveal>
            ))}
        </dl>
    );
}

export function GoldRule({ className = '' }) {
    return <span data-rule className={`block h-px w-full bg-gradient-to-r from-gold-700/70 via-gold-500/60 to-transparent ${className}`} />;
}
