<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        if (User::count() > 0) {
            echo "⚠️  Usuários já existem. Pulando UserSeeder.\n";
            return;
        }

        User::factory()->create(
            ['email' => env('ADMIN_EMAIL', 'admin@example.com')],
            [
                'name'     => env('ADMIN_NAME',  'Administrator'),
                'password' => bcrypt(env('ADMIN_PASSWORD', 'secret')),
            ]
        );
    }
}
