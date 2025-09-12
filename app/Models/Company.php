<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Company extends Model
{
    protected $fillable = [
        'name',
        'code',
        'address_line',
        'region_code',
        'province_code',
        'city_municipality_code',
        'barangay_code',
        'tin',
        'sss_number',
        'pagibig_number',
        'date_open',
        'group_code',
        'disabled',
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

    public function barangay(): BelongsTo
    {
        return $this->belongsTo(Barangay::class, 'barangay_code', 'barangay_code');
    }

    public static function syncGroups(Request $request){
        
    }
}
