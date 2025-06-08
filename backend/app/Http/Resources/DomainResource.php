<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DomainResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id'              => $this->id,
            'nome'            => $this->nome,
            'dominio'         => $this->dominio,
            'cliente'         => $this->cliente,
            'ativo'           => $this->ativo,
            'data_registro'   => $this->data_registro?->format('Y-m-d'),
            'data_expiracao'  => $this->data_expiracao?->format('Y-m-d'),
            'observacoes'     => $this->observacoes,
            'created_at'      => $this->created_at,
            'updated_at'      => $this->updated_at,
        ];
    }
}
