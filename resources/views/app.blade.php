<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="scroll-smooth">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="theme-color" content="#0e0d0b">

        <!-- Without JavaScript the motion layer never runs, so make sure
             nothing stays hidden. -->
        <noscript>
            <style>
                [data-split], [data-anim], [data-img-reveal], [data-promo] { opacity: 1 !important; transform: none !important; }
                [data-split] { clip-path: none !important; }
            </style>
        </noscript>

        <title inertia>{{ config('app.name', 'Irin Crafted') }}</title>
        <meta name="description" content="Private chef experiences, seasonal menus and quietly impeccable service in the comfort of your home.">

        {{-- Open Graph --}}
        <meta property="og:type" content="website">
        <meta property="og:title" content="Irin Crafted — Private Chef Experiences">
        <meta property="og:description" content="Elevated dining, crafted around you.">
        <meta property="og:image" content="{{ asset('images/hero-chef.jpg') }}">

        {{-- Fonts are self hosted (resources/css/fonts.css) — preload the two faces used above the fold --}}
        <link rel="preload" href="{{ asset('fonts/cormorant-garamond-latin-600-normal.woff2') }}" as="font" type="font/woff2" crossorigin>
        <link rel="preload" href="{{ asset('fonts/inter-latin-400-normal.woff2') }}" as="font" type="font/woff2" crossorigin>

        @if (file_exists(public_path('build/manifest.json')) || file_exists(public_path('hot')))
            @viteReactRefresh
            @vite(['resources/css/app.css', 'resources/js/app.jsx'])
        @else
            {{-- Front-end assets have not been compiled yet.
                 Run `npm install && npm run build` (or `npm run dev`) to render the UI. --}}
            <style>
                body { background:#0e0d0b; color:#b8aa96; font-family:system-ui,sans-serif;
                       display:grid; place-items:center; min-height:100vh; margin:0; text-align:center; }
                code { color:#c9a45c; }
            </style>
        @endif
        @inertiaHead
    </head>
    <body class="bg-ink-900 antialiased">
        @inertia
    </body>
</html>
