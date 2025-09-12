<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CompanyFormRequest extends FormRequest
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
            'name' => 'required|string|max:30|unique:companies,name,' . $this->route('company'),
            'code' => 'required|string|max:10|unique:companies,code,' . $this->route('company'),
            'group_id' => 'required|exists:groups,id',
            'address_line' => 'nullable|string|max:255',
            'region_code' => 'nullable|string|exists:regions,region_code',
            'province_code' => 'nullable|string|exists:provinces,province_code',
            'city_municipality_code' => 'nullable|string|exists:cities_municipalities,city_municipality_code',
            'barangay_code' => 'nullable|string|exists:barangays,barangay_code',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:50',
        ];
    }
}
