<?php

use App\Http\Controllers\DashboardDonationController;
use App\Http\Controllers\DashboardPageController;
use App\Http\Controllers\DonationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TanyaController;
use App\Http\Controllers\UserDashboardController;
use App\Http\Controllers\UserSettingsController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
 */

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', [UserDashboardController::class, 'index'])->name('dashboard');

    Route::get('/dashboard/page', [DashboardPageController::class, 'show'])->name('dashboard.page');
    Route::post('/dashboard/page/insert', [DashboardPageController::class, 'insert'])->name('dashboard.page.insert');
    Route::post('/dashboard/page', [DashboardPageController::class, 'update'])->name('dashboard.page.update');

    Route::get("/dashboard/settings", [UserSettingsController::class, "index"])->name("dashboard.settings");
    Route::post("/dashboard/profile", [ProfileController::class, "update"])->name("dashboard.profile.update");

    Route::get("/dashboard/donations", [DashboardDonationController::class, "index"])->name("dashboard.donation");

});

Route::get("/{user}", [TanyaController::class, "index"])->name("tanya");
Route::post("/{page}/donate", [DonationController::class, "newDono"])->name("tanya.donate");
