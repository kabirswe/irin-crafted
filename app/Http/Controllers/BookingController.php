<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

/**
 * Handles booking requests.
 *
 * Validation is live; delivery is stubbed (logged) so the UI is complete
 * without an outbound mail provider. Swap the Log call for a Mailable or a
 * CRM webhook when credentials are available.
 */
class BookingController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email', 'max:180'],
            'phone' => ['nullable', 'string', 'max:40'],
            'date' => ['required', 'date', 'after_or_equal:today'],
            'guests' => ['required', 'string', 'max:40'],
            'service' => ['required', 'string', 'max:80'],
            'diet' => ['nullable', 'string', 'max:80'],
            'notes' => ['nullable', 'string', 'max:2000'],
        ]);

        Log::info('Booking request received', $data);

        return back()->with('success', 'Thank you — we will reply within 24 hours.');
    }
}
