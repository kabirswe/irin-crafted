<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Renders every page through Inertia + React.
 *
 * Content is intentionally assembled here (not hard coded in the components)
 * so it can later be moved into a CMS or database without touching the UI.
 */
class PageController extends Controller
{
    /** Shared content payload — mirrors resources/js/data/content.js. */
    protected function content(): \App\Support\SiteContent
    {
        return new \App\Support\SiteContent;
    }

    public function home(): Response
    {
        return Inertia::render('Home');
    }

    public function about(): Response
    {
        return Inertia::render('AboutUs', [
            'meta' => $this->content()->pageMeta('/about-us'),
        ]);
    }

    public function services(): Response
    {
        return Inertia::render('Services', [
            'meta' => $this->content()->pageMeta('/services'),
        ]);
    }

    public function service(string $slug): Response
    {
        return Inertia::render('ServicePage', [
            'path' => '/'.$slug,
            'meta' => $this->content()->pageMeta('/'.$slug),
        ]);
    }

    public function menu(): Response
    {
        return Inertia::render('MenuExperience', [
            'meta' => $this->content()->pageMeta('/menu-experience'),
        ]);
    }

    public function gallery(): Response
    {
        return Inertia::render('Gallery', [
            'meta' => $this->content()->pageMeta('/gallery'),
        ]);
    }

    public function faq(): Response
    {
        return Inertia::render('Faq', [
            'meta' => $this->content()->pageMeta('/faq'),
        ]);
    }

    public function blog(): Response
    {
        return Inertia::render('Blog', [
            'meta' => $this->content()->pageMeta('/blog'),
        ]);
    }

    public function booking(): Response
    {
        return Inertia::render('BookAChef', [
            'meta' => $this->content()->pageMeta('/book-a-chef'),
        ]);
    }

    public function contact(): Response
    {
        return Inertia::render('ContactUs', [
            'meta' => $this->content()->pageMeta('/contact-us'),
        ]);
    }

    public function notFound(Request $request): Response
    {
        return Inertia::render('NotFound')
            ->toResponse($request)
            ->setStatusCode(404);
    }
}
