<?php 

namespace App\Traits;


trait ActiveTrait 
{
    protected $model;
    protected $prefix;
    public function isActive(string $id){
        $query = $this->model::findOrFail($id);
        $query->disabled = !$query->disabled ??= $query->disabled;
        $statusMessage = !$query->disabled ? "activated" : "deactivated";
        if($query->save()){
            return redirect()->back()->with('success', $this->prefix. " " .  $statusMessage);

        }else {
            return redirect()->back()->with('error', $this->prefix. ' status is failed to update');
        }
    }

}