import Icon from '../ui/Icon';
import Img from '../ui/Img';
import { CornerBloom } from '../ui/decor';
import { Eyebrow, Reveal, StatBlock } from '../ui/primitives';
import { AppLink } from '../../lib/router';

/**
 * Alternating image / copy block. Reused by every service page.
 *
 * props: eyebrow, title, body[], bullets[], image, imageAlt, flip, note, cta, badge
 */
export default function SplitFeature({
    eyebrow,
    title,
    body = [],
    bullets = [],
    image,
    imageAlt,
    flip = false,
    note,
    cta,
    stats,
    badge,
    arch = true,
    className = '',
}) {
    return (
        <section className={`section relative ${className}`} data-parallax-scope>
            <div className="shell grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
                {/* visual */}
                <div className={`relative ${flip ? 'lg:order-2' : ''}`}>
                    <div
                        data-img-reveal
                        className={`relative overflow-hidden border border-gold-600/20 ${arch ? 'arch' : 'rounded-card'}`}
                    >
                        <Img
                            src={image}
                            alt={imageAlt || title}
                            ratio={arch ? '4 / 4.6' : '5 / 4'}
                            fallbackLabel={title}
                            className="w-full"
                        />
                    </div>

                    {badge && (
                        <div
                            data-parallax="-0.06"
                            className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-4 rounded-card border border-gold-600/30 bg-ink-900/92 px-5 py-4 backdrop-blur-md sm:left-10 sm:translate-x-0"
                        >
                            <span className="grid size-11 place-items-center rounded-full bg-gold-400/12 text-gold-300">
                                <Icon name={badge.icon || 'award'} size={20} />
                            </span>
                            <span>
                                <span className="block font-display text-lg leading-tight text-cream-100">{badge.title}</span>
                                <span className="block text-[0.58rem] uppercase tracking-[0.22em] text-cream-500">
                                    {badge.body}
                                </span>
                            </span>
                        </div>
                    )}

                    <CornerBloom
                        className={`pointer-events-none absolute -top-7 text-gold-700/45 ${flip ? '-left-7' : '-right-7'}`}
                        size={88}
                        flip={!flip}
                    />
                </div>

                {/* copy */}
                <div className={flip ? 'lg:order-1' : ''}>
                    {eyebrow && (
                        <Reveal className="flex">
                            <Eyebrow>{eyebrow}</Eyebrow>
                        </Reveal>
                    )}
                    <h2 data-split className="display-2 mt-6 opacity-0 text-balance">
                        {title}
                    </h2>

                    {body.map((p, i) => (
                        <Reveal key={i} delay={0.05 * i} className="mt-5">
                            <p className="text-[1.02rem] leading-relaxed text-cream-400">{p}</p>
                        </Reveal>
                    ))}

                    {bullets.length > 0 && (
                        <ul className="mt-9 grid gap-4 sm:grid-cols-2">
                            {bullets.map((b, i) => (
                                <Reveal key={b} as="li" delay={0.04 * i} className="flex items-start gap-3">
                                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border border-gold-600/50 text-gold-300">
                                        <Icon name="check" size={13} />
                                    </span>
                                    <span className="text-sm leading-relaxed text-cream-300">{b}</span>
                                </Reveal>
                            ))}
                        </ul>
                    )}

                    {stats && <StatBlock stats={stats} className="mt-11" />}

                    {note && (
                        <Reveal delay={0.1} className="mt-9 flex items-start gap-3 rounded-2xl border border-gold-700/25 bg-gold-600/[0.06] p-5">
                            <Icon name="sparkle" size={18} className="mt-0.5 shrink-0 text-gold-400" />
                            <p className="text-sm text-cream-300">{note}</p>
                        </Reveal>
                    )}

                    {cta && (
                        <Reveal delay={0.12} className="mt-10">
                            <AppLink href={cta.href} className="btn btn-gold">
                                {cta.label}
                                <Icon name="arrow-right" size={16} />
                            </AppLink>
                        </Reveal>
                    )}
                </div>
            </div>
        </section>
    );
}
