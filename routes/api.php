<?php

use App\Http\Controllers\DashboardDonationController;
use App\Http\Controllers\DonationController;
use App\Http\Controllers\TanyaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
 */

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/', function () {
    return response()->json(['message' => 'Hello World!'], 200);
});

Route::get("/tanya/{page_id}/recent", [TanyaController::class, "get_recent_dono"]);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/dashboard/donationList', [DashboardDonationController::class, 'getDataAPI'])->name('api.dashboard.donationList');
});

Route::post('/paymentNotification', [DonationController::class, 'handleNotif']);
