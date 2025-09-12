<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    protected $fillable = [
        'code',
        'name'
    ];

    public function setNameAttribute($value)
    {
        return $this->attributes['name'] = ucfirst($value);
    }
}
