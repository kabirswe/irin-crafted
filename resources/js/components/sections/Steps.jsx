import Icon from '../ui/Icon';
import { SectionEyebrow, Wing } from '../ui/decor';
import { Reveal } from '../ui/primitives';

/** "How it works" — icon, numbered title, short copy (reference pattern). */
export default function Steps({
    steps,
    eyebrow = 'How It Works',
    title = 'Simple, Personal & Seamless',
    body,
    className = '',
}) {
    return (
        <section className={`section relative overflow-hidden border-y border-cream-100/8 bg-ink-950/60 ${className}`}>
            <div className="pointer-events-none absolute left-1/2 top-16 h-[22rem] w-[38rem] -translate-x-1/2 glow-gold opacity-40" />

            <div className="shell relative">
                <div className="flex flex-col items-center gap-6 text-center">
                    {eyebrow && <SectionEyebrow>{eyebrow}</SectionEyebrow>}
                    <h2 data-split className="display-2 mx-auto max-w-2xl opacity-0">
                        {title}
                    </h2>
                    {body && (
                        <Reveal delay={0.06} className="mx-auto max-w-xl">
                            <p className="text-cream-400">{body}</p>
                        </Reveal>
                    )}
                </div>

                <div className="mt-16 grid gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
                    {steps.map((step, i) => (
                        <Reveal key={step.number} delay={i * 0.08} className="group relative px-5 text-center">
                            {i < steps.length - 1 && (
                                <span className="pointer-events-none absolute left-[calc(50%+2.75rem)] top-6 hidden h-px w-[calc(100%-5rem)] bg-gradient-to-r from-gold-700/60 to-transparent lg:block" />
                            )}

                            <span className="relative mx-auto grid size-12 place-items-center rounded-full border border-gold-400/35 text-gold-300 transition-all duration-700 group-hover:-translate-y-1 group-hover:border-gold-300 group-hover:text-gold-100">
                                <Icon name={step.icon} size={20} />
                            </span>

                            <h3 className="display-3 mt-6 text-cream-100">
                                <span className="text-gold-400/80">{step.number}.</span> {step.title}
                            </h3>
                            <p className="mx-auto mt-2.5 max-w-[15rem] text-sm leading-relaxed text-cream-400">{step.body}</p>
                        </Reveal>
                    ))}
                </div>

                <Reveal delay={0.15} className="mt-14 flex justify-center">
                    <Wing className="text-gold-700/50" width={64} />
                </Reveal>
            </div>
        </section>
    );
}
