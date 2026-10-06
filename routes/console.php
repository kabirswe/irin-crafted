<?php

use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment('Great cooking is about precision and generosity in equal measure.');
})->purpose('Display an inspiring quote');
