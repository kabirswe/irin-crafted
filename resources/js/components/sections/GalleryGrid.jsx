import { useMemo, useState } from 'react';
import Icon from '../ui/Icon';
import Img from '../ui/Img';
import { SectionEyebrow } from '../ui/decor';
import { Reveal } from '../ui/primitives';

const SPAN = {
    tall: 'sm:row-span-2',
    wide: 'sm:col-span-2',
    normal: '',
};

export default function GalleryGrid({ items, categories, eyebrow, title, body, limit }) {
    const [filter, setFilter] = useState('All');
    const [lightbox, setLightbox] = useState(null);

    const filtered = useMemo(() => {
        const list = filter === 'All' ? items : items.filter((i) => i.category === filter);
        return limit ? list.slice(0, limit) : list;
    }, [filter, items, limit]);

    return (
        <section className="section relative">
            <div className="shell">
                <div className="flex flex-col items-center gap-6 text-center">
                    <SectionEyebrow>{eyebrow}</SectionEyebrow>
                    <h2 data-split className="display-2 mx-auto max-w-3xl opacity-0 text-balance">{title}</h2>
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
                                className={`rounded-full border px-5 py-2.5 text-[0.68rem] uppercase tracking-[0.2em] transition-all duration-500 ${
                                    filter === cat
                                        ? 'border-gold-500 bg-gold-500/15 text-gold-100'
                                        : 'border-cream-200/15 text-cream-400 hover:border-gold-600/60 hover:text-gold-200'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </Reveal>
                )}

                <div className="mt-12 grid auto-rows-[13rem] grid-cols-1 gap-5 sm:grid-cols-3 lg:grid-cols-4">
                    {filtered.map((item, i) => (
                        <Reveal
                            key={item.src + i}
                            delay={(i % 4) * 0.05}
                            className={`group relative overflow-hidden rounded-[1.25rem] border border-cream-200/10 ${
                                SPAN[item.span] || ''
                            }`}
                        >
                            <button
                                type="button"
                                onClick={() => setLightbox(item)}
                                className="h-full w-full text-left"
                                aria-label={`View ${item.title}`}
                            >
                                <Img
                                    src={item.src}
                                    alt={item.title}
                                    className="h-full w-full"
                                    imgClassName="transition-transform duration-[1.4s] group-hover:scale-[1.09]"
                                />
                                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />
                                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                                    <span>
                                        <span className="block text-[0.6rem] uppercase tracking-[0.24em] text-gold-400">
                                            {item.category}
                                        </span>
                                        <span className="mt-1 block font-display text-xl text-cream-50">{item.title}</span>
                                    </span>
                                    <span className="grid size-9 shrink-0 translate-y-2 place-items-center rounded-full border border-gold-500/40 bg-ink-950/60 text-gold-200 opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
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
                    className="fixed inset-0 z-[80] flex items-center justify-center bg-ink-950/92 p-5 backdrop-blur-md"
                    onClick={() => setLightbox(null)}
                    role="dialog"
                    aria-modal="true"
                >
                    <div className="relative max-h-[86vh] w-full max-w-4xl overflow-hidden rounded-[1.5rem] border border-gold-700/30">
                        <Img src={lightbox.src} alt={lightbox.title} className="max-h-[86vh] w-full" />
                        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-ink-950 to-transparent p-6">
                            <span>
                                <span className="block text-[0.6rem] uppercase tracking-[0.24em] text-gold-400">{lightbox.category}</span>
                                <span className="mt-1 block font-display text-2xl text-cream-50">{lightbox.title}</span>
                            </span>
                            <button
                                type="button"
                                onClick={() => setLightbox(null)}
                                className="grid size-10 place-items-center rounded-full border border-cream-200/25 text-cream-100 transition-colors hover:border-gold-500 hover:text-gold-200"
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
