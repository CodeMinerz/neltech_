<?php

namespace App\Http\Controllers\PM;

use App\Http\Controllers\Controller;
use App\Models\Region;
use App\Models\Province;
use App\Models\CityMunicipality;
use App\Models\Barangay;
use Illuminate\Http\Request;

class AddressController extends Controller
{
    /**
     * Get all regions
     */
    public function regions()
    {
        $regions = Region::select('region_code', 'region_name')->get();
        return response()->json($regions);
    }

    /**
     * Get provinces by region code
     */
    public function provinces($regionCode)
    {
        $provinces = Province::where('region_code', $regionCode)
            ->select('province_code', 'province_name')
            ->get();
        return response()->json($provinces);
    }

    /**
     * Get cities/municipalities by province code
     */
    public function citiesMunicipalities($provinceCode)
    {
        $citiesMunicipalities = CityMunicipality::where('province_code', $provinceCode)
            ->select('city_municipality_code', 'city_municipality_name')
            ->get();
        return response()->json($citiesMunicipalities);
    }

    /**
     * Get barangays by city/municipality code
     */
    public function barangays($cityMunicipalityCode)
    {
        $barangays = Barangay::where('city_municipality_code', $cityMunicipalityCode)
            ->select('barangay_code', 'barangay_name')
            ->get();
        return response()->json($barangays);
    }
}
