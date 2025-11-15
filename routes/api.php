<?php

use App\Http\Controllers\AppointmentController;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\ProfileApiController;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('appointments', AppointmentController::class);
    Route::get('profile', [ProfileApiController::class, 'show']);
    Route::patch('profile', [ProfileApiController::class, 'update']);
});
