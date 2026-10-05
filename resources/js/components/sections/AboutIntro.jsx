import Icon from '../ui/Icon';
import Img from '../ui/Img';
import { CornerBloom } from '../ui/decor';
import { Eyebrow, Reveal, Counter } from '../ui/primitives';
import { AppLink } from '../../lib/router';

/**
 * About block — reference pattern: copy + stats + button on the left,
 * a layered trio of images on the right.
 */
export default function AboutIntro({ about }) {
    const [primary, secondary] = about.images;

    return (
        <section className="section relative overflow-hidden" data-parallax-scope>
            <div className="pointer-events-none absolute right-[-8rem] top-24 h-[26rem] w-[26rem] glow-gold opacity-40" />

            <div className="shell relative grid items-center gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
                {/* copy */}
                <div>
                    <Reveal className="flex">
                        <Eyebrow>{about.eyebrow}</Eyebrow>
                    </Reveal>
                    <h2 data-split className="display-2 mt-6 opacity-0 text-balance">
                        {about.title}
                    </h2>

                    {about.body.map((p, i) => (
                        <Reveal key={i} delay={0.05 * i} className="mt-5">
                            <p className="leading-relaxed text-cream-400">{p}</p>
                        </Reveal>
                    ))}

                    {/* stats */}
                    <dl className="mt-11 grid grid-cols-3 gap-6">
                        {about.stats.map((s, i) => (
                            <Reveal key={s.label} delay={0.05 * i} className="border-l border-gold-700/40 pl-4">
                                <dt className="sr-only">{s.label}</dt>
                                <dd>
                                    <span className="font-display text-3xl text-gold-300 sm:text-4xl">
                                        <Counter value={s.value} suffix={s.suffix} />
                                    </span>
                                    <span className="mt-1 block text-[0.62rem] uppercase tracking-[0.18em] text-cream-500">
                                        {s.label}
                                    </span>
                                </dd>
                            </Reveal>
                        ))}
                    </dl>

                    <Reveal delay={0.12} className="mt-11">
                        <AppLink href={about.cta.href} className="btn btn-gold">
                            {about.cta.label}
                        </AppLink>
                    </Reveal>
                </div>

                {/* layered imagery */}
                <div className="relative" data-parallax-scope>
                    <div className="grid grid-cols-2 gap-4">
                        <div data-img-reveal className="overflow-hidden rounded-card border border-gold-600/20">
                            <Img
                                src={primary.src}
                                alt={primary.alt}
                                ratio="4 / 5"
                                fallbackLabel="Signature dish"
                                className="w-full"
                            />
                        </div>
                        <div className="mt-12 space-y-4">
                            <div data-img-reveal className="overflow-hidden rounded-card border border-gold-600/20">
                                <Img
                                    src={secondary.src}
                                    alt={secondary.alt}
                                    ratio="4 / 4.4"
                                    fallbackLabel="Chef’s craft"
                                    className="w-full"
                                />
                            </div>
                            <Reveal
                                data-parallax="-0.05"
                                className="flex items-center gap-3 rounded-card border border-gold-600/25 bg-ink-800 px-4 py-4"
                            >
                                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-gold-400/12 text-gold-300">
                                    <Icon name="award" size={18} />
                                </span>
                                <span>
                                    <span className="block font-display text-lg leading-tight text-cream-100">
                                        Fine Dining
                                    </span>
                                    <span className="block text-[0.58rem] uppercase tracking-[0.2em] text-cream-500">
                                        Trained Chef
                                    </span>
                                </span>
                            </Reveal>
                        </div>
                    </div>

                    <CornerBloom className="pointer-events-none absolute -left-8 -top-8 text-gold-700/40" size={86} flip />
                </div>
            </div>
        </section>
    );
}
