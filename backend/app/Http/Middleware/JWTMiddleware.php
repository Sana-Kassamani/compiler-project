<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class JWTMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        {
            try {
                if (!JWTAuth::parseToken()->authenticate()) {
                    return redirect()->route('unauthorized');
                }
            } catch (JWTException $e) {
                return redirect()->route('unauthorized')->with('error', 'Invalid token. Please log in again.');
            }
    
            return $next($request); // Proceed if authenticated
        }
    }
}
