import Icon from '../ui/Icon';
import Img from '../ui/Img';
import { Wing } from '../ui/decor';
import { Reveal } from '../ui/primitives';
import { AppLink } from '../../lib/router';

/**
 * Closing call to action — reference pattern: wide framed panel with a plated
 * dish bottom-left, cutlery bottom-right, centred heading and gold button.
 */
export default function CtaBand({ cta, image, imageRight, className = '' }) {
    return (
        <section className={`relative ${className}`}>
            <div className="shell py-16 sm:py-20">
                <div className="group relative overflow-hidden rounded-card border border-gold-600/25 bg-ink-800">
                    <span className="pointer-events-none absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />
                    <span className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 glow-gold" />
                    <span className="pointer-events-none absolute -bottom-28 -right-20 h-64 w-64 glow-gold" />

                    {/* corner imagery */}
                    {image && (
                        <span className="pointer-events-none absolute -bottom-8 -left-6 hidden h-44 w-44 overflow-hidden rounded-full border border-gold-700/30 opacity-90 lg:block">
                            <Img src={image} alt="" className="h-full w-full" fallbackLabel="" />
                        </span>
                    )}
                    {imageRight && (
                        <span className="pointer-events-none absolute -bottom-10 -right-6 hidden h-40 w-40 overflow-hidden rounded-full border border-gold-700/25 opacity-70 lg:block">
                            <Img src={imageRight} alt="" className="h-full w-full" fallbackLabel="" />
                        </span>
                    )}

                    <div className="relative px-6 py-16 text-center sm:px-16 sm:py-20">
                        {cta.eyebrow && (
                            <Reveal className="flex justify-center">
                                <span className="eyebrow eyebrow--center">{cta.eyebrow}</span>
                            </Reveal>
                        )}
                        <h2 data-split className="display-2 mx-auto mt-6 max-w-2xl opacity-0 text-balance">
                            {cta.title}
                        </h2>
                        {cta.body && (
                            <Reveal delay={0.08} className="mx-auto mt-5 max-w-xl">
                                <p className="text-cream-400">{cta.body}</p>
                            </Reveal>
                        )}
                        <Reveal delay={0.12} className="mt-9 flex flex-wrap items-center justify-center gap-4">
                            <AppLink href={cta.primary.href} className="btn btn-gold">
                                {cta.primary.label}
                            </AppLink>
                            {cta.secondary && (
                                <AppLink href={cta.secondary.href} className="btn btn-ghost">
                                    {cta.secondary.label}
                                    <Icon name="arrow-up-right" size={14} />
                                </AppLink>
                            )}
                        </Reveal>
                        <Reveal delay={0.18} className="mt-10 flex justify-center">
                            <Wing className="text-gold-700/60" width={72} />
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
}
