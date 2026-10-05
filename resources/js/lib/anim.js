/**
 * Motion layer — GSAP driven, framework agnostic.
 *
 * Everything is scoped through gsap.context() so a page can register its
 * animations on mount and revert them cleanly on unmount.
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

export { gsap, ScrollTrigger, SplitText };

export const prefersReducedMotion = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Global gsap defaults tuned for a slow, expensive feel. */
gsap.defaults({ duration: 1.1, ease: 'power3.out' });
ScrollTrigger.config({ ignoreMobileResize: true });

/* ------------------------------------------------------------------ *
 * Smooth scrolling (Lenis) wired into the GSAP ticker
 * ------------------------------------------------------------------ */
export function createSmoothScroll() {
    if (prefersReducedMotion()) return null;
    let lenis = null;

    // Lenis is loaded lazily so the bundle stays lean on first paint.
    import('lenis').then(({ default: Lenis }) => {
        lenis = new Lenis({
            duration: 1.05,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 1.6,
        });
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => lenis.raf(time * 1000));
        gsap.ticker.lagSmoothing(0);
    });

    return {
        scrollTo: (target, opts = {}) => lenis?.scrollTo(target, { offset: -90, ...opts }),
        destroy: () => lenis?.destroy(),
    };
}

/* ------------------------------------------------------------------ *
 * Per page animation registry
 * ------------------------------------------------------------------ */
