<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Region extends Model
{
    protected $fillable = [
        'psgc_code',
        'region_name',
        'region_code',
    ];

    public function provinces(): HasMany
    {
        return $this->hasMany(Province::class, 'region_code', 'region_code');
    }

    public function citiesMunicipalities(): HasMany
    {
        return $this->hasMany(CityMunicipality::class, 'region_code', 'region_code');
    }

    public function barangays(): HasMany
    {
        return $this->hasMany(Barangay::class, 'region_code', 'region_code');
    }
}
