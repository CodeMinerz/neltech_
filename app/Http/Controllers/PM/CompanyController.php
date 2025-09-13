<?php

namespace App\Http\Controllers\PM;
use App\Http\Requests\PM\CompanyFormRequest;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\Group;

use App\Traits\CrudTrait;
use App\Traits\ActiveTrait;


class CompanyController extends Controller
{
    use CrudTrait;
    use ActiveTrait;
    public function __construct(){

        $this->model = new Company;
        $this->inertiaView = 'PM/companies';
        $this->routePrefix = 'company';
        $this->formRequest = CompanyFormRequest::class;
    }

    public function getAdditionalCreateProps(){
        return ['groups' => Group::all()];
    }
}
