/**
 * Tiny router used by the standalone (no-PHP) preview build.
 *
 * Laravel + Inertia owns real routing in production; this shim renders the same
 * page components against the static content model so the UI can be reviewed
 * anywhere. Both expose the same <Link> API, so page code never changes.
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const RouterContext = createContext({ path: '/', navigate: () => {} });

export function RouterProvider({ children, initialPath }) {
    const [path, setPath] = useState(() => {
        if (initialPath) return initialPath;
        const p = window.location.pathname.replace(/\/index\.html$/, '/') || '/';
        return p;
    });

    const navigate = useCallback((href, { replace = false } = {}) => {
        if (!href || href === '#') return;
        setPath(href);
        window.history[replace ? 'replaceState' : 'pushState']({}, '', href);
        window.scrollTo({ top: 0, behavior: 'auto' });
    }, []);

    useEffect(() => {
        const onPop = () => setPath(window.location.pathname || '/');
        window.addEventListener('popstate', onPop);
        return () => window.removeEventListener('popstate', onPop);
    }, []);

    const value = useMemo(() => ({ path, navigate }), [path, navigate]);
    return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export const useRouter = () => useContext(RouterContext);

/** Drop-in replacement for Inertia's <Link>. */
export function AppLink({ href = '/', children, className, onClick, ...rest }) {
    const { navigate } = useRouter();
    const external = /^(https?:|mailto:|tel:|#)/.test(href);
    return (
        <a
            href={href}
            className={className}
            onClick={(e) => {
                onClick?.(e);
                if (external || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey) return;
                e.preventDefault();
                navigate(href);
            }}
            {...rest}
        >
            {children}
        </a>
    );
}

export function currentPath() {
    return window.location.pathname.replace(/\/+$/, '') || '/';
}
