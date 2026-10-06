import Icon from '../ui/Icon';
import Img from '../ui/Img';
import Avatar from '../ui/Avatar';
import { CornerBloom, FloralMark } from '../ui/decor';
import { Counter, Rating, Reveal } from '../ui/primitives';
import { AppLink } from '../../lib/router';

export default function Hero({ hero }) {
    return (
        <section data-hero className="relative overflow-hidden pt-32 pb-14 sm:pt-40 lg:pb-20" data-parallax-scope>
            {/* ambience */}
            <div className="pointer-events-none absolute inset-0">
                <FloralMark className="absolute -right-56 top-0 text-gold-700/[0.09]" size={660} />
                <div className="absolute -left-40 top-32 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(201,164,92,0.10),transparent_70%)]" />
                <div className="absolute inset-x-0 top-0 h-64 bg-[linear-gradient(180deg,rgba(10,9,8,0.75),transparent)]" />
            </div>

            <div className="shell relative grid items-center gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12">
                {/* copy */}
                <div className="relative z-10">
                    <Reveal data-hero-eyebrow className="flex">
                        <span className="eyebrow">{hero.eyebrow}</span>
                    </Reveal>

                    <h1 className="display-1 mt-6">
                        {hero.title.map((line, i) => (
                            <span key={line} className="block overflow-hidden">
                                <span data-hero-line className={`block ${i === 1 ? 'italic-accent' : ''}`}>
                                    {line}
                                </span>
                            </span>
                        ))}
                    </h1>

                    <p data-hero-copy className="lede mt-7 max-w-xl">
                        {hero.body}
                    </p>

                    <div className="mt-9 flex flex-wrap items-center gap-4">
                        <AppLink href={hero.primary.href} data-hero-action className="btn btn-gold">
                            {hero.primary.label}
                        </AppLink>
                        <AppLink href={hero.secondary.href} data-hero-action className="btn btn-ghost">
                            {hero.secondary.label}
                        </AppLink>
                    </div>

                    {/* trust row */}
                    <div className="mt-11 flex flex-wrap items-center gap-x-10 gap-y-6">
                        <div data-hero-badge className="flex items-center gap-4">
                            <div className="flex -space-x-3">
                                {['Olivia T.', 'Jessica M.', 'Michael A.', 'Daniel R.'].map((name) => (
                                    <Avatar key={name} name={name} size={44} className="ring-2 ring-ink-900" />
                                ))}
                            </div>
                            <div>
                                <p className="text-[0.6rem] uppercase tracking-[0.26em] text-cream-500">{hero.trustedLabel}</p>
                                <p className="font-display text-2xl leading-tight text-cream-100">
                                    <Counter value={hero.ratingValue} suffix={hero.ratingSuffix} />
                                </p>
                            </div>
                        </div>

                        <div data-hero-badge className="flex items-center gap-4">
                            <span className="hidden h-10 w-px bg-cream-100/15 sm:block" />
                            <div>
                                <Rating value={5} />
                                <p className="mt-1 text-[0.6rem] uppercase tracking-[0.26em] text-cream-500">{hero.ratingLabel}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* visual */}
                <div className="relative">
                    <div data-hero-visual className="relative">
                        <div className="relative overflow-hidden rounded-card border border-gold-600/25">
                            <Img
                                src={hero.image}
                                alt={hero.imageAlt}
                                ratio="4 / 4.7"
                                loading="eager"
                                fallbackLabel="Private Chef"
                                className="w-full"
                            />
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
                        </div>

                        <CornerBloom className="pointer-events-none absolute -right-7 -top-7 text-gold-700/45" size={96} />

                        {/* floating badge: experience */}
                        <div
                            data-parallax="0.05"
                            className="absolute -left-5 top-12 hidden rounded-card border border-gold-600/30 bg-ink-900/88 px-5 py-4 backdrop-blur-md sm:block"
                        >
                            <p className="font-display text-3xl leading-none text-gold-200">20+</p>
                            <p className="mt-1.5 text-[0.58rem] uppercase tracking-[0.24em] text-cream-500">Years of Craft</p>
                        </div>

                        {/* floating badge: rating */}
                        <div
                            data-parallax="-0.07"
                            className="absolute -right-4 bottom-12 hidden max-w-[13rem] rounded-card border border-gold-600/30 bg-ink-900/88 px-5 py-4 backdrop-blur-md sm:block"
                        >
                            <Rating value={5} />
                            <p className="mt-2 text-xs leading-relaxed text-cream-400">
                                “Akin to a Michelin-star restaurant, in our own dining room.”
                            </p>
                            <p className="mt-2 text-[0.58rem] uppercase tracking-[0.22em] text-gold-400">Olivia T.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
