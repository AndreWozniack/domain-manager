<?php

namespace App\Providers;

use App\Repositories\DomainRepository;
use App\Repositories\DomainRepositoryInterface;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(
            DomainRepositoryInterface::class,
            DomainRepository::class
        );
    }


    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
