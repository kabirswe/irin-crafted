import { useMemo, useState } from 'react';
import Icon from '../ui/Icon';
import Img from '../ui/Img';
import { SectionEyebrow } from '../ui/decor';
import { Reveal } from '../ui/primitives';

const RATIOS = ['4 / 5', '4 / 3', '1 / 1', '4 / 5.6', '3 / 2', '4 / 5'];

/** Filterable masonry gallery with a lightbox. */
export default function GalleryGrid({ items, categories, eyebrow, title, body }) {
    const [filter, setFilter] = useState('All');
    const [lightbox, setLightbox] = useState(null);

    const filtered = useMemo(
        () => (filter === 'All' ? items : items.filter((i) => i.category === filter)),
        [filter, items],
    );

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

                {categories && (
                    <Reveal delay={0.08} className="mt-11 flex flex-wrap items-center justify-center gap-3">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                type="button"
                                onClick={() => setFilter(cat)}
                                aria-pressed={filter === cat}
                                className={`rounded-full border px-5 py-2.5 text-[0.68rem] font-medium uppercase tracking-[0.2em] transition-all duration-500 ${
                                    filter === cat
                                        ? 'border-gold-400/70 bg-gold-400/12 text-gold-100'
                                        : 'border-cream-100/15 text-cream-400 hover:border-gold-500/60 hover:text-gold-200'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </Reveal>
                )}

                {/* masonry: CSS columns avoid the gaps a row-span grid produces */}
                <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3">
                    {filtered.map((item, i) => (
                        <Reveal
                            key={item.src + i}
                            delay={(i % 3) * 0.05}
                            className="group mb-5 break-inside-avoid"
                        >
                            <button
                                type="button"
                                onClick={() => setLightbox(item)}
                                className="relative block w-full overflow-hidden rounded-card border border-cream-100/10 text-left transition-colors duration-500 hover:border-gold-500/45"
                                aria-label={`View ${item.title}`}
                            >
                                <Img
                                    src={item.src}
                                    alt={item.title}
                                    ratio={item.ratio || RATIOS[i % RATIOS.length]}
                                    fallbackLabel={item.title}
                                    className="w-full"
                                    imgClassName="transition-transform duration-[1.4s] group-hover:scale-[1.07]"
                                />
                                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/92 via-ink-950/15 to-transparent" />
                                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                                    <span>
                                        <span className="block text-[0.58rem] uppercase tracking-[0.24em] text-gold-400">
                                            {item.category}
                                        </span>
                                        <span className="mt-1 block font-display text-xl text-cream-100">{item.title}</span>
                                    </span>
                                    <span className="grid size-9 shrink-0 translate-y-2 place-items-center rounded-full border border-gold-400/45 bg-ink-950/60 text-gold-200 opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                                        <Icon name="plus" size={15} />
                                    </span>
                                </span>
                            </button>
                        </Reveal>
                    ))}
                </div>
            </div>

            {/* lightbox */}
            {lightbox && (
                <div
                    className="fixed inset-0 z-[80] flex items-center justify-center bg-ink-950/93 p-5 backdrop-blur-md"
                    onClick={() => setLightbox(null)}
                    role="dialog"
                    aria-modal="true"
                    aria-label={lightbox.title}
                >
                    <div className="relative max-h-[86vh] w-full max-w-4xl overflow-hidden rounded-card border border-gold-600/30">
                        <Img src={lightbox.src} alt={lightbox.title} className="max-h-[78vh] w-full" imgClassName="object-contain" />
                        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 bg-gradient-to-t from-ink-950 to-transparent p-6">
                            <span>
                                <span className="block text-[0.58rem] uppercase tracking-[0.24em] text-gold-400">
                                    {lightbox.category}
                                </span>
                                <span className="mt-1 block font-display text-2xl text-cream-100">{lightbox.title}</span>
                            </span>
                            <button
                                type="button"
                                onClick={() => setLightbox(null)}
                                className="grid size-10 place-items-center rounded-full border border-cream-100/25 text-cream-100 transition-colors hover:border-gold-400 hover:text-gold-200"
                                aria-label="Close"
                            >
                                <Icon name="close" size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
