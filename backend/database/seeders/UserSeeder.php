<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => env('ADMIN_EMAIL', 'admin@example.com')],
            [
                'name'     => env('ADMIN_NAME',  'Administrator'),
                'password' => bcrypt(env('ADMIN_PASSWORD', 'secret')),
            ]
        );
    }
}
