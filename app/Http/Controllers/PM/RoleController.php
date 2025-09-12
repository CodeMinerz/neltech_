<?php

namespace App\Http\Controllers\PM;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\DB;
use  Spatie\Permission\Models\Permission;
use App\Http\Requests\PM\RoleFormRequest;
use Inertia\Inertia;
use App\Traits\CrudTrait;
use App\Traits\ActiveTrait;
use Log;

class RoleController extends Controller
{
    
    use CrudTrait;
    use ActiveTrait;

    public function __construct()
    {
        $this->model = new Role;
        $this->inertiaView = 'PM/roles';
        $this->routePrefix = 'role';
        $this->formRequest = RoleFormRequest::class;
        $this->queryWith = 'permissions';
        $this->prefix = 'Role';
    }

    public function getAdditionalCreateProps():Array {
        return [
            'permissions' => Permission::pluck('name')
        ];
    }

    public function getAdditionalStoreProps(Request $request, Role $role){
        return $role->syncPermissions($request->permissions);
    } 

    public function getAdditionalShowProps(Role $role){
        return   [ 
            'rolePermissions' => $role->permissions()->pluck('name'),
            'permissions' => Permission::pluck('name'),
        ];
    } 
    
    public function getAdditionalEditProps(Role $role){
        return   [ 
            'rolePermissions' => $role->permissions()->pluck('name'),
            'permissions' => Permission::pluck('name'),
        ];
    } 

    public function getAdditionalUpdateProps(Request $request, Role $role)
    {
        return  $role->syncPermissions($request->permissions);
    }

}