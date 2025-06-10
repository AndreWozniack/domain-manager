<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Domain;

class DomainSeeder extends Seeder
{
    public function run(): void
    {
        if (Domain::count() > 0) {
            echo "⚠️  Domínios já existem. Pulando DomainSeeder.\n";
            return;
        }

        Domain::factory()->count(20)->create();
    }
}
