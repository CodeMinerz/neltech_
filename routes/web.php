<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('portfolio/index');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::resources(['user' => App\Http\Controllers\PM\UserController::class,]);
    Route::put('user/active/{user}', [App\Http\Controllers\PM\UserController::class, 'isActive'])->name('user.active');
    Route::resources(['role' => App\Http\Controllers\PM\RoleController::class,]);

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
