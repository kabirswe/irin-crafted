import { useMemo } from 'react';
import { content as staticContent } from '../data/content';

/**
 * Reads the Inertia page props straight from the `#app[data-page]` payload.
 *
 * Doing it this way (instead of usePage) keeps the very same components
 * renderable inside the standalone preview build, where no Inertia context
 * exists — and it avoids any provider ordering concerns.
 */
function readInertiaProps() {
    if (typeof document === 'undefined') return {};
    const el = document.getElementById('app');
    const raw = el?.dataset?.page;
    if (!raw) return {};
    try {
        return JSON.parse(raw)?.props ?? {};
    } catch {
        return {};
    }
}

/**
 * Site content: Laravel provided props win, static content model fills the gaps.
 */
export function useSiteContent(base = staticContent) {
    const props = readInertiaProps();

    return useMemo(() => {
        const brand = props.brand
            ? {
                  ...base.brand,
                  ...props.brand,
                  phoneHref: props.brand.phone_href ?? base.brand.phoneHref,
                  socials: base.brand.socials,
              }
            : base.brand;

        const footer = props.footer
            ? { ...base.footer, ...props.footer }
            : base.footer;

        return {
            ...base,
            brand,
            nav: props.nav ?? base.nav,
            footer,
            pageMeta: { ...base.pageMeta, ...(props.pageMeta ?? {}) },
            flash: props.flash ?? null,
        };
    }, [props, base]);
}

export default useSiteContent;
