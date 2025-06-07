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
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $id = $this->route('dominio');   // null no create
        return [
            'nome'   => 'required|string|max:255',
            'dominio'=> "required|string|regex:/^[\w.-]+\.[a-z]{2,}$/i|unique:domains,dominio,$id",
            'cliente'=> 'nullable|string|max:255',
            'ativo'  => 'boolean',
            'data_registro'  => 'nullable|date',
            'data_expiracao' => 'nullable|date|after_or_equal:data_registro',
            'observacoes'    => 'nullable|string',
        ];
    }
}
