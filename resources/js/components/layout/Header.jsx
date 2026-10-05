import { useEffect, useRef, useState } from 'react';
import Icon from '../ui/Icon';
import Logo from './Logo';
import { AppLink } from '../../lib/router';

function DesktopItem({ item, path }) {
    const [open, setOpen] = useState(false);
    const timer = useRef(null);
    const active = path === item.href || item.children?.some((c) => c.href === path);

    if (!item.children) {
        return (
            <AppLink
                href={item.href}
                className={`relative whitespace-nowrap py-2 text-[0.72rem] uppercase tracking-[0.22em] transition-colors duration-300 hover:text-gold-200 ${
                    active ? 'text-gold-200' : 'text-cream-200'
                }`}
            >
                {item.label}
                <span
                    className={`absolute -bottom-0.5 left-0 h-px bg-gold-500 transition-all duration-500 ${
                        active ? 'w-full' : 'w-0'
                    }`}
                />
            </AppLink>
        );
    }

    return (
        <div
            className="relative"
            onMouseEnter={() => {
                clearTimeout(timer.current);
                setOpen(true);
            }}
            onMouseLeave={() => {
                timer.current = setTimeout(() => setOpen(false), 150);
            }}
        >
            <button
                type="button"
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className={`flex items-center gap-1.5 whitespace-nowrap py-2 text-[0.72rem] uppercase tracking-[0.22em] transition-colors duration-300 hover:text-gold-200 ${
                    active ? 'text-gold-200' : 'text-cream-200'
                }`}
            >
                {item.label}
                <Icon name="chevron-down" size={14} className={`transition-transform duration-500 ${open ? 'rotate-180' : ''}`} />
                <span className={`absolute -bottom-0.5 left-0 h-px bg-gold-500 transition-all duration-500 ${active ? 'w-full' : 'w-0'}`} />
            </button>
            <div
                className={`absolute left-1/2 top-full z-50 w-60 -translate-x-1/2 pt-4 transition-all duration-400 ${
                    open ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none -translate-y-2 opacity-0'
                }`}
            >
                <div className="overflow-hidden rounded-2xl border border-gold-700/25 bg-ink-900/95 p-2 shadow-[0_30px_70px_-40px_rgba(0,0,0,0.9)] backdrop-blur-xl">
                    {item.children.map((child) => (
                        <AppLink
                            key={child.href + child.label}
                            href={child.href}
                            onClick={() => setOpen(false)}
                            className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-sm text-cream-300 transition-all duration-300 hover:bg-gold-600/10 hover:text-gold-200 ${
                                path === child.href ? 'bg-gold-600/10 text-gold-200' : ''
                            }`}
                        >
                            {child.label}
                            <Icon name="arrow-up-right" size={14} className="opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        </AppLink>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function Header({ nav, brand, path }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [openGroup, setOpenGroup] = useState(null);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [menuOpen]);

    useEffect(() => setMenuOpen(false), [path]);

    return (
        <>
            <header
                data-site-header
                className="fixed inset-x-0 top-0 z-50 transition-all duration-500 [&.is-stuck]:border-b [&.is-stuck]:border-cream-200/10 [&.is-stuck]:bg-ink-950/85 [&.is-stuck]:backdrop-blur-xl"
            >
                <div className="shell flex items-center justify-between gap-6 py-5 transition-all duration-500 [.is-stuck_&]:py-3">
                    <Logo />

                    <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
                        {nav.map((item) => (
                            <DesktopItem key={item.label} item={item} path={path} />
                        ))}
                    </nav>

                    <div className="flex items-center gap-4">
                        <a
                            href={brand.phoneHref}
                            className="hidden items-center gap-2.5 text-sm text-cream-300 transition-colors duration-300 hover:text-gold-200 xl:flex"
                        >
                            <span className="grid size-9 place-items-center rounded-full border border-gold-700/40 text-gold-400">
                                <Icon name="phone" size={15} />
                            </span>
                            {brand.phone}
                        </a>
                        <AppLink href="/book-a-chef" className="btn btn-gold btn-sm hidden sm:inline-flex">
                            Book a chef
                        </AppLink>
                        <button
                            type="button"
                            onClick={() => setMenuOpen(true)}
                            className="grid size-11 place-items-center rounded-full border border-cream-200/20 text-cream-100 transition-colors duration-300 hover:border-gold-500 hover:text-gold-200 lg:hidden"
                            aria-label="Open menu"
                        >
                            <Icon name="menu" size={20} />
                        </button>
                    </div>
                </div>
            </header>

            {/* mobile drawer */}
            <div
                className={`fixed inset-0 z-[60] lg:hidden ${menuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
                aria-hidden={!menuOpen}
            >
                <div
                    onClick={() => setMenuOpen(false)}
                    className={`absolute inset-0 bg-ink-950/80 backdrop-blur-sm transition-opacity duration-500 ${
                        menuOpen ? 'opacity-100' : 'opacity-0'
                    }`}
                />
                <div
                    className={`absolute right-0 top-0 flex h-full w-[min(22rem,88vw)] flex-col border-l border-gold-700/20 bg-ink-900 transition-transform duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        menuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                >
                    <div className="flex items-center justify-between border-b border-cream-200/10 px-6 py-5">
                        <Logo compact />
                        <button
                            type="button"
                            onClick={() => setMenuOpen(false)}
                            className="grid size-10 place-items-center rounded-full border border-cream-200/20 text-cream-200"
                            aria-label="Close menu"
                        >
                            <Icon name="close" size={18} />
                        </button>
                    </div>
                    <nav className="flex-1 overflow-y-auto px-6 py-6" aria-label="Mobile">
                        {nav.map((item) => (
                            <div key={item.label} className="border-b border-cream-200/10 py-1">
                                {item.children ? (
                                    <>
                                        <button
                                            type="button"
                                            onClick={() => setOpenGroup(openGroup === item.label ? null : item.label)}
                                            className="flex w-full items-center justify-between py-4 text-left font-display text-2xl text-cream-50"
                                        >
                                            {item.label}
                                            <Icon
                                                name="chevron-down"
                                                size={18}
                                                className={`text-gold-500 transition-transform duration-500 ${
                                                    openGroup === item.label ? 'rotate-180' : ''
                                                }`}
                                            />
                                        </button>
                                        <div
                                            className={`grid overflow-hidden transition-all duration-500 ${
                                                openGroup === item.label ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                                            }`}
                                        >
                                            <div className="min-h-0">
                                                {item.children.map((child) => (
                                                    <AppLink
                                                        key={child.href + child.label}
                                                        href={child.href}
                                                        className="block py-2.5 pl-4 text-sm uppercase tracking-[0.18em] text-cream-400 transition-colors hover:text-gold-200"
                                                    >
                                                        {child.label}
                                                    </AppLink>
                                                ))}
                                                <div className="pb-4" />
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <AppLink href={item.href} className="block py-4 font-display text-2xl text-cream-50">
                                        {item.label}
                                    </AppLink>
                                )}
                            </div>
                        ))}
                    </nav>
                    <div className="space-y-3 border-t border-cream-200/10 px-6 py-6">
                        <AppLink href="/book-a-chef" className="btn btn-gold w-full">
                            Book a chef
                        </AppLink>
                        <a href={brand.phoneHref} className="btn btn-ghost w-full">
                            <Icon name="phone" size={15} />
                            {brand.phone}
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
