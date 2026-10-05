import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    react: ['react', 'react-dom', '@inertiajs/react'],
                    motion: ['gsap'],
                },
            },
        },
    },
    server: {
        host: '0.0.0.0',
        allowedHosts: true,
        // Set VITE_HMR_CLIENT_PORT=443 when serving through an HTTPS tunnel
        hmr: process.env.VITE_HMR_CLIENT_PORT
            ? { clientPort: Number(process.env.VITE_HMR_CLIENT_PORT) }
            : undefined,
    },
});
