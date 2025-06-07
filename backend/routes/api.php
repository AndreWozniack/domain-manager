<?php

use Illuminate\Support\Facades\Route;

Route::apiResource('dominios', \App\Http\Controllers\Api\DomainController::class);
