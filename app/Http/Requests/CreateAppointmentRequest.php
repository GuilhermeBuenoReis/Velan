<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateAppointmentRequest extends FormRequest
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
            'user_id' => 'required|exists:users,id',
            'title' => 'required|string|max:255',
            'date' => 'required|date',
            'start_time' => 'required|date_format:H:i',
            'duration' => 'required|integer|min:1',
            'event_type' => 'required|string|max:100',
            'location' => 'nullable|string|max:255',
            'doctor' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
        ];
    }

    public function messages(): array {
        return [
            'user_id.required' => 'O usuário é obrigatório.',
            'user_id.exists' => 'Selecione um usuário válido.',
            'title.required' => 'O título é obrigatório.',
            'date.required' => 'A data é obrigatória.',
            'start_time.required' => 'A hora que inicia é obrigatória.',
            'duration.required' => 'A duração é obrigatória.',
            'event_type.required' => 'O tipo de evento é obrigatório.',
        ];
    }
}
