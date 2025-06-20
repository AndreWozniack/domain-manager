<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DomainRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    public function rules(): array
    {
        $dominio = $this->route('dominio');

        return [
            'nome'   => 'required|string|max:255',
            'dominio'=> "required|string|regex:/^[\w.-]+\.[a-z]{2,}$/i|unique:domains,dominio," . ($dominio?->id ?? 'NULL'),
            'cliente'=> 'nullable|string|max:255',
            'ativo'  => 'boolean',
            'data_registro'  => 'nullable|date',
            'data_expiracao' => 'nullable|date|after_or_equal:data_registro',
            'observacoes'    => 'nullable|string',
        ];
    }

}
