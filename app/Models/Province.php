<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Province extends Model
{
    protected $fillable = [
        'psgc_code',
        'province_name',
        'region_code',
        'province_code',
    ];

    public function region(): BelongsTo
    {
        return $this->belongsTo(Region::class, 'region_code', 'region_code');
    }

    public function citiesMunicipalities(): HasMany
    {
        return $this->hasMany(CityMunicipality::class, 'province_code', 'province_code');
    }

    public function barangays(): HasMany
    {
        return $this->hasMany(Barangay::class, 'province_code', 'province_code');
    }
}
