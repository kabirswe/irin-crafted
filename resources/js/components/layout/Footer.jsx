import Icon from '../ui/Icon';
import { Ornament, Reveal } from '../ui/primitives';
import { BrandMark } from './Logo';
import { AppLink } from '../../lib/router';

export default function Footer({ content }) {
    const { footer, brand } = content;
    const year = new Date().getFullYear();

    return (
        <footer className="relative overflow-hidden border-t border-cream-200/10 bg-ink-950">
            <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[42rem] -translate-x-1/2 glow-gold opacity-60" />

            {/* contact strip */}
            <div className="shell relative border-b border-cream-200/10 py-12">
                <div className="grid gap-8 md:grid-cols-3">
                    {[
                        { icon: 'mail', label: 'Email', lines: [brand.email, 'support@irincrafted.com'], href: `mailto:${brand.email}` },
                        { icon: 'pin', label: 'Location', lines: brand.address, href: '#' },
                        { icon: 'clock', label: 'Business hours', lines: brand.hours, href: brand.phoneHref },
                    ].map((item, i) => (
                        <Reveal key={item.label} delay={i * 0.05} className="flex items-start gap-4">
                            <span className="grid size-12 shrink-0 place-items-center rounded-2xl border border-gold-700/35 text-gold-400">
                                <Icon name={item.icon} size={19} />
                            </span>
                            <div>
                                <p className="text-[0.68rem] uppercase tracking-[0.24em] text-gold-500">{item.label}</p>
                                {item.lines.map((line) => (
                                    <a
                                        key={line}
                                        href={item.href}
                                        className="mt-1 block text-sm text-cream-300 transition-colors duration-300 hover:text-gold-200"
                                    >
                                        {line}
                                    </a>
                                ))}
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>

            {/* main footer */}
            <div className="shell relative grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
                <Reveal>
                    <AppLink href="/" className="inline-flex items-center gap-3 text-cream-50">
                        <span className="text-gold-500">
                            <BrandMark size={38} />
                        </span>
                        <span className="font-display text-2xl tracking-[0.2em]">IRIN CRAFTED</span>
                    </AppLink>
                    <p className="mt-6 max-w-sm text-sm leading-relaxed text-cream-500">{footer.blurb}</p>
                    <div className="mt-7 flex items-center gap-3">
                        {brand.socials.map((s) => (
                            <a
                                key={s.label}
                                href={s.href}
                                aria-label={s.label}
                                className="grid size-10 place-items-center rounded-full border border-cream-200/15 text-cream-300 transition-all duration-500 hover:-translate-y-1 hover:border-gold-500 hover:text-gold-200"
                            >
                                <Icon name={s.icon} size={17} />
                            </a>
                        ))}
                    </div>
                </Reveal>

                {footer.columns.map((col, i) => (
                    <Reveal key={col.title} delay={0.05 * (i + 1)}>
                        <h3 className="font-display text-lg tracking-[0.06em] text-cream-50">{col.title}</h3>
                        <span className="mt-4 block h-px w-10 bg-gold-700/60" />
                        <ul className="mt-5 space-y-3">
                            {col.links.map((link) => (
                                <li key={link.label}>
                                    <AppLink
                                        href={link.href}
                                        className="group inline-flex items-center gap-2 text-sm text-cream-500 transition-colors duration-300 hover:text-gold-200"
                                    >
                                        <span className="h-px w-0 bg-gold-500 transition-all duration-500 group-hover:w-4" />
                                        {link.label}
                                    </AppLink>
                                </li>
                            ))}
                        </ul>
                    </Reveal>
                ))}
            </div>

            <div className="shell relative pb-10">
                <Ornament className="mb-8 w-full" width={220} />
                <div className="flex flex-col items-center justify-between gap-4 text-center text-xs text-cream-600 sm:flex-row sm:text-left">
                    <p>
                        © {year} {brand.name}. Private chef experiences, crafted with care.
                    </p>
                    <div className="flex items-center gap-6">
                        {footer.legal.map((l) => (
                            <AppLink key={l.label} href={l.href} className="transition-colors hover:text-gold-200">
                                {l.label}
                            </AppLink>
                        ))}
                        <button
                            type="button"
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="inline-flex items-center gap-2 uppercase tracking-[0.2em] transition-colors hover:text-gold-200"
                        >
                            Top
                            <Icon name="arrow-up-right" size={13} />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
