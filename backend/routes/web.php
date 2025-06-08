<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\DomainController;

Route::get('/', static function () {
    return view('welcome');
});

Route::get('/health', static function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toIso8601String(),
        'version' => config('app.version', '1.0.0'),
    ], 200);
});

Route::middleware('api')
    ->prefix('api')
    ->group(base_path('routes/api.php'));

