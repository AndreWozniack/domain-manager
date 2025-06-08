<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Domain extends Model
{
    /** @use HasFactory<\Database\Factories\DomainFactory> */
    use HasFactory;

    protected $fillable = [
        'nome',
        'dominio',
        'cliente',
        'ativo',
        'data_registro',
        'data_expiracao',
        'observacoes',
    ];

    protected $casts = [
        'data_registro' => 'date',
        'data_expiracao' => 'date',
        'ativo' => 'boolean',
    ];
    public static function find(int $id)
    {
        return self::query()->find($id);
    }

    public static function create(array $data): Domain
    {
        $domain = new self();
        $domain->fill($data);
        $domain->save();
        return $domain;
    }
}
