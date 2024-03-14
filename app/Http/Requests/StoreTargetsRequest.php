<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTargetsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            //name unique to the user
            'name' => ['required', 'string', 'min:5', 'max:64'],
            'description' => ['nullable', 'string', 'max:255'],
            'amount' => ['required', 'integer', 'min:100000', 'max:100000000'],
            'is_active' => ['boolean'],
        ];
    }
}
