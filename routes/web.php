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
    //User Controllers
    Route::resources(['user' => App\Http\Controllers\PM\UserController::class,]);
    Route::put('user/active/{user}', [App\Http\Controllers\PM\UserController::class, 'isActive'])->name('user.active');
    //Role Controllers
    Route::resources(['role' => App\Http\Controllers\PM\RoleController::class,]);
    Route::put('role/active/{role}', [App\Http\Controllers\PM\RoleController::class, 'isActive'])->name('role.active');
    //Group Controllers 
    Route::resources(['group' => App\Http\Controllers\PM\GroupController::class]);
    Route::resources(['company' => App\Http\Controllers\PM\CompanyController::class]);
    
    // Address API endpoints
    Route::get('address/regions', [App\Http\Controllers\PM\AddressController::class, 'regions'])->name('address.regions');
    Route::get('address/provinces/{regionCode}', [App\Http\Controllers\PM\AddressController::class, 'provinces'])->name('address.provinces');
    Route::get('address/cities-municipalities/{provinceCode}', [App\Http\Controllers\PM\AddressController::class, 'citiesMunicipalities'])->name('address.cities-municipalities');
    Route::get('address/barangays/{cityMunicipalityCode}', [App\Http\Controllers\PM\AddressController::class, 'barangays'])->name('address.barangays');

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
