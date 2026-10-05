<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root Blade template.
     */
    protected $rootView = 'app';

    /**
     * Version the assets so Inertia can bust the cache on deploy.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Props shared by every page.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'brand' => config('site.brand'),
            'nav' => config('site.nav'),
            'footer' => config('site.footer'),
            'pageMeta' => config('site.page_meta'),
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
            ],
        ]);
    }
}
