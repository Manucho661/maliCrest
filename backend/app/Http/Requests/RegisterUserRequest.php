<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class RegisterUserRequest extends FormRequest
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
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],

            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                'unique:users,email',
            ],

            'country_code' => [
                'required',
                'string',
                'max:5',
            ],

            'phone_number' => [
                'required',
                'string',
                'max:20',
                Rule::unique('users', 'phone_number')
                    ->where('country_code', $this->input('country_code')),
            ],

            'password' => [
                'required',
                'string',
                'min:8',
                'confirmed',
            ],

            'roles' => ['required', 'array', 'min:1'],

            'roles.*' => [
                'required',
                'integer',
                'distinct',
                Rule::exists('roles', 'id')
                    ->whereIn('name', [
                        'landlord',
                        'agent',
                        'manager',
                        'tenant',
                        'service_provider',
                    ]),
            ],
        ];
    }
}
