<?php

use App\Http\Controllers\AppointmentController;
use App\Http\Resources\AppointmentResource;
use App\Http\Services\AppointmentService;
use Carbon\CarbonImmutable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('appointment', function (Request $request, AppointmentService $appointmentService) {
        $view = $request->input('view', 'month');
        $currentView = in_array($view, ['day', 'week', 'month', 'year'], true)
            ? $view
            : 'month';

        $requestedDate = $request->input('date');

        try {
            $date = $requestedDate
                ? CarbonImmutable::parse($requestedDate, config('app.timezone'))
                : CarbonImmutable::now();
        } catch (\Throwable $exception) {
            $date = CarbonImmutable::now();
        }

        $filters = [
            'user_id' => $request->user()->id,
            'view' => $currentView,
            'year' => $date->year,
        ];

        if ($currentView === 'month') {
            $filters['month'] = $date->month;
        } elseif ($currentView === 'week') {
            $filters['week'] = $date->weekOfYear;
        } elseif ($currentView === 'day') {
            $filters['day'] = $date->toDateString();
        }

        $appointments = AppointmentResource::collection(
            $appointmentService->index($filters)
        )->resolve();

        return Inertia::render('appointment', [
            'appointments' => $appointments,
            'filters' => [
                'date' => $date->toDateString(),
                'view' => $currentView,
            ],
        ]);
    })->name('appointment');

    Route::post('appointments', [AppointmentController::class, 'store'])
        ->name('appointments.store');
    
    Route::get('doctor-list', function() {
        return Inertia::render('doctor-list');
    })->name('doctor-list');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
