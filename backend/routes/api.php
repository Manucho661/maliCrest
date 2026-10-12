<?php

use App\Http\Controllers\AuthenticationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [AuthenticationController::class, 'register'])
    ->middleware('throttle:5,1');

Route::post('/login', [AuthenticationController::class, 'login'])
    ->middleware('throttle:5,1');
