<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Domain;

class DomainSeeder extends Seeder
{
    public function run(): void
    {
        Domain::factory()->count(20)->create();   // ajuste o count à vontade
    }
}
