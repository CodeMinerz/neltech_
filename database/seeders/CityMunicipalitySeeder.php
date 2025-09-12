<?php

namespace Database\Seeders;

use App\Models\CityMunicipality;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\Http;

class CityMunicipalitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Fetch cities and municipalities from PSGC API
        $response = Http::get('https://psgc.gitlab.io/api/cities-municipalities/');
        
        if ($response->successful()) {
            $citiesMunicipalities = $response->json();
            
            foreach ($citiesMunicipalities as $cityMunicipality) {
                // Skip cities/municipalities without a province code
                if (!$cityMunicipality['provinceCode']) {
                    continue;
                }
                
                CityMunicipality::updateOrCreate(
                    ['city_municipality_code' => $cityMunicipality['code']],
                    [
                        'psgc_code' => $cityMunicipality['code'],
                        'city_municipality_name' => $cityMunicipality['name'],
                        'region_code' => $cityMunicipality['regionCode'],
                        'province_code' => $cityMunicipality['provinceCode'],
                        'city_municipality_code' => $cityMunicipality['code'],
                        'type' => $cityMunicipality['isCity'] ? 'city' : 'municipality',
                    ]
                );
            }
        }
    }
}
