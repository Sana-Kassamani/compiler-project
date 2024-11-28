<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\JWTAuthController;
use App\Http\Controllers\Files\FilesController;
use App\Http\Controllers\Collaboration\DocumentController;
use App\Http\Middleware\JWTMiddleware;
use App\Http\Controllers\EmailController;
use App\Http\Controllers\AiController;

Route::post('register', [JWTAuthController::class, 'register']);
Route::post('login', [JWTAuthController::class, 'login']);
Route::get('unauthorized', [JWTAuthController::class, 'unauthorized'])->name("unauthorized");
Route::post('/invite', [EmailController::class, 'invite']);
Route::get('/accept/{id}', [EmailController::class, 'accept']);
Route::post('/debug', [AiController::class, 'debug']);
Route::post('/analyze', [AiController::class, 'analyze']);


Route::middleware(JWTMiddleware::class)->group(function () {
    Route::get('user', [JWTAuthController::class, 'getUser']);
    Route::get('logout', [JWTAuthController::class, 'logout']);
    Route::prefix("/file")->group(function() {
        Route::get("/", [FilesController::class, "get_all_files"]);
        Route::post("/", [FilesController::class, "create_file"]);
        Route::post("/save", [FilesController::class, "save_file"]);
        Route::delete("/{id}", [FilesController::class, "delete_file"]);
      });
      
});
Route::post('/document/update', [DocumentController::class, 'update']);

// Route::get('user', [JWTAuthController::class, 'getUser'])->middleware(JWTMiddleware::class);
// Route::post('logout', [JWTAuthController::class, 'logout'])->middleware(JWTMiddleware::class);