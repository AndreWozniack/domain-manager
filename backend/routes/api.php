<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\DomainController;

Route::apiResource('dominios', DomainController::class);
