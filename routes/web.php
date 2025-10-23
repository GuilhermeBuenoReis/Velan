<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('appointment', function() {
        return Inertia::render('appointment');
    })->name('appointment');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
