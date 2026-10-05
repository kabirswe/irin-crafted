<?php

namespace App\Support;

/**
 * Page level metadata for the React pages.
 *
 * The richer copy (services, dishes, testimonials…) lives in
 * resources/js/data/content.js which acts as the content model for the UI.
 * Anything added here is exposed to the front end as a shared Inertia prop.
 */
class SiteContent
{
    /**
     * @return array<string, array{title: string, eyebrow: string, body: string}>
     */
    public function pageMeta(?string $path = null): array
    {
        $meta = config('site.page_meta', []);

        return $path ? ($meta[$path] ?? []) : $meta;
    }

    public function all(): array
    {
        return [
            'brand' => config('site.brand'),
            'nav' => config('site.nav'),
            'footer' => config('site.footer'),
            'tests' => null,
        ];
    }
}
