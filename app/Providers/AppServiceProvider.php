<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if (app()->environment('production')) {
            URL::forceScheme('https');
        }
        
        // Forzar el esquema HTTP para desarrollo local
        if (config('app.env') === 'local') {
            URL::forceScheme('http');
        }
        
        // Configurar la URL raíz para subcarpetas
        if (config('app.env') === 'local') {
            URL::forceRootUrl(config('app.url'));
        }
    }
}
