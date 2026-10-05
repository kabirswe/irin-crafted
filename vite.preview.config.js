/**
 * Standalone preview config.
 *
 * Laravel owns the real routing (see vite.config.js). This config builds and
 * serves the very same React pages as a static single page app so the UI can be
 * reviewed without the PHP runtime.
 */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    appType: 'spa',
    plugins: [react(), tailwindcss()],
    build: {
        outDir: 'dist-preview',
        emptyOutDir: true,
    },
    server: {
        host: '0.0.0.0',
        allowedHosts: true,
        // Set VITE_HMR_CLIENT_PORT=443 when serving through an HTTPS tunnel
        hmr: process.env.VITE_HMR_CLIENT_PORT
            ? { clientPort: Number(process.env.VITE_HMR_CLIENT_PORT) }
            : undefined,
    },
    preview: {
        host: '0.0.0.0',
        allowedHosts: true,
        port: 4173,
    },
});
