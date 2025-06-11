<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class LogApiRequests
{
    public function handle(Request $request, Closure $next)
    {
        Log::info('API Request', [
            'method' => $request->method(),
            'ip' => $request->ip(),
            'payload' => $request->all(),
        ]);
        return $next($request);
    }
}

