import Icon from '../ui/Icon';
import Img from '../ui/Img';
import { SectionEyebrow, Wing } from '../ui/decor';
import { Reveal } from '../ui/primitives';
import { AppLink } from '../../lib/router';

/**
 * Featured dishes.
 *  - layout="list"  → reference home pattern: big image left, name + price, copy
 *  - layout="grid"  → card grid with price chip
 */
export function DishRow({ dish, index = 0 }) {
    return (
        <Reveal
            delay={index * 0.05}
            className="group flex flex-col items-center gap-6 border-b border-cream-100/10 py-7 text-center sm:flex-row sm:items-center sm:gap-9 sm:text-left"
        >
            <div
                data-img-reveal
                className="size-40 shrink-0 overflow-hidden rounded-full border border-gold-700/25 sm:size-44"
            >
                <Img
                    src={dish.image}
                    alt={dish.name}
                    fallbackLabel={dish.name}
                    className="h-full w-full"
                    imgClassName="transition-transform duration-[1.3s] group-hover:scale-110"
                />
            </div>

            <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline justify-center gap-x-4 gap-y-2 sm:justify-start">
                    <h3 className="display-3 text-cream-100 transition-colors duration-500 group-hover:text-gold-200">
                        {dish.name}
                    </h3>
                    <span className="font-display text-2xl text-gold-300">{dish.price}</span>
                </div>
                <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-cream-400 sm:mx-0">{dish.body}</p>
            </div>

            <span className="hidden shrink-0 items-center gap-3 text-gold-700/70 lg:flex">
                <Icon name="utensils" size={20} />
            </span>
        </Reveal>
    );
}

export function DishCard({ dish, index = 0 }) {
    return (
        <Reveal delay={(index % 4) * 0.06} className="group card flex h-full flex-col overflow-hidden">
            <div className="relative">
                <div data-img-reveal className="overflow-hidden">
                    <Img
                        src={dish.image}
                        alt={dish.name}
                        ratio="4 / 3"
                        fallbackLabel={dish.name}
                        className="w-full"
                        imgClassName="transition-transform duration-[1.3s] group-hover:scale-[1.08]"
                    />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
                {dish.tag && (
                    <span className="absolute left-4 top-4 rounded border border-gold-400/40 bg-ink-950/70 px-3 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-gold-200 backdrop-blur-sm">
                        {dish.tag}
                    </span>
                )}
                <span className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gold-400 px-4 py-1.5 font-display text-base text-ink-900 shadow-lg">
                    {dish.price}
                </span>
            </div>
            <div className="flex flex-1 flex-col p-6 text-center">
                <h3 className="display-3 text-balance text-cream-100 transition-colors duration-500 group-hover:text-gold-200">
                    {dish.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-cream-400">{dish.body}</p>
                <span className="mx-auto mt-auto flex items-center gap-2 pt-6 text-[0.62rem] uppercase tracking-[0.2em] text-gold-500/80">
                    <Icon name="utensils" size={13} /> Chef’s Selection
                </span>
            </div>
        </Reveal>
    );
}

export default function FeaturedMenus({
    dishes,
    eyebrow = 'Featured Menus',
    title = 'A Taste Of What We Create',
    body,
    cta,
    layout = 'grid',
}) {
    return (
        <section className="section relative">
            <div className="shell">
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

                {layout === 'list' ? (
                    <>
                        <div className="mt-14">
                            {dishes.map((dish, i) => (
                                <DishRow key={dish.name} dish={dish} index={i} />
                            ))}
                        </div>
                        {cta && (
                            <Reveal delay={0.1} className="mt-12 flex justify-center">
                                <AppLink href={cta.href} className="btn btn-gold">
                                    {cta.label}
                                </AppLink>
                            </Reveal>
                        )}
                    </>
                ) : (
                    <>
                        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {dishes.map((dish, i) => (
                                <DishCard key={dish.name} dish={dish} index={i} />
                            ))}
                        </div>
                        {cta && (
                            <Reveal delay={0.1} className="mt-12 flex flex-col items-center gap-6">
                                <Wing className="text-gold-700/60" width={64} />
                                <AppLink href={cta.href} className="btn btn-gold">
                                    {cta.label}
                                </AppLink>
                            </Reveal>
                        )}
                    </>
                )}
            </div>
        </section>
    );
}
