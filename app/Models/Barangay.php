<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Barangay extends Model
{
    protected $fillable = [
        'psgc_code',
        'barangay_name',
        'region_code',
        'province_code',
        'city_municipality_code',
        'barangay_code',
    ];

    public function region(): BelongsTo
    {
        return $this->belongsTo(Region::class, 'region_code', 'region_code');
    }

    public function province(): BelongsTo
    {
        return $this->belongsTo(Province::class, 'province_code', 'province_code');
    }

    public function cityMunicipality(): BelongsTo
    {
        return $this->belongsTo(CityMunicipality::class, 'city_municipality_code', 'city_municipality_code');
    }
}
