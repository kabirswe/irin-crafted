import { Marquee } from '../ui/primitives';

export default function MarqueeStrip({
    items = [],
    label = 'Trusted by clients in',
    duration = 42,
    className = '',
}) {
    return (
        <section className={`relative border-y border-cream-200/10 bg-ink-950/60 py-7 ${className}`}>
            <div className="shell flex flex-col items-center gap-5 lg:flex-row lg:gap-10">
                <p className="shrink-0 text-[0.62rem] uppercase tracking-[0.34em] text-gold-600">{label}</p>
                <Marquee
                    items={items}
                    duration={duration}
                    className="w-full"
                    renderItem={(item) => (
                        <span className="font-display text-xl tracking-[0.16em] text-cream-400/90 transition-colors duration-500 hover:text-gold-200 sm:text-2xl">
                            {item}
                        </span>
                    )}
                />
            </div>
        </section>
    );
}
