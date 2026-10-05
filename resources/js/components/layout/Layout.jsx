import { useEffect, useRef } from 'react';
import Header from './Header';
import Footer from './Footer';
import { createPageAnimations, createSmoothScroll } from '../../lib/anim';
import { useSiteContent } from '../../lib/siteContent';

/** Thin gold reading-progress bar. */
function ScrollProgress() {
    const bar = useRef(null);

    useEffect(() => {
        const el = bar.current;
        if (!el) return;
        const onScroll = () => {
            const h = document.documentElement.scrollHeight - window.innerHeight;
            const p = h > 0 ? Math.min(1, window.scrollY / h) : 0;
            el.style.transform = `scaleX(${p})`;
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, []);

    return (
        <div className="fixed inset-x-0 top-0 z-[70] h-[2px] bg-transparent">
            <span
                ref={bar}
                className="block h-full origin-left scale-x-0 bg-gradient-to-r from-gold-700 via-gold-400 to-gold-200"
            />
        </div>
    );
}

export default function Layout({ children, content, path }) {
    const scope = useRef(null);
    const site = useSiteContent(content);

    // smooth scrolling (Lenis) — skipped for reduced motion users
    useEffect(() => {
        const lenis = createSmoothScroll();
        return () => lenis?.destroy();
    }, []);

    // per page scroll animations
    useEffect(() => {
        const cleanup = createPageAnimations(scope.current);
        return () => cleanup();
    }, [path]);

    return (
        <div ref={scope} className="relative min-h-screen bg-ink-900">
            <a
                href="#main"
                className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-gold-500 focus:px-5 focus:py-2 focus:text-ink-950"
            >
                Skip to content
            </a>
            <ScrollProgress />
            <Header nav={site.nav} brand={site.brand} path={path} />
            <main id="main" className="relative">
                {children}
            </main>
            <Footer content={site} />
        </div>
    );
}
