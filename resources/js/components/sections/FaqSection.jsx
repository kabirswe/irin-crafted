import Img from '../ui/Img';
import Icon from '../ui/Icon';
import { Accordion, Eyebrow, Reveal } from '../ui/primitives';
import { AppLink } from '../../lib/router';

/**
 * FAQ block. `layout` = 'split' (image + accordion) or 'stacked' (full width).
 */
export default function FaqSection({ group, layout = 'stacked', className = '' }) {
    if (!group) return null;
    const { eyebrow, title, items, image } = group;

    if (layout === 'split') {
        return (
            <section className={`section relative ${className}`}>
                <div className="shell grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
                    <div className="lg:sticky lg:top-32 lg:self-start">
                        <Reveal className="flex">
                            <Eyebrow>{eyebrow}</Eyebrow>
                        </Reveal>
                        <h2 data-split className="display-2 mt-6 opacity-0">
                            {title}
                        </h2>
                        {image && (
                            <div data-img-reveal className="mt-10 hidden overflow-hidden rounded-[1.5rem] border border-gold-700/20 lg:block">
                                <Img src={image} alt={title} ratio="5 / 4" fallbackLabel={title} className="w-full" />
                            </div>
                        )}
                        <Reveal delay={0.12} className="mt-10 hidden items-center gap-4 lg:flex">
                            <AppLink href="/contact-us" className="btn btn-ghost btn-sm">
                                Still have questions?
                            </AppLink>
                        </Reveal>
                    </div>

                    <div>
                        <Accordion items={items} defaultOpen={0} />
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className={`section relative ${className}`}>
            <div className="shell">
                <div className="text-center">
                    <Reveal className="flex justify-center">
                        <Eyebrow center>{eyebrow}</Eyebrow>
                    </Reveal>
                    <h2 data-split className="display-2 mx-auto mt-6 max-w-2xl opacity-0">
                        {title}
                    </h2>
                </div>
                <div className="mx-auto mt-12 max-w-4xl">
                    <Accordion items={items} defaultOpen={0} />
                </div>
                <Reveal delay={0.1} className="mt-12 flex flex-col items-center gap-5 text-center">
                    <p className="text-cream-400">Still have questions?</p>
                    <AppLink href="/contact-us" className="btn btn-gold">
                        Contact us
                        <Icon name="arrow-right" size={15} />
                    </AppLink>
                </Reveal>
            </div>
        </section>
    );
}
