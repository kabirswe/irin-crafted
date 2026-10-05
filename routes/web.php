<?php

use App\Http\Controllers\BookingController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\PageController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web routes
|--------------------------------------------------------------------------
| Every page is rendered by Inertia + React. Form submissions accept an
| optional POST so the UI can be wired to a mailer or CRM later; without a
| submission the pages simply render.
*/

Route::get('/', [PageController::class, 'home'])->name('home');
Route::get('/about-us', [PageController::class, 'about'])->name('about');
Route::get('/services', [PageController::class, 'services'])->name('services');
Route::get('/menu-experience', [PageController::class, 'menu'])->name('menu');
Route::get('/gallery', [PageController::class, 'gallery'])->name('gallery');
Route::get('/faq', [PageController::class, 'faq'])->name('faq');
Route::get('/blog', [PageController::class, 'blog'])->name('blog');
Route::get('/book-a-chef', [PageController::class, 'booking'])->name('booking');
Route::get('/contact-us', [PageController::class, 'contact'])->name('contact');

/*
| Service detail pages — each one is a customised landing page composed from
| the shared service blocks (see resources/js/pages/ServicePage.jsx).
*/
$serviceSlugs = [
    'private-dining',
    'weekly-meal-prep',
    'special-events',
    'corporate-dining',
    'dietary-plans',
    'wine-pairing',
];

Route::get('/{service}', [PageController::class, 'service'])
    ->whereIn('service', $serviceSlugs)
    ->name('service');

/* Form endpoints (UI only for now — swap the mailer in when ready). */
Route::post('/book-a-chef', [BookingController::class, 'store'])->name('booking.store');
Route::post('/contact-us', [ContactController::class, 'store'])->name('contact.store');

Route::fallback([PageController::class, 'notFound'])->name('fallback');
