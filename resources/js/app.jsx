import '../css/app.css';
import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';

/**
 * Laravel + Inertia entry point.
 *
 * Pages live in resources/js/pages and are resolved by component name, e.g.
 * Inertia::render('Home') → resources/js/pages/Home.jsx
 */
const pages = import.meta.glob('./pages/**/*.jsx', { eager: true });

createInertiaApp({
    title: (title) =>
        title ? `${title} — Irin Crafted` : 'Irin Crafted — Private Chef Experiences',

    resolve: (name) => {
        const key = `./pages/${name}.jsx`;
        if (!pages[key]) {
            throw new Error(`Inertia page not found: ${name} (${key})`);
        }
        return pages[key];
    },

    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },

    progress: {
        color: '#c9a45c',
        showSpinner: false,
    },
});
