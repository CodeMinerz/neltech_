<?php

namespace App\Http\Requests\PM;

use Illuminate\Foundation\Http\FormRequest;

class UserFormRequest extends FormRequest
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
        
            $rules = [
                
                "f_name" => "required|string| max:30| alpha:ascii",
                "l_name" => "required|string| max:30| alpha:ascii",
                'b_date' => "required|date",
                'phone_no' => "required|numeric| digits:11",
            ];

            //For Create Form
            if($this->isMethod('post')) {
                $rules['username'] = [
                    'required',
                    'string',
                    'max:30',
                    Rule::unique(User::class, 'username')
                ];
            } else {
                $rules['username'] = [
                    'required',
                    'string',
                    'max:30',
                ];
            }

            return $rules;
     
    }

    public function messages(): array {


        $messages =  [
       
            //firstname
            "f_name.required" => "Please enter the firstname",
            "f_name.string" => "Please enter valid firstname",
            "f_name.max" => "Firstname must be not greater than 30",
            "f_name.alpha" => "Please enter valid name",
            //lastname
            "l_name.required" => "Please enter the lastname",
            "l_name.string" => "Please enter valid lastname",
            "l_name.max" => "Lastname must be not greater than 30",
            "l_name.alpha" => "Please enter valid name",
            //b_date

            "b_date.required" => "Please enter the birthdate",
            "b_date.date" => "Please enter valid birthdate",

            //Contact no
            "phone_no.required" => "Please enter the contact number",
            "phone_no.numeric" => "Please enter valid contact number",
            "phone_no.digits" => "Please enter valid contact number"
        ];

        if($this->isMethod('post')) {
            $messages['username.required'] = "Please enter the username";
            $messages['username.max'] = "Username must be not greater than 30";
            $messages["username.string"] = "Please enter valid username";
            $messages['username.unique'] = "Username already exists";
        } else {
            $messages['username.required'] = "Please enter the username";
            $messages["username.string"] = "Please enter valid username";
            $messages['username.max'] = "Username must be not greater than 30";
            $messages['username.unique'] = "Username already exists";
        }
        return $messages;
    }
}
