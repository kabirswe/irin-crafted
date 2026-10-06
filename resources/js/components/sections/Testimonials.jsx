import { useEffect, useRef, useState } from 'react';
import Icon from '../ui/Icon';
import Avatar from '../ui/Avatar';
import { SectionEyebrow } from '../ui/decor';
import { Rating, Reveal } from '../ui/primitives';

/** Local heading block with the wing divider motif. */
function Head({ eyebrow, title, body }) {
    return (
        <div className="flex flex-col items-center gap-6 text-center">
            {eyebrow && <SectionEyebrow>{eyebrow}</SectionEyebrow>}
            <h2 data-split className="display-2 mx-auto max-w-3xl opacity-0 text-balance">
                {title}
            </h2>
            {body && (
                <Reveal delay={0.06} className="mx-auto max-w-2xl">
                    <p className="text-cream-400">{body}</p>
                </Reveal>
            )}
        </div>
    );
}

function QuoteCard({ t, className = '' }) {
    return (
        <figure className={`group card relative flex h-full flex-col p-7 text-center ${className}`}>
            <span className="mx-auto text-gold-600/50 transition-colors duration-500 group-hover:text-gold-400/80">
                <Icon name="quote" size={30} filled />
            </span>
            <Rating value={t.rating} className="mt-5 justify-center" />
            <blockquote className="mt-5 font-display text-lg leading-snug text-cream-100">
                “{t.quote}”
            </blockquote>
            <figcaption className="mt-auto flex flex-col items-center gap-3 pt-7">
                <Avatar src={t.avatar} name={t.name} size={48} />
                <span>
                    <span className="block font-display text-lg text-cream-100">{t.name}</span>
                    <span className="mt-0.5 block text-[0.6rem] uppercase tracking-[0.24em] text-gold-400">{t.role}</span>
                </span>
            </figcaption>
        </figure>
    );
}

/** Auto-scrolling wall of testimonials (pauses on hover). */
export function TestimonialWall({ items, duration = 60, reverse = false, className = '' }) {
    const row = [...items, ...items];
    return (
        <div className={`mask-fade-x overflow-hidden ${className}`}>
            <div
                className="marquee-track gap-6"
                style={{
                    '--marquee-duration': `${duration}s`,
                    animationDirection: reverse ? 'reverse' : 'normal',
                }}
            >
                {row.map((t, i) => (
                    <div key={`${t.name}-${i}`} className="w-[19rem] shrink-0 sm:w-[23rem]">
                        <QuoteCard t={t} />
                    </div>
                ))}
            </div>
        </div>
    );
}

/** One-at-a-time slider used on the home page. */
export default function Testimonials({
    items,
    eyebrow = 'What our clients say',
    title = 'Experiences That Speak For Themselves',
    body,
    variant = 'slider',
}) {
    const [index, setIndex] = useState(0);
    const scope = useRef(null);

    useEffect(() => {
        if (variant !== 'slider') return;
        const id = setInterval(() => setIndex((i) => (i + 1) % items.length), 7000);
        return () => clearInterval(id);
    }, [items.length, variant]);

    useEffect(() => {
        if (variant !== 'slider' || !scope.current) return;
        let cancelled = false;
        import('../../lib/anim').then(({ gsap, prefersReducedMotion }) => {
            if (cancelled || prefersReducedMotion()) return;
            const cards = scope.current.querySelectorAll('[data-quote-slide]');
            cards.forEach((card, i) => {
                if (i === index) {
                    gsap.fromTo(
                        card,
                        { opacity: 0, y: 26, scale: 0.99 },
                        { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out' },
                    );
                }
            });
        });
        return () => {
            cancelled = true;
        };
    }, [index, variant]);

    if (variant === 'grid') {
        return (
            <section className="section relative">
                <div className="shell">
                    <Head eyebrow={eyebrow} title={title} body={body} />
                    <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {items.slice(0, 6).map((t, i) => (
                            <Reveal key={t.name} delay={(i % 3) * 0.06}>
                                <QuoteCard t={t} />
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (variant === 'wall') {
        return (
            <section className="section relative overflow-hidden bg-ink-950/60">
                <div className="shell">
                    <Head eyebrow={eyebrow} title={title} body={body} />
                </div>
                <div ref={scope} className="mt-14 space-y-6">
                    <TestimonialWall items={items} />
                    <TestimonialWall items={[...items].reverse()} reverse duration={70} />
                </div>
            </section>
        );
    }

    const active = items[index];
    return (
        <section ref={scope} className="section relative overflow-hidden border-y border-cream-200/10 bg-ink-950/70">
            <div className="pointer-events-none absolute left-1/2 top-0 h-[26rem] w-[46rem] -translate-x-1/2 glow-gold opacity-50" />
            <div className="shell relative">
                <Head eyebrow={eyebrow} title={title} body={body} />

                <div className="relative mx-auto mt-14 max-w-3xl">
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-gold-700/50">
                        <Icon name="quote" size={54} filled />
                    </span>

                    <div className="min-h-[18rem] pt-10">
                        {items.map((t, i) => (
                            <figure
                                key={t.name}
                                data-quote-slide
                                className={i === index ? 'block text-center' : 'hidden'}
                                aria-hidden={i !== index}
                            >
                                <Rating value={t.rating} className="justify-center" />
                                <blockquote className="mt-7 font-display text-2xl leading-snug text-cream-50 sm:text-[2rem]">
                                    “{t.quote}”
                                </blockquote>
                                <figcaption className="mt-9 flex flex-col items-center gap-3">
                                    <Avatar src={t.avatar} name={t.name} size={64} />
                                    <span className="font-display text-xl text-cream-50">{t.name}</span>
                                    <span className="text-[0.62rem] uppercase tracking-[0.28em] text-gold-500">{t.role}</span>
                                </figcaption>
                            </figure>
                        ))}
                    </div>

                    <div className="mt-10 flex items-center justify-center gap-6">
                        <button
                            type="button"
                            onClick={() => setIndex((index - 1 + items.length) % items.length)}
                            className="grid size-11 place-items-center rounded-full border border-cream-200/20 text-cream-300 transition-all duration-500 hover:-translate-x-0.5 hover:border-gold-500 hover:text-gold-200"
                            aria-label="Previous testimonial"
                        >
                            <Icon name="arrow-left" size={17} />
                        </button>

                        <div className="flex items-center gap-2.5">
                            {items.map((t, i) => (
                                <button
                                    key={t.name}
                                    type="button"
                                    onClick={() => setIndex(i)}
                                    aria-label={`Show testimonial ${i + 1}`}
                                    aria-current={i === index}
                                    className={`h-1.5 rounded-full transition-all duration-500 ${
                                        i === index ? 'w-8 bg-gold-500' : 'w-1.5 bg-cream-200/25 hover:bg-cream-200/50'
                                    }`}
                                />
                            ))}
                        </div>

                        <button
                            type="button"
                            onClick={() => setIndex((index + 1) % items.length)}
                            className="grid size-11 place-items-center rounded-full border border-cream-200/20 text-cream-300 transition-all duration-500 hover:translate-x-0.5 hover:border-gold-500 hover:text-gold-200"
                            aria-label="Next testimonial"
                        >
                            <Icon name="arrow-right" size={17} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