export function createPageAnimations(scope) {
    if (!scope) return () => {};

    const ctx = gsap.context(() => {
        const reduced = prefersReducedMotion();

        /* --- generic reveals ------------------------------------- */
        const reveals = gsap.utils.toArray('[data-anim]', scope);
        const byParent = new Map();
        reveals.forEach((el) => {
            const key = el.dataset.staggerGroup || el.parentElement;
            if (!byParent.has(key)) byParent.set(key, []);
            byParent.get(key).push(el);
        });

        byParent.forEach((els) => {
            const from = { opacity: 0, y: 44, filter: 'blur(6px)' };
            els.forEach((el) => {
                const kind = el.dataset.anim || 'up';
                if (kind === 'fade') Object.assign(from, { y: 0 });
                if (kind === 'left') Object.assign(from, { y: 0, x: -60 });
                if (kind === 'right') Object.assign(from, { y: 0, x: 60 });
                if (kind === 'zoom') Object.assign(from, { y: 0, scale: 0.92 });
            });

            const delay = parseFloat(els[0]?.dataset.delay || 0);
            if (reduced) {
                gsap.set(els, { opacity: 1, clearProps: 'transform,filter' });
                return;
            }

            ScrollTrigger.batch(els, {
                start: 'top 88%',
                once: true,
                onEnter: (batch) =>
                    gsap.fromTo(
                        batch,
                        { ...from, opacity: 0 },
                        {
                            opacity: 1,
                            y: 0,
                            x: 0,
                            scale: 1,
                            filter: 'blur(0px)',
                            duration: 1.25,
                            delay,
                            stagger: 0.11,
                            ease: 'power3.out',
                            overwrite: true,
                            clearProps: 'filter,willChange',
                        },
                    ),
            });
        });

        /* --- split headings -------------------------------------- */
        gsap.utils.toArray('[data-split]', scope).forEach((el) => {
            const split = new SplitText(el, {
                type: 'lines',
                linesClass: 'split-line',
                mask: 'lines',
            });
            if (reduced) {
                split.revert();
                return;
            }
            gsap.set(el, { opacity: 1 });
            gsap.from(split.lines, {
                yPercent: 118,
                opacity: 0,
                duration: 1.35,
                stagger: 0.11,
                ease: 'power4.out',
                scrollTrigger: { trigger: el, start: 'top 88%', once: true },
            });
        });

        /* --- word-by-word for lede copy -------------------------- */
        gsap.utils.toArray('[data-words]', scope).forEach((el) => {
            if (reduced) return;
            const split = new SplitText(el, { type: 'words' });
            gsap.from(split.words, {
                opacity: 0.12,
                duration: 0.9,
                stagger: 0.018,
                ease: 'power2.out',
                scrollTrigger: { trigger: el, start: 'top 88%', once: true },
            });
        });

        /* --- counters -------------------------------------------- */
        gsap.utils.toArray('[data-count]', scope).forEach((el) => {
            const to = parseFloat(el.dataset.count || '0');
            const suffix = el.dataset.suffix || '';
            const obj = { v: 0 };
            ScrollTrigger.create({
                trigger: el,
                start: 'top 90%',
                once: true,
                onEnter: () =>
                    gsap.to(obj, {
                        v: to,
                        duration: reduced ? 0 : 2,
                        ease: 'power2.out',
                        onUpdate: () => {
                            el.textContent = `${Math.round(obj.v)}${suffix}`;
                        },
                    }),
            });
            el.textContent = `0${suffix}`;
        });

        /* --- parallax -------------------------------------------- */
        if (!reduced) {
            gsap.utils.toArray('[data-parallax]', scope).forEach((el) => {
                const speed = parseFloat(el.dataset.parallax || '0.18');
                gsap.fromTo(
                    el,
                    { yPercent: -speed * 42 },
                    {
                        yPercent: speed * 42,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: el.closest('[data-parallax-scope]') || el,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: true,
                        },
                    },
                );
            });
        }

        /* --- image reveal (clip + scale) ------------------------- */
        gsap.utils.toArray('[data-img-reveal]', scope).forEach((el) => {
            if (reduced) return;
            const img = el.querySelector('img') || el;
            gsap.fromTo(
                el,
                { clipPath: 'inset(0% 0% 100% 0%)' },
                {
                    clipPath: 'inset(0% 0% 0% 0%)',
                    duration: 1.4,
                    ease: 'power4.inOut',
                    scrollTrigger: { trigger: el, start: 'top 90%', once: true },
                },
            );
            gsap.fromTo(
                img,
                { scale: 1.28 },
                {
                    scale: 1,
                    duration: 1.8,
                    ease: 'power4.out',
                    scrollTrigger: { trigger: el, start: 'top 90%', once: true },
                },
            );
        });

        /* --- gold rule draw -------------------------------------- */
        if (!reduced) {
            gsap.utils.toArray('[data-rule]', scope).forEach((el) => {
                gsap.fromTo(
                    el,
                    { scaleX: 0, transformOrigin: 'left center' },
                    {
                        scaleX: 1,
                        duration: 1.2,
                        ease: 'power3.inOut',
                        scrollTrigger: { trigger: el, start: 'top 92%', once: true },
                    },
                );
            });
        }

        /* --- hero timeline --------------------------------------- */
        const heroTl = scope.querySelector('[data-hero]');
        if (heroTl && !reduced) {
            const eyebrow = heroTl.querySelector('[data-hero-eyebrow]');
            const lines = heroTl.querySelectorAll('[data-hero-line]');
            const copy = heroTl.querySelector('[data-hero-copy]');
            const actions = heroTl.querySelectorAll('[data-hero-action]');
            const visual = heroTl.querySelector('[data-hero-visual]');
            const badge = heroTl.querySelectorAll('[data-hero-badge]');

            const tl = gsap.timeline({ delay: 0.18, defaults: { ease: 'power3.out' } });
            if (eyebrow) tl.from(eyebrow, { y: 24, opacity: 0, duration: 0.9 });
            if (lines.length) {
                tl.from(
                    lines,
                    { yPercent: 115, opacity: 0, duration: 1.35, stagger: 0.12, ease: 'power4.out' },
                    '-=0.45',
                );
            }
            if (copy) tl.from(copy, { y: 26, opacity: 0, duration: 1 }, '-=0.75');
            if (actions.length) tl.from(actions, { y: 22, opacity: 0, duration: 0.9, stagger: 0.1 }, '-=0.7');
            if (badge.length) tl.from(badge, { y: 18, opacity: 0, duration: 0.8, stagger: 0.08 }, '-=0.6');
            if (visual) {
                tl.fromTo(
                    visual,
                    { clipPath: 'inset(14% 14% 14% 14%)', scale: 1.06 },
                    { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, duration: 1.9, ease: 'power4.inOut' },
                    0.1,
                );
            }
        }

        /* --- header state on scroll ------------------------------ */
        const header = scope.querySelector('[data-site-header]');
        if (header) {
            ScrollTrigger.create({
                start: 'top -80',
                end: 'max',
                onToggle: (self) => header.classList.toggle('is-stuck', self.isActive),
            });
        }
    }, scope);

    return () => ctx.revert();
}

/** Small helper for accordions (height + opacity, GSAP). */
export function animateAccordion(panel, open) {
    if (!panel) return;
    if (prefersReducedMotion()) {
        panel.style.height = open ? 'auto' : '0px';
        panel.style.opacity = open ? '1' : '0';
        return;
    }
    gsap.killTweensOf(panel);
    gsap.to(panel, {
        height: open ? 'auto' : 0,
        opacity: open ? 1 : 0,
        duration: 0.6,
        ease: 'power3.inOut',
    });
}

/** Page enter animation used by every page shell. */
export function pageEnter(el) {
    if (!el || prefersReducedMotion()) return;
    gsap.fromTo(
        el,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out', clearProps: 'transform' },
    );
}
