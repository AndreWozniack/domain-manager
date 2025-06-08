<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\DomainRepositoryInterface;
use App\Repositories\DomainRepository;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(
            DomainRepositoryInterface::class,
            DomainRepository::class
        );
    }

    public function boot(): void
    {
        //
    }
}
