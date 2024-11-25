<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\JWTAuthController;
use App\Http\Middleware\JWTMiddleware;

Route::post('register', [JWTAuthController::class, 'register']);
Route::post('login', [JWTAuthController::class, 'login']);
Route::get('unauthorized', [JWTAuthController::class, 'unauthorized'])->name("unauthorized");



Route::middleware(JWTMiddleware::class)->group(function () {
    Route::get('user', [JWTAuthController::class, 'getUser']);
    Route::post('logout', [JWTAuthController::class, 'logout']);
});


// Route::get('user', [JWTAuthController::class, 'getUser'])->middleware(JWTMiddleware::class);
// Route::post('logout', [JWTAuthController::class, 'logout'])->middleware(JWTMiddleware::class);