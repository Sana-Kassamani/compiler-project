<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\JWTAuthController;
use App\Http\Controllers\Files\FilesController;
use App\Http\Middleware\JWTMiddleware;

Route::post('/register', [JWTAuthController::class, 'register']);
Route::post('login', [JWTAuthController::class, 'login']);
Route::get('unauthorized', [JWTAuthController::class, 'unauthorized'])->name("unauthorized");



Route::middleware(JWTMiddleware::class)->group(function () {
    Route::get('user', [JWTAuthController::class, 'getUser']);
    Route::post('logout', [JWTAuthController::class, 'logout']);
    Route::prefix("/file")->group(function() {
        Route::get("/", [FilesController::class, "get_all_files"]);
        Route::post("/", [FilesController::class, "create_file"]);
        Route::put("/", [FilesController::class, "save_file"]);
        // Route::put("/{id}", [NewsController::class, "editNews"]);
        // Route::delete("/{id}", [NewsController::class, "deleteNews"]);
      });
});


// Route::get('user', [JWTAuthController::class, 'getUser'])->middleware(JWTMiddleware::class);
// Route::post('logout', [JWTAuthController::class, 'logout'])->middleware(JWTMiddleware::class);