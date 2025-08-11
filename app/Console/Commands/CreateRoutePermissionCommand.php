<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use Illuminate\Support\Facades\Route;
use Spatie\Permission\Models\Permission;

class CreateRoutePermissionCommand extends Command
{
    protected $signature = 'generate:permissions';

    protected $description = 'Permissions Generate And Save to DB';

    public function handle()
    {
        $routes = Route::getRoutes()->getRoutes();
       
        $except = [
            'login',
            'logout',
            'password.request',
            'password.reset',
            'password.email',
            'register',
            'adminlte.darkmode.toggle',
            'sanctum.csrf-cookie',
            'home',
            'password.update',
            'password.confirm',
            'storage.local',
            'verification.notice',
            'verification.verify',
            'verification.send'
        ];
      

        foreach ($routes as $route){
             
            $name = (explode('.',$route->getName()));
            
            $reStrName = '';
            if(count($name) === 3){
                if($name[2] === 'index'){
                    $name[2] = 'View the Page in';
                }
                if($name[2] === 'create'){
                    $name[2] = 'View the Create Page in';
                }
                if($name[2] === 'update'){
                    $name[2] = 'Edit The data in';
                }
                if($name[2] === 'store'){
                    $name[2] = 'Create new data in';
                }
                if($name[2] === 'show'){
                    $name[2] = 'Show The data in';
                }
                if($name[2] === 'edit'){
                    $name[2] = 'View the edit page in';
                }
                if($name[2] === 'getInfo'){
                    $name[2] = 'View the info in';
                }
                if($name[2] === 'destroy'){
                    $name[2] = 'delete';
                }
                $reStrName = strtoupper( $name[0] . ' Page - '. $name[2] . ' the ' .$name[1]);
            }elseif(count($name) === 2){
                if($name[1] === 'index'){
                    $name[1] = 'View the Page';
                }
                if($name[1] === 'create'){
                    $name[1] = 'View the Create Page';
                }
                if($name[1] === 'update'){
                    $name[1] = 'Edit The data';
                }
                if($name[1] === 'store'){
                    $name[1] = 'Create new data';
                }
                if($name[1] === 'get'){
                    $name[1] = 'Get All'. $name[0];
                }
                if($name[1] === 'show'){
                    $name[1] = 'Show The data';
                }
                if($name[1] === 'edit'){
                    $name[1] = 'View the edit page';
                }
                if($name[1] === 'destroy'){
                    $name[1] = 'delete';
                }
                $reStrName = strtoupper( $name[0] . ' Page - '. $name[1]);
            }
            ;
            if ($route->getName() != '' && !in_array($route->getName(), $except ) && !str_starts_with($route->getName(), 'generated') ){

                $permission = Permission::where('name', $route->getName())->first();
                if(is_null($permission)){
                   $permissions =  permission::create(['alias' => $reStrName, 'name' => $route->getName()]);
                   $this->info("Permission $permissions->name added");
                }
            }
        }
        $this->info('Permission Route Added Successfully');
    }
}
