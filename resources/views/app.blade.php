<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="scroll-smooth">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="theme-color" content="#0e0d0b">

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

        @routes
        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.jsx'])
        @inertiaHead
    </head>
    <body class="bg-ink-900 antialiased">
        @inertia
    </body>
</html>
