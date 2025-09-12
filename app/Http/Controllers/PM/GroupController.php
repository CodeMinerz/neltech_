<?php

namespace App\Http\Controllers\PM;
use App\Http\Controllers\Controller;
use App\Models\Group;
use Illuminate\Http\Request;
use App\Http\Requests\PM\GroupFormRequest;
use Inertia\Inertia;
use App\Traits\CrudTrait;
use App\Traits\ActiveTrait;

class GroupController extends Controller
{

    use CrudTrait;
    use ActiveTrait;

    public function __construct(){

        $this->model = new Group;
        $this->inertiaView = 'PM/groups';
        $this->routePrefix = 'group';
        $this->formRequest = GroupFormRequest::class;
    }
}
