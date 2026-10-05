import Icon from '../ui/Icon';
import Img from '../ui/Img';
import { SectionEyebrow, Wing } from '../ui/decor';
import { Reveal } from '../ui/primitives';
import { AppLink } from '../../lib/router';

/**
 * Service card — reference pattern: image with a circular icon badge
 * straddling the bottom edge, centred title, body, "Learn more" link.
 */
export function ServiceCard({ service, index = 0 }) {
    return (
        <Reveal delay={(index % 3) * 0.06} className="group card flex h-full flex-col overflow-hidden pt-0 text-center">
            <div className="relative">
                <div data-img-reveal className="overflow-hidden">
                    <Img
                        src={service.image}
                        alt={service.title}
                        ratio="16 / 11"
                        fallbackLabel={service.title}
                        className="w-full"
                        imgClassName="transition-transform duration-[1.3s] group-hover:scale-[1.06]"
                    />
                </div>
                <span className="icon-badge icon-badge-straddle">
                    <Icon name={service.icon} size={20} />
                </span>
            </div>

            <div className="flex flex-1 flex-col px-7 pb-8 pt-11">
                <h3 className="display-3 text-cream-100 transition-colors duration-500 group-hover:text-gold-200">
                    {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-cream-400">{service.body}</p>
                <AppLink href={service.href} className="btn-link mt-auto justify-center pt-7">
                    Learn More
                    <Icon name="arrow-right" size={14} />
                </AppLink>
            </div>
        </Reveal>
    );
}

/** Compact overlay tile used on the home page. */
export function ServiceTile({ service, index = 0 }) {
    return (
        <Reveal delay={(index % 4) * 0.05} className="group relative h-full overflow-hidden rounded-card border border-cream-100/10">
            <Img
                src={service.image}
                alt={service.title}
                ratio="4 / 5"
                fallbackLabel={service.title}
                className="h-full w-full"
                imgClassName="transition-transform duration-[1.4s] group-hover:scale-[1.07]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/55 to-ink-950/5" />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-cream-100/5 transition-all duration-700 group-hover:ring-gold-400/40" />

            <div className="absolute inset-x-0 bottom-0 p-6">
                <span className="grid size-11 place-items-center rounded-full border border-gold-400/40 bg-ink-950/60 text-gold-300 backdrop-blur-md transition-colors duration-700 group-hover:border-gold-300 group-hover:text-gold-100">
                    <Icon name={service.icon} size={19} />
                </span>
                <h3 className="display-3 mt-4 text-cream-100">{service.title}</h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-cream-400">{service.short || service.body}</p>
                <AppLink href={service.href} className="btn-link mt-4">
                    Explore
                    <Icon name="arrow-up-right" size={13} />
                </AppLink>
            </div>
        </Reveal>
    );
}

export default function ServicesGrid({
    services,
    eyebrow = 'Our Services',
    title = 'Culinary Experiences Made For You',
    body,
    variant = 'cards',
    showHeader = true,
    cta,
    className = '',
}) {
    const layout =
        variant === 'cards'
            ? 'sm:grid-cols-2 lg:grid-cols-3'
            : 'sm:grid-cols-2 lg:grid-cols-4';

    return (
        <section className={`section relative ${className}`}>
            <div className="shell relative">
                {showHeader && (
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
                )}

                <div className={`mt-14 grid gap-6 ${layout}`}>
                    {services.map((service, i) =>
                        variant === 'cards' ? (
                            <ServiceCard key={service.title} service={service} index={i} />
                        ) : (
                            <ServiceTile key={service.title} service={service} index={i} />
                        ),
                    )}
                </div>

                {cta && (
                    <Reveal delay={0.1} className="mt-14 flex flex-col items-center gap-6">
                        <Wing className="text-gold-700/60" width={70} />
                        <AppLink href={cta.href} className="btn btn-gold">
                            {cta.label}
                        </AppLink>
                    </Reveal>
                )}
            </div>
        </section>
    );
}
