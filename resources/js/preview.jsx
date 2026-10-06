/**
 * Standalone preview entry (no PHP runtime required).
 *
 * Renders the very same Inertia page components that Laravel serves, driven by
 * the static content model in resources/js/data/content.js. It is used by
 * `npm run preview` so the UI can be reviewed without the backend running.
 */
import '../css/app.css';
import { createRoot } from 'react-dom/client';
import { createElement } from 'react';
import { PreviewApp } from './preview/PreviewApp';

const el = document.getElementById('app');
createRoot(el).render(createElement(PreviewApp));
