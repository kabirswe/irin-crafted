import Img from '../ui/Img';
import { CornerBloom, FloralMark, Wing } from '../ui/decor';
import { Reveal } from '../ui/primitives';
import { AppLink } from '../../lib/router';

/**
 * Inner page hero — reference pattern:
 * left aligned breadcrumb + oversized serif title + lede, arched image right,
 * faint floral watermark behind, corner sprigs.
 */
export default function PageHero({ meta, breadcrumb = [], image }) {
    return (
        <section className="relative overflow-hidden border-b border-cream-100/8 pt-32 pb-14 sm:pt-40 sm:pb-20">
            {/* ambience */}
            <div className="pointer-events-none absolute inset-0">
                <FloralMark className="absolute -left-40 top-10 text-gold-700/[0.10] sm:-left-24" size={640} />
                <div className="absolute -top-32 left-1/2 h-[26rem] w-[44rem] -translate-x-1/2 glow-gold opacity-60" />
            </div>

            <div className="shell relative">
                <div className="grid items-end gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
                    {/* copy */}
                    <div className="pb-2">
                        <nav aria-label="Breadcrumb">
                            <ol className="flex flex-wrap items-center gap-3 text-[0.68rem] uppercase tracking-[0.22em] text-cream-500">
                                <li>
                                    <AppLink href="/" className="transition-colors hover:text-gold-200">
                                        Home
                                    </AppLink>
                                </li>
                                {breadcrumb.map((crumb) => (
                                    <li key={crumb.label} className="flex items-center gap-3">
                                        <span className="text-gold-700/70">/</span>
                                        {crumb.href ? (
                                            <AppLink href={crumb.href} className="transition-colors hover:text-gold-200">
                                                {crumb.label}
                                            </AppLink>
                                        ) : (
                                            <span className="text-gold-300">{crumb.label}</span>
                                        )}
                                    </li>
                                ))}
                            </ol>
                        </nav>

                        <h1 data-split className="display-1 mt-6 opacity-0">
                            {meta.title}
                        </h1>

                        <span className="mt-7 flex">
                            <Wing className="text-gold-600/80" width={72} />
                        </span>

                        {meta.body && (
                            <Reveal delay={0.1} className="mt-7">
                                <p className="max-w-xl text-[1.05rem] leading-relaxed text-cream-400">{meta.body}</p>
                            </Reveal>
                        )}

                        {meta.eyebrow && (
                            <Reveal delay={0.16} className="mt-8">
                                <span className="eyebrow">{meta.eyebrow}</span>
                            </Reveal>
                        )}
                    </div>

                    {/* arched visual */}
                    {image && (
                        <Reveal anim="right" delay={0.1} className="relative mx-auto w-full max-w-md lg:mx-0 lg:ml-auto">
                            <div data-img-reveal className="arch overflow-hidden border border-gold-700/25">
                                <Img
                                    src={image}
                                    alt={meta.title}
                                    ratio="4 / 4.6"
                                    loading="eager"
                                    fallbackLabel={meta.title}
                                    className="w-full"
                                />
                            </div>
                            <CornerBloom className="pointer-events-none absolute -right-6 -top-6 text-gold-700/50" size={90} />
                            <CornerBloom
                                className="pointer-events-none absolute -bottom-6 -left-6 text-gold-700/40"
                                size={70}
                                flip
                            />
                        </Reveal>
                    )}
                </div>
            </div>
        </section>
    );
}
