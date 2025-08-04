<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\User;

class RolCheck
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$params): Response
    {
    	$bandera = User::where('id', \Auth::user()->id)->whereIn('rol', $params)->first();

        if( !empty($bandera)){
            return $next($request);
        }
        
        return redirect()->route('dashboard')->withErrors(['error' => 'No cuenta con los permisos suficientes para acceder a la ruta']);
    }
}
