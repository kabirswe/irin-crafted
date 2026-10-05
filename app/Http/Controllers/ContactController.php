<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ContactController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email', 'max:180'],
            'phone' => ['nullable', 'string', 'max:40'],
            'service' => ['nullable', 'string', 'max:80'],
            'message' => ['required', 'string', 'max:3000'],
        ]);

        Log::info('Contact message received', $data);

        return back()->with('success', 'Message sent — we will be in touch shortly.');
    }
}
