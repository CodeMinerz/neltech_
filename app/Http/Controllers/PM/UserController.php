<?php

namespace App\Http\Controllers\PM;

use App\Http\Controllers\Controller;
use App\Http\Requests\PM\UserFormRequest;
use Spatie\Permission\Models\Role;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Traits\CrudTrait;
use App\Traits\ActiveTrait;

class UserController extends Controller
{
    use CrudTrait;
    public function __construct()
    {
        $this->model = new User;
        $this->inertiaView = 'PM/users';
        $this->routePrefix = 'user';
        $this->formRequest = UserFormRequest::class;
        $this->queryWith = ['roles'];
        $this->prefix = 'User';
    }

    public function getAdditionalCreateProps():array
    {
        return [
            'roles' => Role::pluck('name')
        ];
    }

    public function getAdditionalStoreProps(Request $request, User $user){

        $user->fullname = $request->f_name .' '. $request->l_name;
        $user->save();
        return $user->syncRoles($request->roles);
    }

    public function getAdditionalShowProps($record)
    {

        return [
             'roles' => Role::pluck('name'),
              'userRoles' => $record->roles()->pluck('name'),
        ];

    }

    public function getAdditionalEditProps($record): array
    {
        return [
            'roles' => Role::pluck('name'),
            'userRoles' => $record->roles()->pluck('name')->toArray(),
        ];
    }
    public function getAdditionalUpdateProps(Request $request, User $user):User
    {
         return  $user->syncRoles($request->roles);
    }
    
    public function isActive(string $id){
        try{

            $user = User::findOrFail($id);
            $status = $user->toggleActive();
            $statusMessage = $status ? "activated" : "deactivated";

            if($user->save()){
                return redirect()
                    ->route('user.index')
                    ->with('success', "User " .  $statusMessage);

            }else {
                return redirect()->back()->with('error', 'User status is failed to update');
            }
        }catch(Exception $e){
            \Log::error('User status failed to update: '. $e);
            return redirect()->bact()->with('error', 'Something went wrong!');
        }
    }
}
