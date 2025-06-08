<?php

namespace Database\Factories;

use App\Models\Domain;
use Illuminate\Database\Eloquent\Factories\Factory;

class DomainFactory extends Factory
{

    protected $model = Domain::class;

    public function definition(): array
    {
        return [
            'nome'           => $this->faker->company,
            'dominio'        => $this->faker->unique()->domainName,
            'cliente'        => $this->faker->company,
            'ativo'          => $this->faker->boolean(95),
            'data_registro'  => $this->faker->dateTimeBetween('-5 years'),
            'data_expiracao' => $this->faker->dateTimeBetween('now', '+3 years'),
            'observacoes'    => $this->faker->optional()->sentence,
        ];
    }
}
