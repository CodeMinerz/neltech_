<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CityMunicipality extends Model
{
    protected $table = 'cities_municipalities';
    protected $fillable = [
        'psgc_code',
        'city_municipality_name',
        'region_code',
        'province_code',
        'city_municipality_code',
        'type',
    ];

    public function region(): BelongsTo
    {
        return $this->belongsTo(Region::class, 'region_code', 'region_code');
    }

    public function province(): BelongsTo
    {
        return $this->belongsTo(Province::class, 'province_code', 'province_code');
    }

    public function barangays(): HasMany
    {
        return $this->hasMany(Barangay::class, 'city_municipality_code', 'city_municipality_code');
    }
}
